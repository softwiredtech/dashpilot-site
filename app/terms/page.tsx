import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | DashKit",
};

const LAST_UPDATED = "31 July 2026";

export default function Terms() {
  return (
    <section className="legal">
      <div className="legal-inner">
        <p className="eyebrow">Legal</p>
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-updated">Last updated: {LAST_UPDATED}</p>

        <h2>Who we are</h2>
        <p>
          DashKit is sold by <strong>Softwired Technologies Kft.</strong>,
          registered at Nagy Lajos király útja 14. fszt. 3., 7622 Pécs,
          Hungary, EU VAT number HU32065558. You can reach us at{" "}
          <a href="mailto:info@softwiredtech.com">info@softwiredtech.com</a> or{" "}
          <a href="tel:+36308838435">+36 30 883 8435</a>. Placing an order
          means you accept these terms.
        </p>

        <h2>Developer early access</h2>
        <p>
          DashKit is currently sold as <strong>developer early access</strong>{" "}
          hardware. It is intended for development purposes and for people who
          want to build on its open firmware; it is not a finished consumer
          product. Installation is hands-on, features are still evolving with
          the community, and software updates may change how the device works.
          By ordering you confirm you understand this. Your statutory rights,
          including the money-back guarantee and warranty below, are not
          affected by the early-access status.
        </p>

        <h2>What you&apos;re buying</h2>
        <p>
          Your order covers the DashKit device, a plug-and-play harness for the
          vehicle you select at checkout (unless you choose the device-only
          option, which ships without a harness at a reduced price), and access
          to the free DashPilot companion app. The firmware is open source and provided under its own
          licenses.
        </p>

        <h2>Prices, VAT and payment</h2>
        <p>
          Prices are in euros, excluding VAT. For deliveries within the EU,
          your country&apos;s VAT is added at checkout. EU businesses ordering
          with a valid VAT number from a member state other than Hungary are
          charged 0% VAT under the reverse-charge mechanism (Art. 196 EU VAT
          Directive) and account for VAT themselves. For deliveries to the UK,
          US and Canada, prices are net of tax; any import duties or taxes
          are collected from you by the carrier and are your responsibility.
          Payment is handled by Stripe; we never see your card details. The
          contract is concluded when your payment is confirmed.
        </p>

        <h2>Shipping</h2>
        <p>
          We ship to the EU (€12), and to the UK, US and Canada (€20). Dispatch
          estimates are shown at the time of ordering; early-access batches are
          produced in limited runs, so dates are estimates rather than
          guarantees. If we cannot ship your order within 30 days of the
          communicated estimate, you can cancel for a full refund.
        </p>

        <h2>14-day money-back guarantee</h2>
        <p>
          You can return your DashKit within <strong>14 days of delivery</strong>,
          for any reason. Email{" "}
          <a href="mailto:info@softwiredtech.com">info@softwiredtech.com</a>,
          send the device back, and we&apos;ll refund the full purchase price
          including the original standard shipping cost, using your original
          payment method, within 14 days of receiving the return. You pay the
          cost of return shipping. Please return the device complete and in a
          condition that reflects normal inspection and testing. This guarantee
          implements (and, where you are an EU consumer, coexists with) your
          statutory 14-day right of withdrawal.
        </p>

        <h2>Warranty</h2>
        <p>
          Consumers in the EU have a statutory two-year warranty on the
          hardware: if the device is defective, we will repair or replace it,
          or refund you where that isn&apos;t possible. The warranty covers
          hardware defects; it does not cover damage from incorrect
          installation, physical abuse, or modified hardware. Community-built
          and open-source software is provided as-is under its respective
          licenses.
        </p>

        <h2>Safe and lawful use</h2>
        <p>
          DashKit connects to your vehicle&apos;s CAN buses. You are
          responsible for installing and using it in accordance with your local
          laws and your vehicle manufacturer&apos;s requirements, and for
          keeping your attention on the road. Never interact with the
          DashPilot app while driving. To the extent permitted by law, we are
          not liable for indirect or consequential damages arising from use of
          the device; nothing in these terms limits liability that cannot be
          limited by law.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by Hungarian law. If you are a consumer, the
          mandatory consumer-protection rules of your country of residence
          still apply.
        </p>

        <h2>Changes</h2>
        <p>
          If we change these terms we&apos;ll update the date at the top. The
          version in force when you order is the one that applies to your
          purchase.
        </p>
      </div>
    </section>
  );
}
