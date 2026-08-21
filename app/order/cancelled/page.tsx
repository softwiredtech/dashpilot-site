import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment cancelled | DashKit",
};

export default function OrderCancelled() {
  return (
    <div className="placeholder">
      <div className="container">
        <div className="page">
          <div className="eyebrow">Payment cancelled</div>
          <h1>No charge was made.</h1>
          <p>
            Your payment was cancelled and you have not been charged. You can
            try again whenever you&apos;re ready.
          </p>
          <Link href="/order" className="back">
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
            Back to order
          </Link>
        </div>
      </div>
    </div>
  );
}
