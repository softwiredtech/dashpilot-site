/**
 * Volume pricing, shared by the order form (preview) and the checkout API
 * (source of truth). At BULK_MIN_QTY units and up, the per-unit price drops
 * by BULK_DISCOUNT_PCT, rounded to a whole euro (€159 → €127).
 */
export const BULK_MIN_QTY = 5;
export const BULK_DISCOUNT_PCT = 20;
export const MAX_QTY = 20;

export function unitPriceEur(baseEur: number, quantity: number): number {
  return quantity >= BULK_MIN_QTY
    ? Math.round(baseEur * (1 - BULK_DISCOUNT_PCT / 100))
    : baseEur;
}
