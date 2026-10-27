"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

import { useConsent } from "@/lib/consent";
import { GOOGLE_ADS_ID, gtag } from "@/lib/gtag";

const GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const;

const DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

/**
 * Consent mode "basic": gtag.js is not even requested until the visitor
 * accepts cookies, so a visitor who declines sends Google nothing. Withdrawing
 * consent later can't unload the script, so it flips consent to denied and
 * the tag stops setting or reading cookies.
 */
export default function GoogleTag() {
  const consent = useConsent();
  const configured = useRef(false);

  useEffect(() => {
    if (consent === "granted" && !configured.current) {
      configured.current = true;
      gtag("consent", "default", GRANTED);
      gtag("js", new Date());
      gtag("config", GOOGLE_ADS_ID);
    } else if (consent === "granted") {
      gtag("consent", "update", GRANTED);
    } else if (consent === "denied" && configured.current) {
      gtag("consent", "update", DENIED);
    }
  }, [consent]);

  if (consent !== "granted" && !configured.current) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      strategy="afterInteractive"
    />
  );
}
