import Link from "next/link";
import type { Metadata } from "next";

import { ORDER_CTA_LABEL, ORDERS_OPEN } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Install DashKit — Video guide & step-by-step",
  description:
    "How to install DashKit in your Tesla. Watch the install video or follow the written step-by-step guide to connect DashKit to the CAN harness and pair it with DashPilot.",
};

const VIDEO_ID = "ooZZbKPaV5I";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.softwiredtech.dashpilot";
const TESTFLIGHT_URL = "https://testflight.apple.com/join/hXTwZmh5";

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

        <div className="install-app">
          <div className="install-app-copy">
            <p className="eyebrow">Before you start</p>
            <h2>Get the DashPilot app</h2>
            <p>
              DashPilot is the companion app for DashKit — you&apos;ll use it to
              set up your device after installing it in the car. Download it on
              your phone before you begin.
            </p>
          </div>
          <div className="app-badges">
            <a
              href={PLAY_STORE_URL}
              className="app-badge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M3.6 1.8 13.7 12 3.6 22.2c-.37-.2-.6-.6-.6-1.1V2.9c0-.5.23-.9.6-1.1Zm11.2 9.1L5.6 1.6l11.1 6.4-1.9 2.9Zm2.9-1.5 2.9 1.7c.9.5.9 1.8 0 2.3l-2.9 1.7L14.8 12l2.9-2.6ZM5.6 22.4l9.2-9.3 1.9 2.9-11.1 6.4Z" />
              </svg>
              <span className="app-badge-text">
                <small>Get it on</small>
                Google Play
              </span>
            </a>
            <a
              href={TESTFLIGHT_URL}
              className="app-badge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.15-.47 7.81 1.31 10.36.86 1.25 1.9 2.65 3.25 2.6 1.31-.05 1.8-.84 3.38-.84 1.58 0 2.02.84 3.4.81 1.4-.02 2.29-1.27 3.15-2.53.99-1.45 1.4-2.85 1.42-2.92-.03-.01-2.73-1.05-2.76-4.15ZM14.46 4.9c.72-.87 1.2-2.08 1.07-3.29-1.03.04-2.29.69-3.03 1.56-.66.77-1.25 2-1.09 3.18 1.15.09 2.33-.58 3.05-1.45Z" />
              </svg>
              <span className="app-badge-text">
                <small>iOS beta on</small>
                TestFlight
              </span>
            </a>
          </div>
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
