/**
 * Physical + commercial facts about a DashKit shipment.
 *
 * These values are sent to Easyship to quote rates and to create the shipment.
 * Wrong values here mean wrong quotes, and UPS will reweigh the parcel at their
 * depot and bill the difference back to you weeks later — so keep them honest.
 */

/**
 * Where parcels ship from.
 *
 * TODO(ahmed): replace the placeholder street/postcode/contact details with the
 * real pickup address before going live. Easyship quotes from this address.
 */
export const ORIGIN_ADDRESS = {
  line_1: "REPLACE ME — street and house number",
  city: "Budapest",
  postal_code: "1011",
  country_alpha2: "HU",
  company_name: "Softwired Technologies Kft.",
  contact_name: "REPLACE ME — pickup contact",
  contact_email: "info@softwiredtech.com",
  contact_phone: "REPLACE ME — pickup phone",
};

/** Outer box, as measured. Easyship is told cm/kg (see SHIPPING_UNITS). */
export const PARCEL_BOX = {
  length: 19.5,
  width: 11.5,
  height: 6.5,
};

/** Gross weight of the packed box, in kg. */
export const PARCEL_TOTAL_WEIGHT_KG = 0.5;

/** Weight of the product alone (excludes packaging), in kg. */
export const ITEM_WEIGHT_KG = 0.45;

export const SHIPPING_UNITS = { weight: "kg", dimensions: "cm" } as const;

/**
 * Customs description of the goods.
 *
 * `category` is what Easyship requires when no HS code is given. If your
 * accountant gives you a proper HS code (for a BLE/CAN-FD interface it is
 * plausibly 8517.62), set EASYSHIP_HS_CODE and it will be sent alongside.
 */
export const ITEM_DESCRIPTION = "DashKit — CAN-FD to Bluetooth interface";
export const ITEM_CATEGORY = "electronics";
export const ITEM_HS_CODE = process.env.EASYSHIP_HS_CODE || undefined;
export const ITEM_ORIGIN_COUNTRY = "HU";

/**
 * Who pays import duties.
 *
 * Irrelevant while we ship EU-only (no intra-EU customs). When US and other
 * non-EU destinations are switched on, revisit this: "DDP" means we quote and
 * collect duty upfront so the customer is not ambushed by a UPS invoice,
 * "DDU" means they pay on delivery.
 */
export const INCOTERMS: "DDU" | "DDP" = "DDU";

/** Only these couriers are offered. Empty string disables the filter. */
export const COURIER_UMBRELLA =
  process.env.EASYSHIP_COURIER_UMBRELLA ?? "UPS";

/**
 * EU member states. This is a *filter* over the live Easyship country list,
 * not a substitute for it — country names and codes still come from the API.
 *
 * To ship further afield, add codes here (or drop the filter entirely).
 */
export const ALLOWED_COUNTRY_CODES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
]);
