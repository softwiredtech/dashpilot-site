import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { findVehicle } from "@/app/order/vehicles";
import { ORDERS_OPEN } from "@/lib/flags";
import { findCountry, SHIPPING_EUR, type Country } from "@/lib/markets";
import {
  parseEuVat,
  qualifiesForReverseCharge,
  type ParsedEuVat,
} from "@/lib/vat";

let stripe: Stripe | null = null;
function getStripe(): Stripe {
  stripe ??= new Stripe(process.env.STRIPE_SECRET_KEY!);
  return stripe;
}

/**
 * One Stripe TaxRate per EU destination country, created lazily and reused.
 * The in-memory cache avoids a list call per checkout; on a cold start we
 * re-find existing rates by metadata instead of creating duplicates. If a
 * country's rate changes in lib/markets.ts the old TaxRate no longer matches
 * on percentage, so a fresh one is created and the stale one is left unused.
 */
const taxRateIdByCountry = new Map<string, string>();

async function getVatTaxRateId(country: Country): Promise<string> {
  const cached = taxRateIdByCountry.get(country.code);
  if (cached) return cached;

  const existing = await getStripe().taxRates.list({ active: true, limit: 100 });
  let rate = existing.data.find(
    (r) =>
      r.metadata?.dashkit_country === country.code &&
      r.percentage === country.vatRate
  );

  rate ??= await getStripe().taxRates.create({
    display_name: "VAT",
    percentage: country.vatRate!,
    country: country.code,
    inclusive: false,
    metadata: { dashkit_country: country.code },
  });

  taxRateIdByCountry.set(country.code, rate.id);
  return rate.id;
}

/**
 * Check a VAT number against VIES, the EU's official registry. Granting the
 * reverse charge on an invalid number would leave us owing the VAT, so an
 * explicitly invalid number is rejected ("invalid"). VIES member-state
 * services go down routinely though, and losing a sale to their downtime is
 * worse than a manual check afterwards — outages return "unavailable" and the
 * order proceeds, flagged in the session metadata for follow-up.
 */
async function checkVies(
  vat: ParsedEuVat
): Promise<"valid" | "invalid" | "unavailable"> {
  try {
    const res = await fetch(
      "https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countryCode: vat.viesCountry,
          vatNumber: vat.number,
        }),
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!res.ok) return "unavailable";
    const data = await res.json();
    if (data.valid === true || data.isValid === true) return "valid";
    // VIES reports its own outages inside a 200 response.
    if (data.userError && data.userError !== "VALID" && data.userError !== "INVALID") {
      return "unavailable";
    }
    return "invalid";
  } catch {
    return "unavailable";
  }
}

export async function POST(req: NextRequest) {
  if (!ORDERS_OPEN) {
    return NextResponse.json(
      { error: "Ordering is currently closed." },
      { status: 503 }
    );
  }

  try {
    const {
      name,
      email,
      phone,
      is_company,
      shipping_country,
      shipping_zip,
      shipping_city,
      shipping_address,
      billing_country,
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
      !shipping_country ||
      !shipping_zip ||
      !shipping_city ||
      !shipping_address ||
      !billing_country ||
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

    const country = findCountry(shipping_country);
    if (!country || !findCountry(billing_country)) {
      return NextResponse.json(
        {
          error:
            "We currently only ship to the EU, the United Kingdom, the United States and Canada.",
        },
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

    if (vehicle.variant.comingSoon) {
      return NextResponse.json(
        {
          error:
            "The harness for that variant is coming soon and can't be ordered yet.",
        },
        { status: 400 }
      );
    }

    const priceEur = Number(process.env.NEXT_PUBLIC_PRICE_EUR) || 139;
    const shippingEur = SHIPPING_EUR[country.market];
    const origin = req.nextUrl.origin;

    // EU orders get the destination country's VAT on both the device and the
    // shipping — unless the buyer is a company with a VAT number from another
    // member state, in which case the intra-community reverse charge applies
    // and 0% is charged. UK/US orders are charged net — import duties are
    // collected from the customer by the carrier.
    const euVat =
      is_company && tax_number && country.market === "EU"
        ? parseEuVat(tax_number)
        : null;
    const reverseCharge = qualifiesForReverseCharge(euVat);

    let viesStatus: "valid" | "invalid" | "unavailable" | null = null;
    if (reverseCharge) {
      viesStatus = await checkVies(euVat!);
      if (viesStatus === "invalid") {
        return NextResponse.json(
          {
            error:
              "That VAT number isn't registered in VIES, so we can't apply the reverse charge. Please double-check it, or remove the country prefix to order with VAT.",
          },
          { status: 400 }
        );
      }
    }

    const taxRates =
      country.market === "EU" && !reverseCharge
        ? [await getVatTaxRateId(country)]
        : undefined;

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "DashKit",
              description: `Dual CAN-FD device + DashPilot app (Tesla ${vehicle.model.name} · ${vehicle.variant.name} harness)${
                reverseCharge
                  ? " · Reverse charge: VAT to be accounted for by the recipient (Art. 196 EU VAT Directive)"
                  : ""
              }`,
            },
            unit_amount: priceEur * 100, // Stripe expects the amount in cents
          },
          quantity: 1,
          ...(taxRates && { tax_rates: taxRates }),
        },
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Shipping (${country.name})`,
            },
            unit_amount: shippingEur * 100,
          },
          quantity: 1,
          ...(taxRates && { tax_rates: taxRates }),
        },
      ],
      mode: "payment",
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/order/cancelled`,
      metadata: {
        order_type: "developer_early_access",
        customer_name: name,
        is_company: is_company ? "true" : "false",
        phone,
        shipping_country,
        shipping_zip,
        shipping_city,
        shipping_address,
        billing_country,
        billing_zip,
        billing_city,
        billing_address,
        ...(tax_number && { tax_number }),
        ...(reverseCharge && {
          reverse_charge: "true",
          // "unavailable" means VIES was down and the number needs a manual
          // check before invoicing.
          vat_vies_status: viesStatus!,
        }),
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
