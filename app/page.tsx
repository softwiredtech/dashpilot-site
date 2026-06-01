import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">For Tesla · 2× CAN-FD</p>
            <h1>
              The open <span className="accent">CAN-FD</span> brain for your
              Tesla
            </h1>
            <p className="hero-sub">
              DashKit plugs into your Tesla&apos;s CAN buses and opens them up to
              you. Control your car, build your own automations, and stream live
              data to your phone — all on open, community-built software.
            </p>

            <div className="cta-row cta-row--left">
              <Link href="/order" className="cta-primary">
                Order DashKit
              </Link>
              <Link href="/specs" className="cta-secondary">
                View specs
              </Link>
            </div>

            <p className="hero-note">
              Works with Tesla · 2× CAN-FD · BLE 5 · Open source
            </p>
          </div>

          <div className="hero-media">
            <div className="device-frame">
              <Image
                src="/images/dashkit-device.jpg"
                alt="The DashKit device — a compact round module with a status LED and CAN-FD harness"
                width={3072}
                height={4080}
                className="device-photo"
                priority
              />
            </div>
            <span className="device-badge">Actual hardware</span>
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="section" id="features">
        <div className="container">
          <p className="eyebrow">What you can do</p>
          <h2>One small device. A Tesla that listens.</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <circle cx="12" cy="16" r="1.5" />
                </svg>
              </div>
              <h3>Control your Tesla</h3>
              <p>
                Read and send messages on both CAN-FD buses. Lock and unlock,
                trigger functions, and reach the controls your Tesla already has
                — now under your command.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
                </svg>
              </div>
              <h3>Automations</h3>
              <p>
                Make your car react to context. Keep the wipers off while
                openpilot is active, run rules on the bus, and chain conditions
                into behaviors the factory never shipped.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2.5" />
                  <path d="M9 6h6M9 10h6M9 14h3" />
                </svg>
              </div>
              <h3>DashPilot dashboard</h3>
              <p>
                Pair over Bluetooth and turn your phone into a real-time
                dashboard. Live gauges, custom readouts, and every signal off
                the bus — rendered as you drive.
              </p>
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
              A compact, sealed module with two independent CAN-FD interfaces, an
              RGB status LED, and Bluetooth Low Energy. It taps straight into the
              Tesla harness and disappears behind the trim — no screens to bolt
              on, no clutter on the dash.
            </p>
            <ul className="spec-list">
              <li><span>2× CAN-FD</span> independent buses, up to 64-byte frames</li>
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
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section final-cta">
        <div className="container">
          <h2>Open up your Tesla.</h2>
          <p className="hero-sub">
            Get the DashKit device and join the community building on top of it.
          </p>
          <div className="cta-row">
            <Link href="/order" className="cta-primary">
              Order DashKit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
