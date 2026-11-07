import Link from "next/link";

import { ORDERS_OPEN } from "@/lib/flags";
import {
  listPriceEur,
  OFFER_ACTIVE,
  OFFER_PERCENT,
  unitPriceEur,
} from "@/lib/pricing";

/** "20% off · Special offer €111 €139 ›" link to /order, shown above a hero
 *  title. Renders nothing once the offer ends or ordering closes. */
export default function OfferPill({ location }: { location: string }) {
  if (!OFFER_ACTIVE || !ORDERS_OPEN) return null;

  return (
    <Link
      href="/order"
      className="offer-pill"
      data-event="offer-pill"
      data-event-location={location}
    >
      <span className="offer-chip">{OFFER_PERCENT}% off</span>
      <span className="offer-pill-text">
        Special offer
        <span className="offer-pill-price">
          €{unitPriceEur(false)} <s>€{listPriceEur(false)}</s>
        </span>
      </span>
      <svg className="offer-pill-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
