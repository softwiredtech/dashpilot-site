import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icons must be PNG, so this renders the same ring-and-dot mark as
// app/icon.svg. Apple applies its own corner mask, hence the square background.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f1013",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64" fill="none">
          <circle
            cx="32"
            cy="32"
            r="19"
            stroke="#f4f4f5"
            strokeWidth="3.4"
          />
          <circle cx="37.7" cy="24.2" r="3.8" fill="#88E0A6" />
        </svg>
      </div>
    ),
    size
  );
}
