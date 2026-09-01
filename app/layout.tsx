import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const TITLE = "DashKit: The open-source commander for your Tesla";
const DESCRIPTION =
  "DashKit plugs into your Tesla's CAN buses and opens them up to you. Control your car, build your own automations, and stream live data to your phone, all on open, community-built software.";

export const metadata: Metadata = {
  // Makes the opengraph-image URL absolute, which every social scraper requires.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "DashKit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Umami. The website ID is a public identifier, not a secret, so it lives here
// rather than in the environment; the env vars are overrides for self-hosting.
const UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ??
  "27ed861b-b19d-43c8-9854-db8c905fb822";
const UMAMI_SRC =
  process.env.NEXT_PUBLIC_UMAMI_SRC ?? "https://cloud.umami.is/script.js";
// Keep dev servers and preview deploys out of the numbers.
const UMAMI_ENABLED =
  process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        {UMAMI_ENABLED && (
          <Script
            src={UMAMI_SRC}
            data-website-id={UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
            defer
          />
        )}
      </body>
    </html>
  );
}
