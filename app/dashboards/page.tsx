import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboards — DashPilot dash apps",
  description:
    "DashPilot turns your phone into a live car dashboard. Pick from six dash apps — Vanilla, Ambient, Analog, Retro, Expo and Rive — each with blind spot monitoring, assist status, battery telemetry and more.",
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
    aspect: [2280, 1080],
    description:
      "A clean, bright dash with a live 3D road view — your car, the lanes, and surrounding traffic rendered as you drive.",
    tags: ["3D road view", "Speed & gear", "Steering angle"],
  },
  {
    name: "Ambient",
    image: "/dash-apps/preview_ambient.jpg",
    aspect: [2280, 1080],
    description:
      "A minimalist dark theme with breathing animations. One big speed readout, set speed, and an at-a-glance assist indicator.",
    tags: ["Minimalist", "Set speed", "Assist state"],
  },
  {
    name: "Analog",
    image: "/dash-apps/preview_analog.png",
    aspect: [2280, 1080],
    description:
      "A classic needle speedometer with a retro instrument-cluster look, complete with gear and speed limit.",
    tags: ["Analog gauge", "Retro cluster", "Speed limit"],
  },
  {
    name: "Retro",
    image: "/dash-apps/preview_retro.png",
    aspect: [2280, 1080],
    description:
      "Fourteen-segment LED displays with a CRT scanline glow and an animated blind-spot LED tape running down each side.",
    tags: ["14-segment LED", "CRT scanline", "Blind-spot tape"],
  },
  {
    name: "Expo",
    image: "/dash-apps/preview_expo.jpg",
    aspect: [2280, 1080],
    description:
      "A modern, component-built layout — a sweeping speed arc, steering indicator, and a speed limit sign with distance.",
    tags: ["Speed arc", "Steering", "Limit distance"],
  },
  {
    name: "Rive",
    image: "/dash-apps/preview_rive.jpg",
    aspect: [2280, 1080],
    description:
      "A widget-grid layout powered by Rive vector animation: speed limit, gear, steering angle, upcoming lights and stop signs, time and temperature.",
    tags: ["Widget grid", "Traffic light", "Stop sign"],
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
            ships with a set of modular dash apps — swap between them anytime,
            each with its own look but the same rich, real-time telemetry off
            the bus.
          </p>
        </div>
      </section>

      {/* ---------- DASH APPS ---------- */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Dash apps</p>
          <h2>Six ways to read the road</h2>

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

      {/* ---------- FEATURES ---------- */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Live telemetry</p>
          <h2>Everything DashPilot can read</h2>
          <p className="dash-lead">
            DashKit pulls these signals straight off your car&apos;s bus. Each
            dash app surfaces its own selection — the minimalist dashes stay
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
            Order DashKit, pair over Bluetooth, and pick the dash that fits your
            drive.
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
