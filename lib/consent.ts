"use client";

import { useEffect, useState } from "react";

/**
 * The visitor's answer to the cookie banner, kept in localStorage. Nothing
 * that sets cookies (the Google tag) loads until this is "granted"; Umami is
 * cookieless and runs regardless.
 */
export type Consent = "granted" | "denied";

const STORAGE_KEY = "dashkit-consent";
const CHANGE_EVENT = "dashkit-consent-change";
const OPEN_EVENT = "dashkit-consent-open";

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Private windows and blocked site data: treat as "not answered yet".
    return null;
  }
}

export function setConsent(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Still applies for this page view, just won't be remembered.
  }
  window.dispatchEvent(new CustomEvent<Consent>(CHANGE_EVENT, { detail: consent }));
}

/** Re-shows the banner, for the footer's "Cookie settings" link. */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentSettingsOpen(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

/**
 * Current consent, updated live when the banner is answered. `undefined`
 * until mounted (the server can't know), `null` when not answered yet.
 */
export function useConsent(): Consent | null | undefined {
  const [consent, setState] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    setState(readConsent());
    const handler = (e: Event) => setState((e as CustomEvent<Consent>).detail);
    window.addEventListener(CHANGE_EVENT, handler);
    return () => window.removeEventListener(CHANGE_EVENT, handler);
  }, []);

  return consent;
}
