"use client";

import { openConsentSettings } from "@/lib/consent";

export default function CookieSettingsLink() {
  return (
    <button type="button" className="footer-link-button" onClick={openConsentSettings}>
      Cookie settings
    </button>
  );
}
