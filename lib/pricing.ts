/**
 * DashKit unit pricing, in whole euros net of VAT. Shared by the order form
 * (preview) and /api/checkout (what Stripe actually charges) so the two can't
 * drift apart.
 */

/** Full price: device + plug-and-play harness. */
export const BASE_PRICE_EUR = Number(process.env.NEXT_PUBLIC_PRICE_EUR) || 139;

/** Knocked off the base price when the buyer skips the harness. */
export const DEVICE_ONLY_DISCOUNT_EUR = 12;

/**
 * Site-wide special offer, as a percentage off the device price (shipping is
 * not discounted). Defaults to 20; set NEXT_PUBLIC_OFFER_PERCENT=0 to end the
 * offer, which also hides every banner and strikethrough price.
 */
const offerEnv = Number(process.env.NEXT_PUBLIC_OFFER_PERCENT ?? 20);
export const OFFER_PERCENT =
  Number.isFinite(offerEnv) && offerEnv > 0 && offerEnv < 100 ? offerEnv : 0;
export const OFFER_ACTIVE = OFFER_PERCENT > 0;

/** Price before the special offer, shown struck through while it runs. */
export function listPriceEur(deviceOnly: boolean): number {
  return deviceOnly ? BASE_PRICE_EUR - DEVICE_ONLY_DISCOUNT_EUR : BASE_PRICE_EUR;
}

/** What the buyer actually pays, rounded to whole euros. */
export function unitPriceEur(deviceOnly: boolean): number {
  return Math.round((listPriceEur(deviceOnly) * (100 - OFFER_PERCENT)) / 100);
}
