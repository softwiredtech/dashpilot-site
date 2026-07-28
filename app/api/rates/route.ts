import { NextRequest, NextResponse } from "next/server";

import { EasyshipError, getRates } from "@/lib/easyship";
import {
  ALLOWED_COUNTRY_CODES,
  COURIER_UMBRELLA,
} from "@/lib/shipping-config";
import { productPriceEur } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      name,
      phone,
      country,
      shipping_zip,
      shipping_city,
      shipping_address,
    } = await req.json();

    if (!country || !shipping_zip || !shipping_city || !shipping_address) {
      return NextResponse.json(
        { error: "A full shipping address is required to quote shipping." },
        { status: 400 }
      );
    }

    if (!ALLOWED_COUNTRY_CODES.has(country)) {
      return NextResponse.json(
        { error: "We don't ship to that country yet." },
        { status: 400 }
      );
    }

    const rates = await getRates({
      destination: {
        line_1: shipping_address,
        city: shipping_city,
        postal_code: shipping_zip,
        country_alpha2: country,
        contact_name: name || undefined,
        contact_email: email || undefined,
        contact_phone: phone || undefined,
      },
      declaredValue: productPriceEur(),
      currency: "EUR",
    });

    const offered = rates
      .filter(
        (r) =>
          !COURIER_UMBRELLA ||
          r.courier_service.umbrella_name?.toUpperCase() ===
            COURIER_UMBRELLA.toUpperCase()
      )
      // Easyship sorts cheapest-first; keep that and show a handful.
      .slice(0, 6)
      .map((r) => ({
        id: r.courier_service.id,
        courier: r.courier_service.umbrella_name,
        service: r.courier_service.name,
        amount: r.total_charge,
        currency: r.currency,
        minDays: r.min_delivery_time,
        maxDays: r.max_delivery_time,
      }));

    return NextResponse.json({ rates: offered });
  } catch (err) {
    if (err instanceof EasyshipError) {
      console.error(
        `Easyship rates error (${err.status}, request_id=${err.requestId}):`,
        err.message
      );
    } else {
      console.error("Rates error:", err);
    }

    return NextResponse.json(
      { error: "Could not fetch shipping options. Please try again." },
      { status: 502 }
    );
  }
}
