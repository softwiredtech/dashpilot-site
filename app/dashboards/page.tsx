import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import DashShowcase from "@/components/DashShowcase";
import OfferPill from "@/components/OfferPill";
import { ORDER_CTA_LABEL, ORDERS_OPEN } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Dashboards: DashPilot dash apps",
  description:
    "DashPilot turns your phone into a live car dashboard. Swap between dash apps (Vanilla, Ambient, Analog and Retro), each in light and dark, each with blind spot monitoring, assist status, battery telemetry and more.",
};

export default function Dashboards() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      {/* Full-screen photo of the dash in use, title on the left over the
          wheel rim on desktop, split top/bottom around the phone on mobile. */}
      <section className="dash-hero">
        <div className="dash-hero-media">
          <Image
            src="/images/dash-hero-3.jpg"
            alt="A phone running the Felina dash in DashPilot, in a stand on a Tesla dashboard, seen past the steering wheel"
            fill
            sizes="(max-width: 749px) 250vw, 100vw"
            className="dash-hero-bg"
            priority
          />
        </div>
        <div className="dash-hero-shade" aria-hidden="true" />
        <div className="dash-hero-inner">
          <div className="dash-hero-copy">
            <OfferPill location="dashboards-hero" />
            <h1>DashKit</h1>
            <p className="dash-hero-sub">
              A fully customizable instrument cluster for your Tesla, right on your phone
            </p>
          </div>
          <div className="dash-hero-actions">
            <Link
              href="/order"
              className="cta-primary dash-hero-cta"
              data-event="order-cta"
              data-event-location="dashboards-hero"
            >
              {ORDER_CTA_LABEL}
            </Link>
            <p className="dash-hero-note">
              {ORDERS_OPEN
                ? "Ships to EU, UK, US, Canada & Australia"
                : "First batch ships end of August 2026"}
            </p>
          </div>
        </div>
        <a
          href="#dash-apps"
          className="dash-hero-scroll"
          aria-label="Scroll to see more"
          data-event="scroll-arrow"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
      </section>

      {/* ---------- DASH APPS ---------- */}
      <section className="section dash-top" id="dash-apps" data-section="dash-apps">
        <div className="container">
          <p className="eyebrow">Dash apps</p>
          <h2>
            Choose the dash <span className="accent">you like most</span>
          </h2>
          <p className="dash-lead">
            The app is built to be extended with new dash styles, and we keep
            adding more with every update.
          </p>

          <DashShowcase />
        </div>
      </section>

      {/* ---------- IN THE CAR ---------- */}
      <section className="section" id="in-the-car" data-section="in-the-car">
        <div className="container">
          <h2>
            See it <span className="accent">in the car</span>
          </h2>
        </div>

        {/* Full-bleed: the reel spans the viewport, caption stays on the grid.
            Same reel as the home page. Phones get the 720p cut. */}
        <figure className="incar-video">
          <video
            poster="/media/dashkit-reel-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="A montage of real drives with DashPilot on the dash: swapping from Retro to Ambient at a red light and pulling away, a custom gauge grid dash on a city street, Ambient's big speed readout in mph, then Retro through a tunnel"
          >
            <source
              src="/media/dashkit-reel-1080.mp4"
              type="video/mp4"
              media="(min-width: 900px)"
            />
            <source src="/media/dashkit-reel-720.mp4" type="video/mp4" />
          </video>
          <figcaption className="container">
            Real drives, no renders. Swapping Retro for Ambient at the lights,
            a custom gauge grid, Ambient in mph, and Retro through a tunnel.
          </figcaption>
        </figure>
      </section>

      {/* ---------- HOW IT WORKS + ORDER ---------- */}
      {/* Car -> DashKit -> phone in one row that fits a phone screen, then
          the order button. The DashKit puck is drawn from the top-down
          product shot, LED and all. */}
      <section className="section how" id="how-it-works" data-section="how-it-works">
        <div className="container">
          <h2>
            DashKit reads the car. <span className="accent">DashPilot shows it.</span>
          </h2>

          <div className="how-flow">
            <figure className="how-node how-car">
              {/* Tesla "T" mark (Simple Icons). */}
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28.535-.968.672-1.395.672-1.395C19.625.612 15.528.015 12 0 8.472.015 4.375.61 0 2.349c0 0 .195.525.672 1.396C4.674 1.989 8.585 1.435 12 1.46v.003z" />
              </svg>
              <figcaption>Your Tesla</figcaption>
            </figure>

            <span className="how-link">
              <span className="how-link-label">CAN</span>
            </span>

            <figure className="how-node how-kit">
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="32" r="29" className="how-kit-rim" />
                <circle cx="32" cy="32" r="25.5" className="how-kit-face" />
                <circle cx="43.5" cy="25" r="2.6" className="how-kit-led" />
              </svg>
              <figcaption>DashKit</figcaption>
            </figure>

            <span className="how-link wireless">
              <span className="how-link-label">Bluetooth</span>
            </span>

            <figure className="how-node">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="14" height="20" x="5" y="2" rx="2.5" />
                <path d="M8.5 13a3.5 3.5 0 0 1 7 0" />
                <path d="m12 13 1.5-1.5" />
              </svg>
              <figcaption>DashPilot</figcaption>
            </figure>
          </div>

          <div className="cta-row cta-row--center how-actions">
            <Link
              href="/order"
              className="cta-primary"
              data-event="order-cta"
              data-event-location="dashboards-bottom"
            >
              {ORDER_CTA_LABEL}
            </Link>
            <Link
              href="/install"
              className="cta-secondary"
              data-event="install-cta"
              data-event-location="dashboards"
            >
              See how to install
            </Link>
          </div>
          <p className="how-note">
            {ORDERS_OPEN
              ? "Ships to EU, UK, US, Canada & Australia"
              : "First batch ships end of August 2026"}
          </p>
        </div>
      </section>

      {/* ---------- QUESTIONS ---------- */}
      <section className="section final-cta" data-section="questions">
        <div className="container">
          <h2>Have a question?</h2>
          <p className="hero-sub">
            Not sure it fits your car, or curious about something else? Drop
            us a line.
          </p>
          <div className="cta-row cta-row--center">
            <a
              href="mailto:info@softwiredtech.com?subject=Question%20about%20DashKit"
              className="cta-secondary"
              data-event="question-email"
              data-event-location="dashboards"
            >
              Write to us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
