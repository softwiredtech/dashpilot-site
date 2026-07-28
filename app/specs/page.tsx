import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { ORDER_CTA_LABEL } from "@/lib/flags";

export const metadata: Metadata = {
  title: "DashKit Specs — Dual CAN-FD hardware for Tesla",
  description:
    "Technical specifications for DashKit: dual CAN-FD for Tesla, ESP32-S3, BLE 5, RGB status LED, 16 MB flash and over-the-air updates.",
};

type Spec = { label: string; value: string };
type Group = { title: string; specs: Spec[] };

const groups: Group[] = [
  {
    title: "CAN interface",
    specs: [
      { label: "Buses", value: "2× independent CAN-FD" },
      { label: "Standard", value: "CAN 2.0B + CAN FD (ISO 11898-2)" },
      { label: "Frame payload", value: "Up to 64 bytes (CAN FD)" },
      { label: "Identifiers", value: "11-bit standard & 29-bit extended" },
      { label: "Nominal bitrate", value: "500 kbps (configurable)" },
      { label: "Data bitrate", value: "Up to 2 Mbps with bit-rate switching" },
      { label: "Controller", value: "2× MCP2518FD, 40 MHz reference" },
    ],
  },
  {
    title: "Compute",
    specs: [
      { label: "SoC", value: "Espressif ESP32-S3" },
      { label: "Storage", value: "16 MB flash" },
      { label: "Firmware", value: "Open source, over-the-air updates" },
      { label: "RTOS", value: "FreeRTOS, microsecond frame timestamps" },
    ],
  },
  {
    title: "Connectivity",
    specs: [
      { label: "Wireless", value: "Bluetooth Low Energy 5" },
      { label: "Throughput", value: "2M PHY, up to 512-byte MTU" },
      { label: "Pairing", value: "Connects to DashPilot on your phone" },
    ],
  },
  {
    title: "Vehicle support",
    specs: [
      { label: "Today", value: "Tesla" },
      { label: "Roadmap", value: "More models, added by the community" },
      { label: "Install", value: "Plugs into the Tesla CAN harness" },
    ],
  },
  {
    title: "Physical",
    specs: [
      { label: "Form factor", value: "Compact round module" },
      { label: "Status", value: "RGB indicator LED" },
      { label: "Mounting", value: "Tucks behind the trim" },
    ],
  },
];

export default function Specs() {
  return (
    <section className="specs-page">
      <div className="container">
        <div className="specs-head">
          <div>
            <p className="eyebrow">Specifications</p>
            <h1>DashKit hardware</h1>
            <p className="hero-sub">
              A dual CAN-FD device for Tesla — small enough to vanish behind the
              trim, open enough to do whatever you need it to.
            </p>
            <div className="cta-row cta-row--left">
              <Link href="/order" className="cta-primary">
                {ORDER_CTA_LABEL}
              </Link>
            </div>
          </div>
          <div className="device-frame device-frame--specs">
            <Image
              src="/images/dashkit-device.jpg"
              alt="The DashKit device with its CAN-FD harness"
              width={3072}
              height={4080}
              className="device-photo"
              priority
            />
          </div>
        </div>

        <div className="spec-groups">
          {groups.map((group) => (
            <div className="spec-group" key={group.title}>
              <h2>{group.title}</h2>
              <dl className="spec-table">
                {group.specs.map((spec) => (
                  <div className="spec-row" key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <p className="spec-foot">
          Specifications reflect current firmware and may evolve as the
          community ships updates.
        </p>
      </div>
    </section>
  );
}
