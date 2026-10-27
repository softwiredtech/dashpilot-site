/**
 * Google Ads tag. Like the Umami website ID, the conversion ID is a public
 * identifier (it ends up in the page source anyway), so it lives here with an
 * env override. Conversion labels come from each conversion action's
 * "Install manually" snippet: the part after the slash in
 * `send_to: 'AW-.../<label>'`. A conversion with no label is simply not sent.
 */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-18389147141";

export const PURCHASE_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL;
/** Optional secondary conversion, fired when the buyer is sent to Stripe. */
export const BEGIN_CHECKOUT_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_BEGIN_CHECKOUT_LABEL;

type GtagArgs = [command: string, ...args: unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Queues a gtag command. Safe to call before gtag.js has loaded (it drains the
 * queue on arrival) and a no-op in effect if it never loads, which is the case
 * without cookie consent or outside production.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function gtag(..._args: GtagArgs) {
  window.dataLayer = window.dataLayer ?? [];
  // gtag.js expects the `arguments` object itself, not a plain array.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export function trackConversion(
  label: string | undefined,
  params: Record<string, unknown> = {}
) {
  if (!label) return;
  gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}`, ...params });
}
