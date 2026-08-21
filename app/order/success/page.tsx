import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order confirmed | DashKit",
};

function Confirmation() {
  return (
    <div className="page">
      <div className="eyebrow">Order confirmed</div>
      <h1>Thank you!</h1>
      <p>
        Your DashKit order is confirmed and a receipt has been emailed to you.
        We&apos;ll be in touch about shipping.
      </p>
      <Link href="/" className="back">
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
        Back to home
      </Link>
    </div>
  );
}

export default function OrderSuccess() {
  return (
    <div className="placeholder">
      <div className="container">
        <Suspense fallback={<div className="page" />}>
          <Confirmation />
        </Suspense>
      </div>
    </div>
  );
}
