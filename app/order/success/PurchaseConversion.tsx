"use client";

import { useEffect } from "react";

import { track } from "@/lib/analytics";
import { useConsent } from "@/lib/consent";
import { PURCHASE_LABEL, trackConversion } from "@/lib/gtag";

/**
 * Reports the purchase to Google Ads once the visitor has consented, which on
 * a first visit may happen on this very page. The Stripe session ID doubles as
 * the transaction ID, so a reload or a later visit to the same URL is
 * de-duplicated by Google instead of counting twice.
 *
 * Also sends a `purchase` event to Umami, which is cookieless and so doesn't
 * wait for consent. Umami can't de-duplicate, so a reload in the same tab is
 * skipped here.
 */
export default function PurchaseConversion({
  transactionId,
  value,
  currency,
}: {
  transactionId: string;
  value: number;
  currency: string;
}) {
  const consent = useConsent();

  useEffect(() => {
    const key = `umami-purchase-${transactionId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage blocked: better to risk a double count than to lose the sale.
    }
    track("purchase", { value, currency });
  }, [transactionId, value, currency]);

  useEffect(() => {
    if (consent !== "granted") return;
    trackConversion(PURCHASE_LABEL, {
      value,
      currency,
      transaction_id: transactionId,
    });
  }, [consent, transactionId, value, currency]);

  return null;
}
