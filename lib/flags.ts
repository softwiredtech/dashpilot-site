/**
 * Developer early access ordering opened 2026-07-31 (EU, UK, US), so orders
 * are ON by default. Set NEXT_PUBLIC_ORDERS_OPEN=false to close ordering
 * again: /order falls back to the pricing & availability page and
 * /api/checkout refuses to create Stripe sessions.
 */
export const ORDERS_OPEN = process.env.NEXT_PUBLIC_ORDERS_OPEN !== "false";

/** Label for every "buy" entry point, so they stay consistent site-wide.
 *  "Early access" is in the label so nobody reaches checkout expecting a
 *  finished consumer product. */
export const ORDER_CTA_LABEL = ORDERS_OPEN
  ? "Get early access"
  : "Pricing & availability";

/** The same entry point, trimmed for the phone-width nav where the full label
 *  wraps onto two lines and pushes the brand under the social marks. */
export const ORDER_CTA_LABEL_SHORT = ORDERS_OPEN ? "Order" : "Pricing";
