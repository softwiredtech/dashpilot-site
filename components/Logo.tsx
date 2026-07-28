/**
 * DashKit brand mark — the ring-and-dot from the sticker artwork
 * (stickers/dashkit-2b-2.svg), reworked for screen use: the ring inherits the
 * surrounding text colour, and the status dot picks up the accent green so it
 * reads as a live LED. Stroke is proportionally heavier than the print
 * original, which is hairline-thin and disappears at 32px.
 */
export default function Logo() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 40 40"
      fill="none"
      // The word "DashKit" sits next to the mark in both Header and Footer,
      // so announcing it here too would just read the brand name twice.
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="16.5"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle cx="25" cy="13.2" r="2.6" fill="var(--accent)" />
    </svg>
  );
}
