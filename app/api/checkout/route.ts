import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { findVehicle } from "@/app/order/vehicles";
import { getRates } from "@/lib/easyship";
import { ALLOWED_COUNTRY_CODES } from "@/lib/shipping-config";
import { formatEur, productPriceEur, toCents } from "@/lib/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      is_company,
      country,
      shipping_zip,
      shipping_city,
      shipping_address,
      billing_zip,
      billing_city,
      billing_address,
      tax_number,
      model,
      variant,
      rate,
    } = await req.json();

    if (
      !name ||
      !email ||
      !phone ||
      !country ||
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

    if (!ALLOWED_COUNTRY_CODES.has(country)) {
      return NextResponse.json(
        { error: "We don't ship to that country yet." },
        { status: 400 }
      );
    }

    if (!rate?.id) {
      return NextResponse.json(
        { error: "Please choose a shipping option." },
        { status: 400 }
      );
    }

    const priceEur = productPriceEur();

    // Never trust the price the browser sends — re-quote and use the server's
    // number, otherwise a crafted request could buy €0 shipping.
    const liveRates = await getRates({
      destination: {
        line_1: shipping_address,
        city: shipping_city,
        postal_code: shipping_zip,
        country_alpha2: country,
        contact_name: name,
        contact_email: email,
        contact_phone: phone,
      },
      declaredValue: priceEur,
      currency: "EUR",
    });

    const quoted = liveRates.find((r) => r.courier_service.id === rate.id);

    if (!quoted) {
      return NextResponse.json(
        {
          error:
            "That shipping option is no longer available. Please re-check the rates and try again.",
        },
        { status: 409 }
      );
    }

    const shippingAmount = quoted.total_charge;
    const courierName = quoted.courier_service.umbrella_name;
    const serviceName = quoted.courier_service.name;
    const minDays = quoted.min_delivery_time;
    const maxDays = quoted.max_delivery_time;
    const origin = req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
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
            unit_amount: toCents(priceEur),
          },
          quantity: 1,
        },
      ],
      // Shipping rides as a shipping_option rather than a second line item, so
      // it shows as its own line on the receipt and lands in session.shipping_cost.
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: `${courierName} — ${serviceName}`,
            fixed_amount: {
              amount: toCents(shippingAmount),
              currency: "eur",
            },
            ...(minDays &&
              maxDays && {
                delivery_estimate: {
                  minimum: { unit: "business_day", value: minDays },
                  maximum: { unit: "business_day", value: maxDays },
                },
              }),
          },
        },
      ],
      mode: "payment",
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/order/cancelled`,
      // Everything the webhook needs to create the Easyship shipment. Stripe
      // caps metadata at 50 keys and 500 characters per value.
      metadata: {
        customer_name: name,
        is_company: is_company ? "true" : "false",
        phone,
        country,
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
        courier_service_id: String(rate.id),
        shipping_courier: courierName,
        shipping_service: serviceName,
        shipping_amount: formatEur(shippingAmount),
        delivery_estimate:
          minDays && maxDays ? `${minDays}–${maxDays} business days` : "",
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
