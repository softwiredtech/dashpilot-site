import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DashKit — The open CAN-FD brain for your Tesla",
  description:
    "DashKit is an open, hackable dual CAN-FD device for your Tesla. Control your car, build automations, and turn your phone into a real-time dashboard with DashPilot. Features built by the open-source community.",
  openGraph: {
    title: "DashKit — The open CAN-FD brain for your Tesla",
    description:
      "An open dual CAN-FD device for your Tesla. Control, automate, and visualize — powered by the open-source community.",
    type: "website",
  },
};

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
      </body>
    </html>
  );
}
