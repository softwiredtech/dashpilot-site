/**
 * Umami custom events. Umami is cookieless, so unlike the Google Ads tag this
 * needs no consent. Never put personal data (names, emails, addresses) in an
 * event: only choices like model, country or which button was clicked.
 *
 * Outside production the Umami script isn't loaded, so events are logged to
 * the console instead, which is handy for checking them locally.
 */

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

// The script loads afterInteractive, so events from the first moments of a
// visit (a section already on screen, an early click) wait here for it.
const queue: [string, EventData][] = [];
let flushTimer: ReturnType<typeof setInterval> | undefined;
let flushTries = 0;

function flush() {
  if (window.umami) {
    for (const [event, data] of queue.splice(0)) window.umami.track(event, data);
  }
  // Give up after ~10 s: outside production, or blocked by an ad blocker.
  if (window.umami || ++flushTries > 20) {
    clearInterval(flushTimer);
    flushTimer = undefined;
    queue.length = 0;
  }
}

export function track(event: string, data: EventData = {}) {
  if (typeof window === "undefined") return;
  const payload = { page: window.location.pathname, ...data };

  if (process.env.NODE_ENV !== "production") {
    console.debug("[umami]", event, payload);
  }
  if (window.umami) {
    window.umami.track(event, payload);
    return;
  }
  queue.push([event, payload]);
  flushTimer ??= setInterval(flush, 500);
}
