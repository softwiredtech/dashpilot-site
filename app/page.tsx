import Image from "next/image";
import Link from "next/link";

import GithubIcon from "@/components/GithubIcon";
import { DiscordIcon } from "@/components/SocialIcons";
import { ORDER_CTA_LABEL, ORDERS_OPEN } from "@/lib/flags";
import { DISCORD, GITHUB_APP, GITHUB_FIRMWARE } from "@/lib/links";

const OVERVIEW_VIDEO_ID = "J97PuWTH-S4";

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container">
          <div className="hub-intro">
            <p className="eyebrow">For Tesla · 2× CAN</p>
            <h1>Customizable instrument cluster and controller for your Tesla</h1>
            <p className="hero-sub">
              DashKit plugs into your Tesla&apos;s CAN buses and puts your car
              on rules you write, all on open, community-built software.
            </p>
          </div>

          {/* Center: the device. Sides: the automations it unlocks, each
              pointing back at the hardware that runs them. */}
          <div className="hub">
            <div className="hub-col hub-col--left">
              <div className="hub-card hub-card--cyan">
                <svg className="hub-arrow" viewBox="0 0 40 16" fill="none" aria-hidden="true">
                  <line x1="38" y1="8" x2="8" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />
                  <path d="M14 2 6 8l8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="hub-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2.5" />
                    <path d="M8 14.5a4 4 0 0 1 8 0" />
                    <path d="m12 14.5 1.6-2.2" />
                  </svg>
                </div>
                <p className="hub-card-title">Live dashboard</p>
                <p className="hub-card-desc">
                  Your phone becomes an instrument cluster above the wheel:
                  speed, gear, battery, blind spot and Autopilot state, live.
                </p>
              </div>

              <div className="hub-card hub-card--blue">
                <svg className="hub-arrow" viewBox="0 0 40 16" fill="none" aria-hidden="true">
                  <line x1="38" y1="8" x2="8" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />
                  <path d="M14 2 6 8l8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="hub-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="2.5" />
                    <path d="M3 12h6.5M14.5 12H21M12 14.5V21" />
                  </svg>
                </div>
                <p className="hub-card-title">Wipers off on Autopilot</p>
                <p className="hub-card-desc">
                  Wipers set to off stay off when Autopilot engages. DashKit
                  stops the car from switching them back to auto.
                </p>
              </div>
            </div>

            <div className="hub-center">
              <div className="hub-device">
                <div className="hub-device-glow" aria-hidden="true" />
                <div className="hub-device-frame">
                  <Image
                    src="/images/dashkit_top.png"
                    alt="The DashKit device"
                    fill
                    sizes="200px"
                    className="hub-device-photo"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="hub-col hub-col--right">
              <div className="hub-card hub-card--green">
                <svg className="hub-arrow" viewBox="0 0 40 16" fill="none" aria-hidden="true">
                  <line x1="2" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />
                  <path d="M26 2l8 6-8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="hub-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
                    <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
                    <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
                  </svg>
                </div>
                <p className="hub-card-title">AC swing</p>
                <p className="hub-card-desc">
                  The dash vents sweep side to side like an oscillating fan,
                  for the driver, the passenger or both.
                </p>
              </div>

              <div className="hub-card hub-card--violet">
                <svg className="hub-arrow" viewBox="0 0 40 16" fill="none" aria-hidden="true">
                  <line x1="2" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />
                  <path d="M26 2l8 6-8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="hub-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2.5" />
                    <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" />
                    <circle cx="12" cy="12.5" r="1" fill="currentColor" stroke="none" />
                    <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
                    <path d="M9.8 9.6a3 3 0 0 1 4.4 0" />
                  </svg>
                </div>
                <p className="hub-card-title">Multi-touch triggers</p>
                <p className="hub-card-desc">
                  Three-, four-, and five-finger taps on the touchscreen
                  mapped to actions like opening the glovebox.
                </p>
              </div>
            </div>
          </div>

          <div className="cta-row cta-row--center">
            <Link href="/order" className="cta-primary">
              {ORDER_CTA_LABEL}
            </Link>
            <Link href="/specs" className="cta-secondary">
              View specs
            </Link>
          </div>

          <p className="hero-note" style={{ textAlign: "center" }}>
            {ORDERS_OPEN
              ? "Ships to EU, UK, US, Canada & Australia · Open source"
              : "Works with Tesla · 2× CAN · BLE 5 · First batch ships end of August 2026"}
          </p>
        </div>
      </section>

      {/* ---------- ON THE ROAD ---------- */}
      {/* Real driving footage, shown big and early so the first thing past the
          hero is proof that it works in a real car. */}
      <section className="section road">
        <div className="container">
          <div className="road-head">
            <div>
              <p className="eyebrow">Real footage, real cars</p>
              <h2>
                Your phone, now the <span className="accent">instrument cluster</span>.
              </h2>
            </div>
            <Link href="/dashboards" className="cta-secondary">
              See the dashboards →
            </Link>
          </div>

          <figure className="road-video">
            {/* Phones get the 720p cut, larger screens the 1080p one. */}
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
            <figcaption className="road-tag">Real drives · no renders</figcaption>
          </figure>

          <p className="road-note">
            DashKit reads the car&apos;s buses and DashPilot draws the dash on
            your phone, right above the wheel. Speed, gear, battery, blind spot
            and Autopilot state, live as you drive.
          </p>
          <a
            href={`https://www.youtube.com/watch?v=${OVERVIEW_VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="road-link"
          >
            Watch the full overview on YouTube →
          </a>
        </div>
      </section>

      {/* ---------- SPOTLIGHT: AUTOMATIONS ---------- */}
      <section className="section" id="features">
        <div className="container">
          <div className="spotlight">
            <div className="spotlight-copy">
              <p className="eyebrow">Automations that actually help</p>
              <h2>
                Your Tesla, running on <span className="accent">your rules</span>.
              </h2>
              <ul className="spotlight-list">
                <li className="dot--blue">
                  <span>Wipers stay off</span> your off setting holds when
                  Autopilot or ACC engages, instead of being forced to auto
                </li>
                <li className="dot--cyan">
                  <span>Climate stays on</span> keeps running for the time you
                  set in the app after you leave the car, then shuts off
                </li>
                <li className="dot--green">
                  <span>AC swing</span> sweeps the dash vents side to side,
                  for the driver, the passenger or both
                </li>
                <li className="dot--amber">
                  <span>Battery preheat</span> schedule it from the app so the
                  battery is warm and ready before you unplug and drive
                </li>
                <li className="dot--violet">
                  <span>Multi-finger taps</span> three-, four-, and five-finger
                  taps on the infotainment screen mapped to actions like the
                  glovebox, rear fan or AC swing
                </li>
              </ul>
            </div>
            <div className="spotlight-demo" aria-hidden="true">
              <div className="demo-row">
                <span className="demo-label">Autopilot</span>
                <span className="demo-state demo-state--on">ENGAGED</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Auto wipers</span>
                <span className="demo-state demo-state--off">OFF</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Climate keep-on</span>
                <span className="demo-state demo-state--on">30 MIN</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">AC swing</span>
                <span className="demo-state demo-state--on">SWEEPING</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">3-finger tap</span>
                <span className="demo-state demo-state--on">GLOVEBOX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- DEVICE / INSTALL ---------- */}
      <section className="section">
        <div className="container split">
          <div className="split-media">
            <div className="device-frame device-frame--wide">
              <Image
                src="/images/dashkit-installed.jpg"
                alt="DashKit connected to a car's wiring harness behind the trim"
                width={2160}
                height={2880}
                className="device-photo"
              />
            </div>
          </div>
          <div className="split-copy">
            <p className="eyebrow">The hardware</p>
            <h2>Built to live inside your Tesla</h2>
            <p>
              A compact, sealed module with two independent CAN interfaces, an
              RGB status LED, and Bluetooth Low Energy. It taps straight into the
              Tesla harness and disappears behind the trim. No screens to bolt
              on, no clutter on the dash.
            </p>
            <ul className="spec-list">
              <li><span>2× CAN</span> two independent buses</li>
              <li><span>BLE 5</span> wireless link to DashPilot on your phone</li>
              <li><span>ESP32-S3</span> with 16&nbsp;MB flash and OTA updates</li>
            </ul>
            <Link href="/specs" className="cta-secondary">
              Full specifications →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- OPEN SOURCE ---------- */}
      <section className="section os-section" id="open-source">
        <div className="container os-inner">
          <p className="eyebrow">Why DashKit is different</p>
          <h2>
            The features are built by the{" "}
            <span className="accent">open-source community</span>
          </h2>
          <p className="os-lead">
            DashKit isn&apos;t a locked black box. The firmware and the
            integrations are open, so the people who actually drive these cars
            are the ones extending them. Every new automation, every decoded
            signal, every supported model makes the device better for everyone,
            and nobody can take that away.
          </p>

          <div className="os-repos">
            <a
              href={GITHUB_FIRMWARE}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-link"
            >
              <GithubIcon />
              <span>
                <strong>dashkit-firmware</strong>
                <em>The firmware running on the device</em>
              </span>
            </a>
            <a
              href={GITHUB_APP}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-link"
            >
              <GithubIcon />
              <span>
                <strong>dashpilot</strong>
                <em>The companion phone app</em>
              </span>
            </a>
          </div>

          {/* The repos are where the code lives; Discord is where the people
              are. It gets its own full-width row so it doesn't read as a
              third repository. */}
          <a
            href={DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-link os-discord"
          >
            <DiscordIcon />
            <span>
              <strong>Join the Discord</strong>
              <em>
                Where the community decodes signals, trades dashboards and helps
                you get set up
              </em>
            </span>
          </a>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section final-cta">
        <div className="container">
          <h2>Open up your Tesla.</h2>
          <p className="hero-sub">
            {ORDERS_OPEN
              ? "Orders are open. Get the DashKit device and join the community building on top of it."
              : "The first batch ships end of August 2026. See what it costs and get a heads-up when ordering opens."}
          </p>
          <div className="cta-row cta-row--center">
            <Link href="/order" className="cta-primary">
              {ORDER_CTA_LABEL}
            </Link>
            <a
              href={DISCORD}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary cta-secondary--icon"
            >
              <DiscordIcon />
              Join the Discord
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
