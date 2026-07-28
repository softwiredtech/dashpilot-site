/** Product price in EUR (major units). */
export function productPriceEur() {
  return Number(process.env.NEXT_PUBLIC_PRICE_EUR) || 149;
}

/** Format a EUR amount for display, e.g. 149 -> "€149.00". */
export function formatEur(amount: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

/** Stripe wants integer minor units. Rounds to avoid float drift. */
export function toCents(amount: number) {
  return Math.round(amount * 100);
}
