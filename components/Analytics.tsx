"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { track } from "@/lib/analytics";

/**
 * Site-wide Umami tracking driven by data attributes, so server components
 * can be tagged without becoming client components:
 *
 * - `data-event="order-cta" data-event-location="hero"` on a link or button
 *   sends `order-cta` with `{ location: "hero" }` when it's clicked.
 * - `data-section="dash-apps"` sends `section-view` with
 *   `{ section: "dash-apps" }` the first time it scrolls into view on a page.
 * - Any click on a link to another site (or mailto:) sends `outbound-click`
 *   with where it goes, so Discord, GitHub, app stores etc. need no tagging.
 *
 * Umami's own `data-umami-event` does the first one too, but it turns
 * internal links into full page reloads, which loses client-side navigation.
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-event], a[href]"
      );
      if (!el) return;

      if (el.dataset.event) {
        const data: Record<string, string> = {};
        for (const [key, value] of Object.entries(el.dataset)) {
          if (key.startsWith("event") && key !== "event" && value) {
            data[key[5].toLowerCase() + key.slice(6)] = value;
          }
        }
        track(el.dataset.event, data);
        return;
      }

      const href = el.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) {
        track("outbound-click", { to: "email" });
        return;
      }
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin && url.protocol.startsWith("http")) {
          track("outbound-click", {
            to: (url.hostname + url.pathname).replace(/^www\./, "").replace(/\/$/, ""),
          });
        }
      } catch {
        // Not a URL; nothing to track.
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Re-scan on every navigation: each page view counts its sections afresh.
  useEffect(() => {
    const seen = new Set<string>();
    const onEntries = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        const section = (entry.target as HTMLElement).dataset.section;
        if (!entry.isIntersecting || !section || seen.has(section)) continue;
        seen.add(section);
        track("section-view", { section });
      }
    };
    // A section counts once its top reaches the middle of the screen, rather
    // than when a sliver peeks in at the bottom. Short ones at the end of the
    // page (the footer) never get that high, so mostly visible counts too.
    const observers = [
      new IntersectionObserver(onEntries, { rootMargin: "0px 0px -50% 0px" }),
      new IntersectionObserver(onEntries, { threshold: 0.6 }),
    ];
    document.querySelectorAll("[data-section]").forEach((el) => {
      observers.forEach((io) => io.observe(el));
    });
    return () => observers.forEach((io) => io.disconnect());
  }, [pathname]);

  return null;
}
