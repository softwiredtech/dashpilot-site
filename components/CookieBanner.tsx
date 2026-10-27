"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { onConsentSettingsOpen, setConsent, useConsent } from "@/lib/consent";

/**
 * Asks once, before any advertising cookies are set. Both choices are one
 * click and equally prominent, as EU regulators expect. The footer's
 * "Cookie settings" link brings it back.
 */
export default function CookieBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => onConsentSettingsOpen(() => setReopened(true)), []);

  // `undefined` = not mounted yet; don't flash the banner on returning visitors.
  if (consent === undefined || (consent !== null && !reopened)) return null;

  function choose(choice: "granted" | "denied") {
    setConsent(choice);
    setReopened(false);
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <p>
        We&apos;d like to use Google Ads cookies to see which of our ads bring
        people here. Page-view counting stays cookieless either way.{" "}
        <Link href="/privacy-policy#cookies">Details</Link>
      </p>
      <div className="cookie-banner-actions">
        <button type="button" className="cta-secondary" onClick={() => choose("denied")}>
          Reject
        </button>
        <button type="button" className="cta-secondary" onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
