import { ImageResponse } from "next/og";

export const alt = "DashKit: the open-source commander for your Tesla";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share card for links posted to social. Rendered at build time by next/og,
// so it stays in sync with the tagline instead of being a stale exported PNG.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0c",
          padding: "72px 80px",
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="72" height="72" viewBox="0 0 40 40" fill="none">
            <circle
              cx="20"
              cy="20"
              r="16.5"
              stroke="#f4f4f5"
              strokeWidth="2.2"
            />
            <circle cx="25" cy="13.2" r="2.6" fill="#88E0A6" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 600, color: "#f4f4f5" }}>
            DashKit
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Satori has no inline layout: a mixed text/element line has to be a
              flex row of spans. It also drops `gap` on a wrapping row, so the
              word spacing is explicit marginRight — without it the words run
              together as "TheopensourceBluetooth". */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 68,
              fontWeight: 700,
              color: "#f4f4f5",
              letterSpacing: "-0.03em",
              maxWidth: 960,
            }}
          >
            {[
              { word: "The" },
              { word: "open-source" },
              { word: "commander" },
              { word: "for" },
              { word: "your" },
              { word: "Tesla", last: true },
            ].map(({ word, last }) => (
              <span
                key={word}
                style={{
                  marginRight: last ? 0 : 20,
                  color: "#f4f4f5",
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 30, color: "#9ca0aa" }}>
            Control your car, build automations, stream live data to your phone.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            fontSize: 24,
            color: "#6b6e78",
            borderTop: "1px solid #22222a",
            paddingTop: 28,
          }}
        >
          <span>2× CAN-FD</span>
          <span>·</span>
          <span>BLE 5</span>
          <span>·</span>
          <span>Open firmware</span>
        </div>
      </div>
    ),
    size
  );
}
