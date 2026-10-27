import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | DashKit",
};

const LAST_UPDATED = "27 October 2026";

export default function PrivacyPolicy() {
  return (
    <section className="legal">
      <div className="legal-inner">
        <p className="eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: {LAST_UPDATED}</p>

        <h2>Who we are</h2>
        <p>
          This site is operated by <strong>Softwired Technologies Kft.</strong>,
          registered at Nagy Lajos király útja 14. fszt. 3., 7622 Pécs, Hungary.
          We are the data controller for the personal data described below.
        </p>
        <p>
          Questions, or want to exercise any of the rights listed further down?
          Write to{" "}
          <a href="mailto:info@softwiredtech.com">info@softwiredtech.com</a> or
          call <a href="tel:+36308838435">+36 30 883 8435</a>.
        </p>

        <h2>What we collect</h2>
        <p>
          <strong>Browsing this site.</strong> Without your consent we set no
          cookies and run no advertising or cross-site tracking. We use{" "}
          <a href="https://umami.is" target="_blank" rel="noreferrer">
            Umami
          </a>{" "}
          to count page views. It uses no cookies, does not follow you across
          other websites, and records only aggregate figures: page visited,
          referrer, country, browser and device type. It does not store your IP
          address. Our hosting provider keeps standard server logs (IP address,
          browser user agent, requested page) for security and troubleshooting.
        </p>
        <p id="cookies">
          <strong>Advertising cookies, only if you accept them.</strong> We
          advertise DashKit on Google (including YouTube). If you click
          &quot;Accept&quot; on our cookie banner, we load the Google tag, which
          sets cookies so Google Ads can tell us which ads brought visitors
          here and whether they went on to order. It can also let us show our
          ads again to people who have visited this site. Google receives your
          IP address, browser details, the pages you view here and, if you
          order, the order value and an order reference (never your name,
          address or email). If you click &quot;Reject&quot; or don&apos;t
          answer, the Google tag is never loaded. You can change your choice
          at any time with the &quot;Cookie settings&quot; link at the bottom of
          every page. Google&apos;s use of this data is described in its{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            advertising policy
          </a>
          .
        </p>
        <p>
          <strong>If you email or call us.</strong> We keep your message and
          contact details so we can reply, and so we can let you know when
          ordering opens if you asked us to.
        </p>
        <p>
          <strong>If you place an order.</strong> Placing an order means giving
          us your name, email address, phone number, shipping and billing
          address, your vehicle model and, for business customers, a company
          name and tax number. We need this to fulfil the sale and to issue a
          compliant invoice.
        </p>
        <p>
          We never see or store your card details. Payments are handled entirely
          on Stripe&apos;s own checkout page.
        </p>

        <h2>Why we&apos;re allowed to use it</h2>
        <ul>
          <li>
            <strong>Performing a contract:</strong> processing and shipping an
            order you placed.
          </li>
          <li>
            <strong>Legal obligation:</strong> retaining invoices and
            accounting records as Hungarian and EU tax law requires.
          </li>
          <li>
            <strong>Legitimate interest:</strong> replying to your enquiry,
            keeping the site secure and working.
          </li>
          <li>
            <strong>Consent:</strong> emailing you when ordering opens, if you
            asked us to. You can withdraw it at any time by replying to any
            message from us.
          </li>
          <li>
            <strong>Consent:</strong> advertising cookies and ad measurement,
            if you accepted them on the cookie banner. Withdraw it at any time
            under &quot;Cookie settings&quot;.
          </li>
        </ul>

        <h2>Who else sees it</h2>
        <p>
          We do not sell personal data. Apart from the Google Ads measurement
          you can opt into above, we do not share it for advertising. We use a
          small number of processors to run the business, and only give each
          one what it needs:
        </p>
        <ul>
          <li>
            <strong>Google:</strong> ad measurement and remarketing, only with
            your cookie consent.
          </li>
          <li>
            <strong>Stripe:</strong> payment processing and fraud prevention.
          </li>
          <li>
            <strong>Our hosting provider:</strong> serving this website.
          </li>
          <li>
            <strong>Shipping carriers:</strong> the name, address, and phone
            number needed to deliver your parcel.
          </li>
          <li>
            <strong>Our accountant and tax authorities:</strong> invoice data,
            where the law requires it.
          </li>
        </ul>
        <p>
          Some of these providers may process data outside the EEA. Where that
          happens, transfers are covered by the European Commission&apos;s
          Standard Contractual Clauses or an adequacy decision.
        </p>

        <h2>The DashPilot app</h2>
        <p>
          DashPilot talks to your DashKit over a direct Bluetooth connection
          between the device and your phone. Vehicle data read over that
          connection is not sent to us and we have no access to it. The app
          has its own privacy policy covering crash reporting and the optional
          location feature:{" "}
          <Link href="/dashpilot-privacy-policy">DashPilot privacy policy</Link>.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Order and invoice records are kept for 8 years, as Hungarian
          accounting law requires. Enquiry emails are kept for up to 2 years
          after our last exchange. Launch-notification addresses are deleted
          once ordering has opened and the announcement has gone out, or sooner
          if you ask.
        </p>

        <h2>Your rights</h2>
        <p>
          Under the GDPR you can ask us for a copy of your data, to correct it,
          to delete it, to restrict or object to how we use it, and to receive
          it in a portable format. Email{" "}
          <a href="mailto:info@softwiredtech.com">info@softwiredtech.com</a> and
          we&apos;ll respond within one month.
        </p>
        <p>
          If you think we&apos;ve handled your data badly, you can complain to
          the Hungarian National Authority for Data Protection and Freedom of
          Information (NAIH), Falk Miksa utca 9-11., 1055 Budapest, Hungary,{" "}
          <a
            href="https://naih.hu"
            target="_blank"
            rel="noopener noreferrer"
          >
            naih.hu
          </a>
          .
        </p>

        <h2>Changes</h2>
        <p>
          If we change this policy we&apos;ll update the date at the top. The
          current version always lives at this address.
        </p>
      </div>
    </section>
  );
}
