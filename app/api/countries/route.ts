import { NextResponse } from "next/server";

import { getCountries } from "@/lib/easyship";
import { ALLOWED_COUNTRY_CODES } from "@/lib/shipping-config";

/**
 * Rendered per request, but the Easyship call underneath is cached for a day
 * (see getCountries). Caching the *upstream response* rather than this route
 * means a transient Easyship failure isn't frozen into a cached 502.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const countries = await getCountries();

    const shippable = countries
      .filter((c) => ALLOWED_COUNTRY_CODES.has(c.alpha2))
      .map(({ name, alpha2 }) => ({ name, alpha2 }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ countries: shippable });
  } catch (err) {
    console.error("Easyship countries error:", err);
    return NextResponse.json(
      { error: "Could not load the list of countries we ship to." },
      { status: 502 }
    );
  }
}
