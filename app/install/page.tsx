import Link from "next/link";
import type { Metadata } from "next";

import { ORDER_CTA_LABEL, ORDERS_OPEN } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Install DashKit — Video guide & step-by-step",
  description:
    "How to install DashKit in your Tesla. Watch the install video or follow the written step-by-step guide to connect DashKit to the CAN harness and pair it with DashPilot.",
};

const VIDEO_ID = "ooZZbKPaV5I";

type Step = {
  title: string;
  detail: string;
};

const steps: Step[] = [
  {
    title: "Pull back the door seal",
    detail:
      "Slightly pull back the door seal (weather strip) along the A-pillar to free up the trim.",
  },
  {
    title: "Remove the upper plastic cover",
    detail: "Take off the upper A-pillar plastic cover.",
  },
  {
    title: "Release the lower cover clip",
    detail: "Remove the clip that holds the lower plastic cover in place.",
  },
  {
    title: "Remove the lower plastic cover",
    detail: "Take off the lower A-pillar plastic cover.",
  },
  {
    title: "Expose the blue A-pillar connector",
    detail:
      "Remove the other plastic clip to get access to the blue A-pillar connector.",
  },
  {
    title: "Connect the blue harness",
    detail:
      "Plug the male part of the blue DashKit harness connector into the Tesla A-pillar connector.",
  },
  {
    title: "Release the white Tesla cable",
    detail: "Pull out the white cable from the white Tesla connector.",
  },
  {
    title: "Connect the white Tesla connector to DashKit",
    detail:
      "Plug the white Tesla connector into the female part of the white DashKit harness connector.",
  },
  {
    title: "Complete the white harness inline",
    detail:
      "Plug the male part of the white DashKit harness connector into the white Tesla connector.",
  },
  {
    title: "Power up DashKit",
    detail:
      "Plug in DashKit — a green LED indicates a successful power-up.",
  },
  {
    title: "Tidy up",
    detail:
      "Hide DashKit, then put back the clips and covers you removed earlier.",
  },
  {
    title: "Enjoy DashKit",
    detail: "That's it — pair with DashPilot and enjoy the drive :)",
  },
];

export default function Install() {
  return (
    <section className="specs-page install-page">
      <div className="container">
        <div className="install-head">
          <p className="eyebrow">Installation</p>
          <h1>Install DashKit in about 2 minutes</h1>
          <p className="hero-sub hero-sub--left">
            DashKit plugs inline into your Tesla&apos;s CAN harness — no cutting,
            no soldering. The whole install takes roughly two minutes. Watch the
            full walkthrough below, or follow the written steps if you&apos;d
            rather read.
          </p>
          <p className="install-fit">
            This guide is for the <strong>Model 3 and Model Y</strong> with the
            blue A-pillar connector.
          </p>
        </div>

        <div className="video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
            title="How to install DashKit"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="install-steps">
          <p className="eyebrow">Step by step</p>
          <h2>Prefer to read?</h2>
          <ol className="step-list">
            {steps.map((step, i) => (
              <li className="step-item" key={step.title}>
                <span className="step-num">{i + 1}</span>
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="install-cta">
          <p className="hero-sub">
            {ORDERS_OPEN
              ? "Don't have DashKit yet? Order one and start building."
              : "Don't have DashKit yet? The first batch ships end of August 2026."}
          </p>
          <div className="cta-row">
            <Link href="/order" className="cta-primary">
              {ORDER_CTA_LABEL}
            </Link>
            <Link href="/specs" className="cta-secondary">
              View specs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
