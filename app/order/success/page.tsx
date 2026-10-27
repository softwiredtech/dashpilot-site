import Link from "next/link";
import type { Metadata } from "next";

import { getStripe } from "@/lib/stripe";

import PurchaseConversion from "./PurchaseConversion";

export const metadata: Metadata = {
  title: "Order confirmed | DashKit",
};

/**
 * Looks the Checkout session up server-side so the conversion carries the
 * amount Stripe actually charged, and only fires for a paid session: the
 * session_id in the URL alone proves nothing.
 */
async function paidSession(sessionId: string | undefined) {
  if (!sessionId) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return null;
    return {
      id: session.id,
      // Net of VAT (shipping included), so ad ROAS isn't inflated by tax.
      value: (session.amount_subtotal ?? 0) / 100,
      currency: (session.currency ?? "eur").toUpperCase(),
    };
  } catch (err) {
    console.error("Could not retrieve checkout session:", err);
    return null;
  }
}

export default async function OrderSuccess({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const session = await paidSession(searchParams.session_id);

  return (
    <div className="placeholder">
      <div className="container">
        <div className="page">
          <div className="eyebrow">Order confirmed</div>
          <h1>Thank you!</h1>
          <p>
            Your DashKit order is confirmed and a receipt has been emailed to
            you. We&apos;ll be in touch about shipping.
          </p>
          <Link href="/" className="back">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to home
          </Link>
        </div>
        {session && (
          <PurchaseConversion
            transactionId={session.id}
            value={session.value}
            currency={session.currency}
          />
        )}
      </div>
    </div>
  );
}
