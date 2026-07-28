/**
 * Minimal Easyship Public API client (version 2024-09).
 *
 * There is no maintained official Node SDK — the `easyship` package on npm
 * targets the long-dead v1 API — so this is raw fetch against the documented
 * REST endpoints. https://developers.easyship.com/reference/authentication
 *
 * Rate limits are global and low: 60 req/min and 10 req/sec in production,
 * 6 req/min and 1 req/sec in sandbox. Quote sparingly and cache what is static.
 */

import {
  INCOTERMS,
  ITEM_CATEGORY,
  ITEM_DESCRIPTION,
  ITEM_HS_CODE,
  ITEM_ORIGIN_COUNTRY,
  ITEM_WEIGHT_KG,
  ORIGIN_ADDRESS,
  PARCEL_BOX,
  PARCEL_TOTAL_WEIGHT_KG,
  SHIPPING_UNITS,
} from "./shipping-config";

const API_VERSION = "2024-09";

function baseUrl() {
  // Escape hatch for pointing at a local mock in tests.
  if (process.env.EASYSHIP_BASE_URL) return process.env.EASYSHIP_BASE_URL;

  return process.env.EASYSHIP_ENV === "production"
    ? "https://public-api.easyship.com"
    : "https://public-api-sandbox.easyship.com";
}

export type EasyshipAddress = {
  line_1: string;
  line_2?: string;
  city: string;
  /** Mandatory for AU, CA, CN, ID, MX, MY, TH, US, VN. Unused while EU-only. */
  state?: string;
  postal_code?: string;
  country_alpha2: string;
  company_name?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
};

export type EasyshipRate = {
  courier_service: {
    /** There is no `rate.id` in this API — this is the selection key. */
    id: string;
    name: string;
    courier_id: string;
    /** Courier brand, e.g. "UPS". */
    umbrella_name: string;
    logo?: string | null;
    /** false => the rate comes from your own connected courier account. */
    easyship_courier_service?: boolean;
  };
  min_delivery_time: number;
  max_delivery_time: number;
  total_charge: number;
  currency: string;
  full_description?: string;
  description?: string;
};

export type EasyshipCountry = { id: number; name: string; alpha2: string };

export class EasyshipError extends Error {
  status: number;
  requestId?: string;

  constructor(message: string, status: number, requestId?: string) {
    super(message);
    this.name = "EasyshipError";
    this.status = status;
    this.requestId = requestId;
  }
}

async function easyship<T>(
  path: string,
  init: RequestInit & { next?: { revalidate: number } } = {}
): Promise<T> {
  const token = process.env.EASYSHIP_API_KEY;
  if (!token) {
    throw new EasyshipError("EASYSHIP_API_KEY is not set.", 500);
  }

  const res = await fetch(`${baseUrl()}/${API_VERSION}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init.headers,
    },
    // Rate quotes must never be served from a cache; static reference data
    // (countries) opts back in by passing `next: { revalidate }`.
    ...(init.next ? {} : { cache: "no-store" as const }),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    const err = payload?.error;
    throw new EasyshipError(
      err?.message || `Easyship request failed (${res.status}).`,
      res.status,
      err?.request_id
    );
  }

  return payload as T;
}

/** Parcel payload shared by the rates and shipments calls. */
function buildParcels(declaredValue: number, currency: string) {
  return [
    {
      total_actual_weight: PARCEL_TOTAL_WEIGHT_KG,
      box: { ...PARCEL_BOX },
      items: [
        {
          description: ITEM_DESCRIPTION,
          category: ITEM_CATEGORY,
          ...(ITEM_HS_CODE && { hs_code: ITEM_HS_CODE }),
          quantity: 1,
          actual_weight: ITEM_WEIGHT_KG,
          dimensions: { ...PARCEL_BOX },
          declared_currency: currency.toUpperCase(),
          declared_customs_value: declaredValue,
          origin_country_alpha2: ITEM_ORIGIN_COUNTRY,
          contains_battery_pi966: false,
          contains_battery_pi967: false,
          contains_liquids: false,
        },
      ],
    },
  ];
}

/**
 * Quote shipping for a destination.
 *
 * Rates come back sorted cheapest-first. Note the response is always normalised
 * to kg/cm regardless of the units sent.
 */
export async function getRates(opts: {
  destination: EasyshipAddress;
  declaredValue: number;
  currency: string;
}): Promise<EasyshipRate[]> {
  const { rates } = await easyship<{ rates: EasyshipRate[] }>("/rates", {
    method: "POST",
    body: JSON.stringify({
      origin_address: ORIGIN_ADDRESS,
      destination_address: opts.destination,
      incoterms: INCOTERMS,
      set_as_residential: true,
      courier_settings: { show_courier_logo_url: true, apply_shipping_rules: true },
      shipping_settings: {
        output_currency: opts.currency.toUpperCase(),
        units: SHIPPING_UNITS,
      },
      parcels: buildParcels(opts.declaredValue, opts.currency),
    }),
  });

  return rates ?? [];
}

/**
 * Create a shipment record.
 *
 * This does NOT book the courier and costs nothing — the shipment lands in the
 * Easyship dashboard at `label_state: "not_created"`. Buying the label (a
 * separate call, or `buy_label: true` here) is what books UPS and draws down
 * your Easyship balance. We deliberately leave that as a manual step.
 */
export async function createShipment(opts: {
  destination: EasyshipAddress;
  courierServiceId: string;
  platformOrderNumber: string;
  declaredValue: number;
  currency: string;
  buyLabel?: boolean;
}): Promise<{ easyship_shipment_id: string; tracking_page_url?: string }> {
  const { shipment } = await easyship<{
    shipment: { easyship_shipment_id: string; tracking_page_url?: string };
  }>("/shipments", {
    method: "POST",
    body: JSON.stringify({
      origin_address: ORIGIN_ADDRESS,
      destination_address: opts.destination,
      incoterms: INCOTERMS,
      set_as_residential: true,
      courier_settings: {
        // Nested, not top-level — the prose docs get this wrong, the spec does not.
        courier_service_id: opts.courierServiceId,
        // Fail loudly rather than silently substituting a courier the customer
        // did not pay for.
        allow_fallback: false,
        apply_shipping_rules: true,
      },
      order_data: {
        platform_name: "dashpilot-site",
        platform_order_number: opts.platformOrderNumber,
      },
      shipping_settings: {
        units: SHIPPING_UNITS,
        buy_label: opts.buyLabel ?? false,
        printing_options: { format: "pdf", label: "A4" },
      },
      parcels: buildParcels(opts.declaredValue, opts.currency),
    }),
  });

  return shipment;
}

/**
 * The full country list Easyship supports.
 *
 * Paginated at 100/page. Cached for a day — it changes approximately never and
 * every live call eats into a 60 req/min budget shared with rate quotes.
 */
export async function getCountries(): Promise<EasyshipCountry[]> {
  const out: EasyshipCountry[] = [];

  for (let page = 1; page <= 10; page++) {
    const { countries, meta } = await easyship<{
      countries: EasyshipCountry[];
      meta: { pagination: { next: number | null } };
    }>(`/countries?per_page=100&page=${page}`, {
      method: "GET",
      next: { revalidate: 86400 },
    });

    out.push(...(countries ?? []));
    if (!meta?.pagination?.next) break;
  }

  return out;
}
