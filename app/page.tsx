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
            <h1>
              The open source <span className="accent">Bluetooth</span> dongle
              for your Tesla
            </h1>
            <p className="hero-sub">
              DashKit plugs into your Tesla&apos;s CAN buses and puts your car
              on rules you write, all on open, community-built software.
            </p>
          </div>

          {/* Center: the device. Sides: the automations it unlocks, each
              pointing back at the hardware that runs them. */}
          <div className="hub">
            <div className="hub-col hub-col--left">
              <div className="hub-card">
                <svg className="hub-arrow" viewBox="0 0 40 16" fill="none" aria-hidden="true">
                  <line x1="38" y1="8" x2="8" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />
                  <path d="M14 2 6 8l8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="hub-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19c0-7 4-13 8-13s8 6 8 13" />
                    <path d="M12 19 18 8" />
                  </svg>
                </div>
                <p className="hub-card-title">Wipers, off on Autopilot</p>
                <p className="hub-card-desc">
                  Auto wipers cut out the moment Autopilot or ACC engages,
                  and hand back when you take over.
                </p>
              </div>

              <div className="hub-card">
                <svg className="hub-arrow" viewBox="0 0 40 16" fill="none" aria-hidden="true">
                  <line x1="38" y1="8" x2="8" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />
                  <path d="M14 2 6 8l8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="hub-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v18" />
                    <path d="M3 12h18" />
                    <path d="M18 8l-4 4 4 4" />
                    <path d="M6 8l4 4-4 4" />
                    <path d="M8 18l4-4 4 4" />
                    <path d="M8 6l4 4 4-4" />
                  </svg>
                </div>
                <p className="hub-card-title">Climate keeps running</p>
                <p className="hub-card-desc">
                  Set a duration in the app and DashKit keeps the cabin
                  conditioned after you leave, then switches off on its own.
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
              <div className="hub-card">
                <svg className="hub-arrow" viewBox="0 0 40 16" fill="none" aria-hidden="true">
                  <line x1="2" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />
                  <path d="M26 2l8 6-8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="hub-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2.5" />
                    <circle cx="8" cy="15" r="1" fill="currentColor" stroke="none" />
                    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                    <circle cx="16" cy="15" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <p className="hub-card-title">Multi-touch triggers</p>
                <p className="hub-card-desc">
                  Three-, four-, and five-finger taps on the touchscreen
                  mapped to actions like opening the glovebox.
                </p>
              </div>

              <div className="hub-card">
                <svg className="hub-arrow" viewBox="0 0 40 16" fill="none" aria-hidden="true">
                  <line x1="2" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />
                  <path d="M26 2l8 6-8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="hub-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="7" width="16" height="10" rx="2" />
                    <path d="M19 10v4" />
                    <path d="M9 9c-1.2 1.6-1.2 2.4 0 4M13 9c-1.2 1.6-1.2 2.4 0 4" />
                  </svg>
                </div>
                <p className="hub-card-title">Battery preheat</p>
                <p className="hub-card-desc">
                  Schedule a preheat from the app so the battery is warmed
                  up and ready before you unplug and drive.
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
              ? "Ships to EU, UK, US & Canada · Open source"
              : "Works with Tesla · 2× CAN · BLE 5 · First batch ships end of August 2026"}
          </p>
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
                title="DashKit: an open-source Bluetooth dongle for your Tesla"
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
                and every signal off the bus, rendered as you drive.
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
                engages, keep the climate running after you leave the car, or
                map multi-finger touch gestures to actions like opening the
                glovebox or toggling the rear fan.
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
                trigger functions, and reach the controls your Tesla already has,
                now under your command.
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
                Your Tesla, running on <span className="accent">your rules</span>.
              </h2>
              <div className="spotlight-point">
                <div className="spotlight-point-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="2.5" />
                    <path d="M3 12h6.5M14.5 12H21M12 14.5V21" />
                  </svg>
                </div>
                <p className="spotlight-lead">
                  The moment Autopilot or adaptive cruise engages, DashKit
                  silences the auto wipers so they stop swiping a dry
                  windshield, and hands them back the instant you take over.
                </p>
              </div>
              <div className="spotlight-point">
                <div className="spotlight-point-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12h20M12 2v20" />
                    <path d="m20 16-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4" />
                  </svg>
                </div>
                <p className="spotlight-lead">
                  Climate can outlast you, too. Normally it shuts down soon
                  after you walk away, but pick a duration in the DashPilot
                  app and DashKit keeps the climate running for exactly that
                  long after you leave the car. Lock up, run your errand, and
                  come back to a cabin that&apos;s still cool in summer or warm
                  in winter. When the timer runs out, DashKit switches it off
                  on its own.
                </p>
              </div>
              <ul className="spotlight-list">
                <li>
                  <span>Auto wipers, off</span> silenced the instant Autopilot or
                  ACC engages, restored when you take over
                </li>
                <li>
                  <span>Climate stays on</span> keeps running for the time you
                  set in the app after you leave the car, then shuts off
                </li>
                <li>
                  <span>Multi-finger taps</span> three-, four-, and five-finger
                  taps on the infotainment screen mapped to actions like the
                  glovebox or rear fan
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

          <div className="os-grid">
            <div className="os-card">
              <h3>Open firmware</h3>
              <p>
                Inspect it, build it, flash it. The device runs open software you
                can read and trust, with no hidden behavior on your car&apos;s bus.
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
