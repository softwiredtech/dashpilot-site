/**
 * DashKit unit pricing, in whole euros net of VAT. Shared by the order form
 * (preview) and /api/checkout (what Stripe actually charges) so the two can't
 * drift apart.
 */

/** Full price: device + plug-and-play harness. */
export const BASE_PRICE_EUR = Number(process.env.NEXT_PUBLIC_PRICE_EUR) || 139;

/** Knocked off the base price when the buyer skips the harness. */
export const DEVICE_ONLY_DISCOUNT_EUR = 12;

export function unitPriceEur(deviceOnly: boolean): number {
  return deviceOnly ? BASE_PRICE_EUR - DEVICE_ONLY_DISCOUNT_EUR : BASE_PRICE_EUR;
}
