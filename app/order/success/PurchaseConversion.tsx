"use client";

import { useEffect } from "react";

import { useConsent } from "@/lib/consent";
import { PURCHASE_LABEL, trackConversion } from "@/lib/gtag";

/**
 * Reports the purchase to Google Ads once the visitor has consented, which on
 * a first visit may happen on this very page. The Stripe session ID doubles as
 * the transaction ID, so a reload or a later visit to the same URL is
 * de-duplicated by Google instead of counting twice.
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
    if (consent !== "granted") return;
    trackConversion(PURCHASE_LABEL, {
      value,
      currency,
      transaction_id: transactionId,
    });
  }, [consent, transactionId, value, currency]);

  return null;
}
