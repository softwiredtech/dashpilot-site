"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  label: string;
};

const slides: Slide[] = [
  {
    src: "/images/dashkit_angle.png",
    alt: "DashKit device — angled view showing the enclosure and status LED",
    label: "Angle",
  },
  {
    src: "/images/dashkit_top.png",
    alt: "DashKit device — full top-down view of the board and enclosure",
    label: "Top view",
  },
  {
    src: "/images/dashkit_harness_conn.png",
    alt: "DashKit device — CAN-FD harness connector",
    label: "Harness",
  },
  {
    src: "/images/dashkit_usb_c.png",
    alt: "DashKit device — USB-C port view",
    label: "USB-C",
  },
];

export default function DeviceCarousel() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (delta > threshold) goTo(index - 1);
    else if (delta < -threshold) goTo(index + 1);
    touchStartX.current = null;
  };

  return (
    <div className="hero-media">
      <div
        className="device-frame device-carousel"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div className="carousel-slide" key={slide.src}>
              <Image
                src={slide.src}
                alt={slide.alt}
                width={715}
                height={999}
                className="device-photo"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="carousel-arrow carousel-arrow--prev"
              aria-label="Previous photo"
              onClick={() => goTo(index - 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="carousel-arrow carousel-arrow--next"
              aria-label="Next photo"
              onClick={() => goTo(index + 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            <div className="carousel-dots">
              {slides.map((slide, i) => (
                <button
                  type="button"
                  key={slide.src}
                  className={`carousel-dot${i === index ? " is-active" : ""}`}
                  aria-label={`Show ${slide.label} photo`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
