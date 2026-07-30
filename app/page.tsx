import Image from "next/image";
import Link from "next/link";

import GithubIcon from "@/components/GithubIcon";
import { DiscordIcon } from "@/components/SocialIcons";
import { ORDER_CTA_LABEL, ORDERS_OPEN } from "@/lib/flags";
import { DISCORD, GITHUB_APP, GITHUB_FIRMWARE } from "@/lib/links";

import DeviceCarousel from "./components/DeviceCarousel";

const OVERVIEW_VIDEO_ID = "J97PuWTH-S4";

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">For Tesla · 2× CAN</p>
            <h1>
              The open source <span className="accent">Bluetooth</span> dongle
              for your Tesla
            </h1>
            <p className="hero-sub">
              DashKit plugs into your Tesla&apos;s CAN buses and opens them up to
              you. Control your car, build your own automations, and stream live
              data to your phone — all on open, community-built software.
            </p>

            <div className="cta-row cta-row--left">
              <Link href="/order" className="cta-primary">
                {ORDER_CTA_LABEL}
              </Link>
              <Link href="/specs" className="cta-secondary">
                View specs
              </Link>
            </div>

            <p className="hero-note">
              {ORDERS_OPEN
                ? "Works with Tesla · 2× CAN · BLE 5 · Open source"
                : "Works with Tesla · 2× CAN · BLE 5 · First batch ships end of August 2026"}
            </p>
          </div>

          <DeviceCarousel />
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="section" id="features">
        <div className="container">
          <p className="eyebrow">What DashKit does</p>
          <h2>
            Three things: <span className="accent">Dashboard</span>,{" "}
            <span className="accent">Automation</span>,{" "}
            <span className="accent">Controls</span>.
          </h2>

          <div className="features-video">
            <div className="video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${OVERVIEW_VIDEO_ID}`}
                title="DashKit — an open-source Bluetooth dongle for your Tesla"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2.5" />
                  <path d="M9 6h6M9 10h6M9 14h3" />
                </svg>
              </div>
              <p className="feature-tag">Dashboard</p>
              <h3>Every signal, live on your phone</h3>
              <p>
                Pair over Bluetooth and turn your phone into a real-time
                dashboard with the DashPilot app. Live gauges, custom readouts,
                and every signal off the bus — rendered as you drive.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
                </svg>
              </div>
              <p className="feature-tag">Automation</p>
              <h3>Your car reacts to context</h3>
              <p>
                Keep the auto wipers off the moment Autopilot or adaptive cruise
                engages, or map multi-finger infotainment touch gestures to
                actions like opening the glovebox or toggling the rear fan.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <circle cx="12" cy="16" r="1.5" />
                </svg>
              </div>
              <p className="feature-tag">Controls</p>
              <h3>Reach controls the car already has</h3>
              <p>
                Read and send messages on both CAN buses. Lock and unlock,
                trigger functions, and reach the controls your Tesla already has
                — now under your command.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SPOTLIGHT: AUTOMATIONS ---------- */}
      <section className="section">
        <div className="container">
          <div className="spotlight">
            <div className="spotlight-copy">
              <p className="eyebrow">Automations that actually help</p>
              <h2>
                Turn <span className="accent">finger taps</span> on the screen
                into real controls.
              </h2>
              <p className="spotlight-lead">
                Assign three-, four-, and five-finger taps on the infotainment
                screen to actions your Tesla hides deep in menus — pop the
                glovebox, toggle the rear fan, and more, all from a quick
                gesture. And when Autopilot or adaptive cruise engages, DashKit
                silences the auto wipers so they stop swiping a dry windshield.
              </p>
              <ul className="spotlight-list">
                <li>
                  <span>Three-finger tap</span> map it to an action like opening
                  the glovebox
                </li>
                <li>
                  <span>Four-finger tap</span> toggle the rear fan or any control
                  you reach on the bus
                </li>
                <li>
                  <span>Five-finger tap</span> another gesture, another
                  action — your rules, your car
                </li>
                <li>
                  <span>Auto wipers, off</span> silenced the instant Autopilot or
                  ACC engages, restored when you take over
                </li>
              </ul>
            </div>
            <div className="spotlight-demo" aria-hidden="true">
              <div className="demo-row">
                <span className="demo-label">3-finger tap</span>
                <span className="demo-state demo-state--on">GLOVEBOX</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">4-finger tap</span>
                <span className="demo-state demo-state--on">REAR FAN</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Auto wipers</span>
                <span className="demo-state demo-state--off">OFF</span>
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
              Tesla harness and disappears behind the trim — no screens to bolt
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
            signal, every supported model makes the device better for everyone —
            and nobody can take that away.
          </p>

          <div className="os-grid">
            <div className="os-card">
              <h3>Open firmware</h3>
              <p>
                Inspect it, build it, flash it. The device runs open software you
                can read and trust — no hidden behavior on your car&apos;s bus.
              </p>
            </div>
            <div className="os-card">
              <h3>Community-driven</h3>
              <p>
                DashKit supports Tesla today, and more models land because the
                community adds them. Contribute a fix or a whole integration and
                ship it to everyone.
              </p>
            </div>
            <div className="os-card">
              <h3>Yours to extend</h3>
              <p>
                Write your own automations and dashboards. DashKit is a platform,
                not a product you&apos;re locked out of.
              </p>
            </div>
          </div>

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
              ? "Get the DashKit device and join the community building on top of it."
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
