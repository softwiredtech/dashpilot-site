/**
 * Ordering is closed until the first batch ships. While closed, /order shows
 * price and availability instead of the checkout form, and /api/checkout
 * refuses to create Stripe sessions.
 *
 * Set NEXT_PUBLIC_ORDERS_OPEN=true to open ordering. Anything else (including
 * unset) keeps it closed, so a forgotten env var fails safe.
 */
export const ORDERS_OPEN = process.env.NEXT_PUBLIC_ORDERS_OPEN === "true";

/** Label for every "buy" entry point, so they stay consistent site-wide. */
export const ORDER_CTA_LABEL = ORDERS_OPEN
  ? "Order DashKit"
  : "Pricing & availability";
