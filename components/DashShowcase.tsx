"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { track } from "@/lib/analytics";

/* The stage is drawn in a 1000 × STAGE_H coordinate space: one row of
   callout labels on top, the phone below it. Everything is placed in % of the
   stage, so it scales as one piece down to phone widths. */
const STAGE_W = 1000;
const STAGE_H = 621;

/* Phone body, and the 2.2 : 1 screen inside it, in stage units. */
const PHONE = { x: 50, y: 170, w: 900, h: 431 };
const SCREEN = { x: 70, y: 190, w: 860, h: 391 };

/* Where a label's line starts, and where it turns towards its target. */
const LABEL_GAP = 58;
const ELBOW = 118;

/* Label slots across the top row, in % of the stage width. Callouts are
   listed left to right by target, so their lines never cross. */
const SLOTS = [10, 30, 50, 70, 90];

const SLIDE_MS = 4500;

type Callout = {
  label: string;
  /* shorter label for phone widths */
  short: string;
  /* the top edge of the readout it points at, in % of the screenshot */
  x: number;
  y: number;
};

type Dash = {
  image: string;
  alt: string;
  callouts: Callout[];
};

const dashes: Dash[] = [
  {
    image: "/dash-apps/showcase-4.jpg",
    alt: "The Felina dash: a needle speedometer with the speed limit, a battery and power gauge, the gear selector, and a car in the left blind spot with Assist on",
    callouts: [
      { label: "Battery", short: "Battery", x: 18.9, y: 35.8 },
      { label: "Speed gauge", short: "Speed", x: 33.5, y: 31 },
      { label: "Speed limit", short: "Limit", x: 55.3, y: 11.5 },
      { label: "Blind spot monitor", short: "Blind spot", x: 76.6, y: 42.5 },
      { label: "Autopilot state", short: "Autopilot", x: 79.6, y: 63 },
    ],
  },
  {
    image: "/dash-apps/showcase-3.jpg",
    alt: "The light Vanilla dash: a 3D road view with the car on a green Autopilot path, a pickup in the left blind spot, speed, gear, battery and the speed limit",
    callouts: [
      { label: "Speed", short: "Speed", x: 14.7, y: 16 },
      { label: "Blind spot monitor", short: "Blind spot", x: 26.9, y: 59 },
      { label: "Autopilot state", short: "Autopilot", x: 49.5, y: 30 },
      { label: "Battery & temperature", short: "Battery", x: 84.6, y: 9.2 },
      { label: "Speed limit", short: "Limit", x: 90.7, y: 17 },
    ],
  },
  {
    image: "/dash-apps/showcase-1.jpg",
    alt: "A dash with two neon arc gauges for speed and power around a top-down view of the car, a car in the right blind spot and Assist on",
    callouts: [
      { label: "Speed gauge", short: "Speed", x: 19.4, y: 15.7 },
      { label: "Autopilot state", short: "Autopilot", x: 45, y: 66 },
      { label: "Speed limit", short: "Limit", x: 52.2, y: 18.5 },
      { label: "Blind spot monitor", short: "Blind spot", x: 60.6, y: 48.5 },
      { label: "Power & regen", short: "Power", x: 76.4, y: 12.8 },
    ],
  },
  {
    image: "/dash-apps/showcase-2.jpg",
    alt: "A sports-car style dash with a power bar across the top, a big speed readout, gear, speed limit and Assist, and the left edge glowing for a car in the blind spot",
    callouts: [
      { label: "Blind spot monitor", short: "Blind spot", x: 3.4, y: 44 },
      { label: "Gear", short: "Gear", x: 23.4, y: 47.5 },
      { label: "Speed", short: "Speed", x: 46, y: 41 },
      { label: "Autopilot state", short: "Autopilot", x: 74.7, y: 47.5 },
      { label: "Battery", short: "Battery", x: 93.5, y: 45 },
    ],
  },
];
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function target(c: Callout) {
  return {
    tx: SCREEN.x + (c.x / 100) * SCREEN.w,
    ty: SCREEN.y + (c.y / 100) * SCREEN.h,
  };
}

/* Elbow line from the label: down, across, then straight down onto the
   readout from above, like a spec-sheet diagram. */
function linePath(c: Callout, slot: number) {
  const { tx, ty } = target(c);
  const lx = (SLOTS[slot] / 100) * STAGE_W;
  return `M${lx} ${LABEL_GAP} V${ELBOW} H${tx} V${ty}`;
}

export default function DashShowcase() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Only cycles while on screen, so people land on the first dash. */
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % dashes.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, visible]);

  return (
    <div className="showcase" ref={ref}>
      <div className="showcase-stage">
        <div
          className="showcase-phone"
          style={{
            left: pct(PHONE.x, STAGE_W),
            top: pct(PHONE.y, STAGE_H),
            width: pct(PHONE.w, STAGE_W),
            height: pct(PHONE.h, STAGE_H),
          }}
          aria-hidden="true"
        >
          <span className="showcase-btn showcase-btn--vol" />
          <span className="showcase-btn showcase-btn--power" />
        </div>

        <div
          className="showcase-screen"
          style={{
            left: pct(SCREEN.x, STAGE_W),
            top: pct(SCREEN.y, STAGE_H),
            width: pct(SCREEN.w, STAGE_W),
            height: pct(SCREEN.h, STAGE_H),
          }}
        >
          {dashes.map((d, i) => (
            <Image
              key={d.image}
              src={d.image}
              alt={d.alt}
              fill
              sizes="(max-width: 1100px) 90vw, 1000px"
              className={`showcase-shot${i === active ? " is-active" : ""}`}
              aria-hidden={i !== active}
            />
          ))}
          <span className="showcase-camera" aria-hidden="true" />
        </div>

        <svg
          className="showcase-lines"
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          aria-hidden="true"
        >
          {dashes.map((d, i) => (
            <g key={d.image} className={`showcase-set${i === active ? " is-active" : ""}`}>
              {d.callouts.map((c, slot) => {
                const { tx, ty } = target(c);
                const path = linePath(c, slot);
                return (
                  <g key={c.label}>
                    <path d={path} className="showcase-line-halo" />
                    <path d={path} className="showcase-line" />
                    <circle cx={tx} cy={ty} r={7} className="showcase-dot-ring" />
                    <circle cx={tx} cy={ty} r={3} className="showcase-dot" />
                  </g>
                );
              })}
            </g>
          ))}
        </svg>

        {/* Only the current dash's labels exist, remounted on each change, so
            two sets can never share the row. */}
        <ul className="showcase-labels" key={active}>
          {dashes[active].callouts.map((c, slot) => (
            <li
              key={c.label}
              className="showcase-label"
              style={{
                left: `${SLOTS[slot]}%`,
                bottom: pct(STAGE_H - LABEL_GAP + 8, STAGE_H),
              }}
            >
              <span className="showcase-label-long">{c.label}</span>
              <span className="showcase-label-short">{c.short}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="showcase-pager" role="tablist" aria-label="Dash apps">
        {dashes.map((d, i) => (
          <button
            key={d.image}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show dash ${i + 1} of ${dashes.length}`}
            className={`showcase-pager-dot${i === active ? " is-active" : ""}`}
            onClick={() => {
              setActive(i);
              track("dash-select", { dash: i + 1 });
            }}
          >
            {/* Fills over the slide's duration while it's auto-playing. */}
            <span
              key={`${active}-${visible}`}
              className={visible ? "is-running" : ""}
              style={{ animationDuration: `${SLIDE_MS}ms` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
