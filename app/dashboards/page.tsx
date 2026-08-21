import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { ORDER_CTA_LABEL, ORDERS_OPEN } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Dashboards: DashPilot dash apps",
  description:
    "DashPilot turns your phone into a live car dashboard. Swap between dash apps (Vanilla, Ambient, Analog and Retro), each in light and dark, each with blind spot monitoring, assist status, battery telemetry and more.",
};

type DashApp = {
  name: string;
  image: string;
  aspect: [number, number];
  description: string;
  tags: string[];
};

const apps: DashApp[] = [
  {
    name: "Vanilla",
    image: "/dash-apps/preview_vanilla.jpg",
    aspect: [2424, 1080],
    description:
      "The full picture: a live 3D road view with your car, its lane and surrounding traffic, wrapped in speed, gear, steering, battery and limit readouts.",
    tags: ["3D road view", "Blind spot", "Light & dark"],
  },
  {
    name: "Ambient",
    image: "/dash-apps/preview_ambient.jpg",
    aspect: [2424, 1080],
    description:
      "Stripped to the bone. One huge speed readout on a surface that breathes colour: green when you're under the limit, amber and red when you're not.",
    tags: ["Minimalist", "Reactive glow", "Light & dark"],
  },
  {
    name: "Analog",
    image: "/dash-apps/preview_analog.jpg",
    aspect: [2424, 1080],
    description:
      "A classic needle speedometer in a machined bezel, with a power sweep, the PRND selector and a rim that tracks your assist state.",
    tags: ["Analog gauge", "Needle sweep", "PRND"],
  },
  {
    name: "Retro",
    image: "/dash-apps/preview_retro.jpg",
    aspect: [2424, 1080],
    description:
      "Fourteen-segment displays with ghosted off-segments and a CRT glow, flanked by a blind-spot LED tape running down each side.",
    tags: ["14-segment LED", "CRT glow", "Light & dark"],
  },
];

type ThemePair = {
  name: string;
  dark: string;
  light: string;
};

const themePairs: ThemePair[] = [
  {
    name: "Vanilla",
    dark: "/dash-apps/preview_vanilla.jpg",
    light: "/dash-apps/preview_vanilla_light.jpg",
  },
  {
    name: "Ambient",
    dark: "/dash-apps/preview_ambient.jpg",
    light: "/dash-apps/preview_ambient_light.jpg",
  },
  {
    name: "Retro",
    dark: "/dash-apps/preview_retro.jpg",
    light: "/dash-apps/preview_retro_light.jpg",
  },
];

type Callout = {
  n: number;
  /* position of the marker, in % of the screenshot */
  x: number;
  y: number;
  title: string;
  description: string;
};

const callouts: Callout[] = [
  {
    n: 1,
    x: 21.5,
    y: 17.5,
    title: "Speed",
    description: "Live road speed in km/h or mph.",
  },
  {
    n: 2,
    x: 5.9,
    y: 22,
    title: "Power & regen",
    description: "Fills upward under power, downward when you're regenerating.",
  },
  {
    n: 3,
    x: 16.5,
    y: 42.3,
    title: "Gear",
    description: "P / R / N / D, straight off the bus.",
  },
  {
    n: 4,
    x: 16.5,
    y: 58.6,
    title: "Steering angle",
    description:
      "The wheel turns with yours, and goes blue when the car is steering itself.",
  },
  {
    n: 5,
    x: 16.5,
    y: 90,
    title: "Odometer",
    description: "Total distance, as the car reports it.",
  },
  {
    n: 6,
    x: 63.5,
    y: 9.5,
    title: "Phone & car battery",
    description: "Handset charge, pack state of charge and pack temperature.",
  },
  {
    n: 7,
    x: 91.3,
    y: 37,
    title: "Speed limit",
    description: "The limit for the road you're on, red once you're over it.",
  },
  {
    n: 8,
    x: 65.5,
    y: 21,
    title: "Traffic light ahead",
    description: "The next light and the colour it's showing.",
  },
  {
    n: 9,
    x: 47,
    y: 11.8,
    title: "Turn signal",
    description: "Mirrors the car's blinkers in real time.",
  },
  {
    n: 10,
    x: 58.5,
    y: 47,
    title: "Your car & lane",
    description: "Your car rendered inside the lane the camera is tracking.",
  },
  {
    n: 11,
    x: 31,
    y: 69.6,
    title: "Blind spot monitoring",
    description:
      "Surrounding traffic, with pulsing waves around a vehicle sitting in your blind spot.",
  },
  {
    n: 12,
    x: 2.6,
    y: 62,
    title: "Side alert",
    description:
      "The whole edge glows amber, then red if you signal into that side or drift out of your lane.",
  },
];

type Feature = { title: string; description: string };

const features: Feature[] = [
  {
    title: "Always-on blind spot monitoring",
    description:
      "Blind-spot detection with side indicators: a passive amber warning when a vehicle is alongside, escalating to a pulsing red alert when you signal into that side or drift out of your lane.",
  },
  {
    title: "Autopilot / assist status",
    description:
      "Shows whether the car is driving itself, with colour-coded MADS (lane assist) and FULL (auto) states versus manual.",
  },
  {
    title: "Turn signals",
    description:
      "Left and right blinker indicators mirror the car's turn signals in real time.",
  },
  {
    title: "State of charge",
    description:
      "Battery charge shown as a percentage with a fill bar that turns red at 20% or below.",
  },
  {
    title: "Battery temperature",
    description:
      "Average battery pack temperature, shown in °C or °F depending on your units.",
  },
  {
    title: "Speed & gear",
    description:
      "A live speed readout in km/h or mph, alongside the current gear (P / R / N / D).",
  },
  {
    title: "Speed limit & ACC set speed",
    description:
      "The current road speed limit and your adaptive-cruise set speed, with an overspeed warning when you exceed the limit.",
  },
  {
    title: "Lane departure warning",
    description:
      "Left / right alerts when the car drifts out of its lane.",
  },
  {
    title: "Speed camera warning",
    description:
      "Distance to an upcoming speed camera, surfaced as a warning as you approach.",
  },
  {
    title: "Seatbelt & door warnings",
    description:
      "Alerts when a seatbelt is unbuckled while driving or a door is left open.",
  },
  {
    title: "Steering angle",
    description:
      "A live steering-wheel indicator that reflects the wheel angle and changes colour when ADAS is active.",
  },
  {
    title: "3D road view",
    description:
      "On the Vanilla dash, a rendered view of your car, its lane, surrounding traffic, upcoming traffic lights and stop signs.",
  },
  {
    title: "Power & odometer",
    description:
      "A power bar showing discharge and regen, plus the vehicle's odometer reading.",
  },
];

export default function Dashboards() {
  return (
    <>
      {/* ---------- INTRO ---------- */}
      <section className="section dash-intro">
        <div className="container">
          <p className="eyebrow">Dashboards</p>
          <h2>
            Pick a dash. Or <span className="accent">build your own</span>.
          </h2>
          <p className="hero-sub hero-sub--left">
            DashPilot turns your phone into a live dashboard for your car. It
            ships with a growing set of modular dash apps. Swap between them
            anytime, each with its own look but the same rich, real-time
            telemetry off the bus.
          </p>
        </div>
      </section>

      {/* ---------- DASH APPS ---------- */}
      <section className="section">
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

          <div className="app-grid">
            {apps.map((app) => (
              <article className="app-card" key={app.name}>
                <div className="app-shot">
                  <Image
                    src={app.image}
                    alt={`The ${app.name} dash app running in DashPilot`}
                    width={app.aspect[0]}
                    height={app.aspect[1]}
                    className="app-shot-img"
                    sizes="(max-width: 720px) 100vw, 540px"
                  />
                </div>
                <div className="app-body">
                  <h3>{app.name}</h3>
                  <p>{app.description}</p>
                  <ul className="app-tags">
                    {app.tags.map((tag) => (
                      <li className="app-tag" key={tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- THEMES ---------- */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Themes</p>
          <h2>Light or dark, whatever the drive needs</h2>
          <p className="dash-lead">
            Every dash follows the app theme, so the same layout can go from a
            deep black cluster at night to a bright, glare-proof panel at noon.
            Same signals, same layout. A completely different car.
          </p>

          <div className="theme-grid">
            {themePairs.map((pair) => (
              <figure className="theme-pair" key={pair.name}>
                <div className="theme-shots">
                  {(
                    [
                      ["Dark", pair.dark],
                      ["Light", pair.light],
                    ] as const
                  ).map(([label, src]) => (
                    <div className="theme-shot" key={label}>
                      <Image
                        src={src}
                        alt={`The ${pair.name} dash app in its ${label.toLowerCase()} theme`}
                        width={2424}
                        height={1080}
                        className="app-shot-img"
                        sizes="(max-width: 900px) 100vw, 340px"
                      />
                    </div>
                  ))}
                </div>
                <figcaption>
                  {pair.name} <span>Dark / Light</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ANATOMY ---------- */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Anatomy</p>
          <h2>What you&apos;re actually looking at</h2>
          <p className="dash-lead">
            Vanilla shows nearly everything DashKit reads. Here it is mid-alert:
            a car sitting in the left blind spot, the whole left edge lit up
            in warning.
          </p>

          <div className="anatomy">
            <div className="anatomy-figure">
              <Image
                src="/dash-apps/anatomy_vanilla.jpg"
                alt="The Vanilla dash app with each readout numbered and labelled below"
                width={2424}
                height={1080}
                className="anatomy-img"
                sizes="(max-width: 900px) 100vw, 1100px"
              />
              {callouts.map((c) => (
                <span
                  className="anatomy-pin"
                  key={c.n}
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                  aria-hidden="true"
                >
                  {c.n}
                </span>
              ))}
            </div>

            <ol className="anatomy-legend">
              {callouts.map((c) => (
                <li key={c.n}>
                  <span className="anatomy-legend-n" aria-hidden="true">
                    {c.n}
                  </span>
                  <span>
                    <strong>{c.title}</strong> {c.description}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Live telemetry</p>
          <h2>Everything DashPilot can read</h2>
          <p className="dash-lead">
            DashKit pulls these signals straight off your car&apos;s bus. Each
            dash app surfaces its own selection. The minimalist dashes stay
            clean and focused, while richer ones like Vanilla show nearly all of
            it. Not every dash shows every readout.
          </p>

          <div className="os-grid dash-features">
            {features.map((feature) => (
              <div className="os-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
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
