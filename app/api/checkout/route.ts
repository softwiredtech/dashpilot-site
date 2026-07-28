import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { findVehicle } from "@/app/order/vehicles";
import { ORDERS_OPEN } from "@/lib/flags";

let stripe: Stripe | null = null;
function getStripe(): Stripe {
  stripe ??= new Stripe(process.env.STRIPE_SECRET_KEY!);
  return stripe;
}

export async function POST(req: NextRequest) {
  if (!ORDERS_OPEN) {
    return NextResponse.json(
      { error: "Ordering hasn't opened yet. DashKit ships end of August 2026." },
      { status: 503 }
    );
  }

  try {
    const {
      name,
      email,
      phone,
      is_company,
      shipping_zip,
      shipping_city,
      shipping_address,
      billing_zip,
      billing_city,
      billing_address,
      tax_number,
      model,
      variant,
    } = await req.json();

    if (
      !name ||
      !email ||
      !phone ||
      !shipping_zip ||
      !shipping_city ||
      !shipping_address ||
      !billing_zip ||
      !billing_city ||
      !billing_address ||
      !model ||
      !variant
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const vehicle = findVehicle(model, variant);

    if (!vehicle) {
      return NextResponse.json(
        {
          error:
            "We don't have a harness for that vehicle yet. Please get in touch and we'll help you out.",
        },
        { status: 400 }
      );
    }

    const priceEur = Number(process.env.NEXT_PUBLIC_PRICE_EUR) || 139;
    const origin = req.nextUrl.origin;

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "DashKit",
              description: `DashKit — Bluetooth device + DashPilot app (Tesla ${vehicle.model.name} · ${vehicle.variant.name} harness)`,
            },
            unit_amount: priceEur * 100, // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/order/cancelled`,
      metadata: {
        customer_name: name,
        is_company: is_company ? "true" : "false",
        phone,
        shipping_zip,
        shipping_city,
        shipping_address,
        billing_zip,
        billing_city,
        billing_address,
        ...(tax_number && { tax_number }),
        vehicle_model: vehicle.model.code,
        vehicle_variant: vehicle.variant.code,
        harness: `Tesla ${vehicle.model.name} — ${vehicle.variant.name}`,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Could not create the payment session." },
      { status: 500 }
    );
  }
}
