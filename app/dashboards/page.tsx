import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import DashShowcase from "@/components/DashShowcase";
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
            src="/images/dash-hero.jpg"
            alt="A phone running DashPilot in a stand on a Tesla dashboard, seen through the steering wheel"
            fill
            sizes="(max-width: 749px) 160vw, 100vw"
            className="dash-hero-bg"
            priority
          />
        </div>
        <div className="dash-hero-shade" aria-hidden="true" />
        <div className="dash-hero-inner">
          <div className="dash-hero-copy">
            <h1>DashKit</h1>
            <p className="dash-hero-sub">
              A fully customizable instrument cluster for your Tesla, right on your phone
            </p>
          </div>
          <div className="dash-hero-actions">
            <Link href="/order" className="cta-primary dash-hero-cta">
              {ORDER_CTA_LABEL}
            </Link>
            <p className="dash-hero-note">
              {ORDERS_OPEN
                ? "Ships to EU, UK, US, Canada & Australia"
                : "First batch ships end of August 2026"}
            </p>
          </div>
        </div>
        <a href="#in-the-car" className="dash-hero-scroll" aria-label="Scroll to see more">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
      </section>

      {/* ---------- IN THE CAR ---------- */}
      <section className="section dash-top" id="in-the-car">
        <div className="container">
          <h2>
            Your phone becomes the <span className="accent">instrument cluster</span>
          </h2>

          <div className="incar">
            <figure className="incar-video">
              {/* Same reel as the home page. Phones get the 720p cut. */}
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
              <figcaption>
                Real drives, no renders. Swapping Retro for Ambient at the
                lights, a custom gauge grid, Ambient in mph, and Retro through
                a tunnel.
              </figcaption>
            </figure>

            <div className="incar-photos">
              <figure className="incar-photo">
                <Image
                  src="/images/dash-in-car-1.jpg"
                  alt="A phone running DashPilot in a stand on a Tesla dashboard, showing speed, gear, battery and the speed limit"
                  width={1600}
                  height={1200}
                  sizes="(max-width: 720px) 100vw, 540px"
                />
              </figure>
              <figure className="incar-photo">
                <Image
                  src="/images/dash-in-car-light.jpg"
                  alt="DashPilot in its light theme on a Tesla dashboard, showing pack voltage, regen limit, battery current and speed while driving into a tunnel"
                  width={1600}
                  height={1200}
                  sizes="(max-width: 720px) 100vw, 540px"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- DASH APPS ---------- */}
      <section className="section" id="dash-apps">
        <div className="container">
          <p className="eyebrow">Dash apps</p>
          <h2>
            Countless ways to <span className="accent">read the road</span>
          </h2>
          <p className="dash-lead">
            These are the dashes riding along today, each one in light and
            dark, each pulling from the same live signal set. New ones land with
            every update, and because a dash is just a module, nothing stops you
            from forking one or building your own.
          </p>

          <DashShowcase />
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section final-cta">
        <div className="container">
          <h2>Get the dash on your phone.</h2>
          <p className="hero-sub">
            {ORDERS_OPEN
              ? "Order DashKit, pair over Bluetooth, and pick the dash that fits your drive."
              : "Pair DashKit over Bluetooth and pick the dash that fits your drive. First batch ships end of August 2026."}
          </p>
          <div className="cta-row">
            <Link href="/order" className="cta-primary">
              {ORDER_CTA_LABEL}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
