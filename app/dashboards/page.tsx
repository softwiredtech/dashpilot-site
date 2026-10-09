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

export default function Dashboards() {
  return (
    <>
      {/* ---------- IN THE CAR ---------- */}
      <section className="section dash-top">
        <div className="container">
          <p className="eyebrow">In the car</p>
          <h2>
            Your phone becomes the <span className="accent">instrument cluster</span>
          </h2>
          <p className="dash-lead">
            DashKit sits hidden behind the trim, reading the car&apos;s CAN
            buses. It streams speed, gear, battery, blind spot and assist state
            to your phone over Bluetooth, and DashPilot draws it right in your
            line of sight, above the steering wheel instead of off to the side
            on the center screen.
          </p>

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
