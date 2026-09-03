import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DashPilot Privacy Policy | DashKit",
  description:
    "Privacy policy for the DashPilot Android app (com.softwiredtech.dashpilot) by Softwired Technologies Kft.: what data the app accesses, collects and shares, how long it is kept, and your rights.",
};

const LAST_UPDATED = "3 September 2026";

export default function DashPilotPrivacyPolicy() {
  return (
    <section className="legal">
      <div className="legal-inner">
        <p className="eyebrow">Legal</p>
        <h1>DashPilot Privacy Policy</h1>
        <p className="legal-updated">Last updated: {LAST_UPDATED}</p>

        <p>
          This privacy policy applies to the <strong>DashPilot</strong> mobile
          app for Android (package name{" "}
          <code>com.softwiredtech.dashpilot</code>), published on Google Play by
          Softwired Technologies Kft. DashPilot is the companion app for the
          DashKit device. It connects to DashKit over Bluetooth and shows live
          data from your car on your phone.
        </p>
        <p>
          It explains what data the app accesses, collects, uses and shares,
          why, how long we keep it, and how you can exercise your rights. The
          privacy policy for this website is a separate document at{" "}
          <Link href="/privacy-policy">/privacy-policy</Link>.
        </p>

        <h2>Who we are</h2>
        <p>
          DashPilot is developed and published by{" "}
          <strong>Softwired Technologies Kft.</strong>, registered at Nagy
          Lajos király útja 14. fszt. 3., 7622 Pécs, Hungary (EU VAT number
          HU32065558). We are the data controller for the personal data
          described in this policy.
        </p>
        <p>
          Privacy questions, requests and complaints go to{" "}
          <a href="mailto:info@softwiredtech.com">info@softwiredtech.com</a> or{" "}
          <a href="tel:+36308838435">+36 30 883 8435</a>.
        </p>

        <h2>Summary</h2>
        <ul>
          <li>
            <strong>No account, no sign-up.</strong> The app never asks for
            your name, email address or any other identity information.
          </li>
          <li>
            <strong>Vehicle data stays on your phone.</strong> Everything read
            from your car over Bluetooth is processed on the device and is not
            sent to us.
          </li>
          <li>
            <strong>Crash and diagnostic data</strong> is collected through
            Firebase Crashlytics so we can fix bugs.
          </li>
          <li>
            <strong>Location</strong> is optional. If you allow it, your
            approximate position is sent to a third-party speed-camera
            database to fetch nearby cameras. We do not receive or store it.
          </li>
          <li>
            <strong>No advertising, no selling of data, no tracking across
            apps.</strong>
          </li>
        </ul>

        <h2>Data the app accesses, collects and shares</h2>

        <h3>Bluetooth and vehicle data</h3>
        <p>
          DashPilot uses the Nearby devices (Bluetooth) permission to find,
          pair with and talk to your DashKit. On Android 11 and older, Android
          requires the Location permission for Bluetooth scanning as well; the
          app does not use your position for that purpose.
        </p>
        <p>
          The data DashKit sends to the app (speed, battery, odometer, gear,
          climate state, blind-spot and other CAN-bus signals) and the commands
          you send back are exchanged directly between your phone and the
          device over an encrypted, bonded Bluetooth link. This data is
          processed only on your phone to render the dashboard and run your
          automations. It is <strong>not collected by us and not shared with
          anyone</strong>.
        </p>

        <h3>Location (optional)</h3>
        <p>
          The speed-camera warning feature uses your device&apos;s precise
          location while the app is open. The app asks for the Location
          permission when it first starts. You can decline it and the app works
          without it; only the speed-camera warnings are disabled.
        </p>
        <p>
          If granted, the app calculates a roughly 5 km box around your current
          position and sends those coordinates over HTTPS to the speed-camera
          database operated by <strong>Eifrig Media GmbH</strong> (the
          Blitzer.de service, API host <code>cdn2.atudo.net</code>) to fetch
          cameras in that area. A new request is made only after you have
          moved about 3 km. Your position is <strong>not sent to us</strong>,
          not stored anywhere by the app beyond the current session, and not
          linked to any identifier the app controls. The speed-camera provider
          processes the request as an independent controller under its own
          privacy policy, and, as with any web request, sees your IP address.
        </p>
        <p>
          The app does not use your location in the background and does not
          use it for advertising or profiling. You can revoke the permission at
          any time in Android Settings, under Apps, DashPilot, Permissions.
        </p>

        <h3>Crash reports and diagnostics</h3>
        <p>
          The app includes <strong>Firebase Crashlytics</strong> and{" "}
          <strong>Firebase Analytics</strong>, both provided by Google. We use
          them for one purpose: to learn when the app crashes or a Bluetooth
          connection fails, so we can fix it. They collect:
        </p>
        <ul>
          <li>
            crash logs and stack traces, and short technical breadcrumbs the
            app writes before a failure (for example &quot;Bluetooth scan timed
            out&quot; or &quot;service discovery failed&quot;);
          </li>
          <li>
            device and app information: phone model, manufacturer, Android
            version, screen size, free memory and storage, app version, country
            and language;
          </li>
          <li>
            basic usage events such as app opened and screen viewed, recorded
            by Firebase Analytics as breadcrumbs for crash reports;
          </li>
          <li>
            a random Firebase installation ID and Crashlytics installation ID
            that identify this install of the app. These are not linked to
            you, your car, your DashKit or your Google account.
          </li>
        </ul>
        <p>
          We have turned off Advertising ID collection in the app, and the app
          does not request the Advertising ID permission. Crash and usage data
          is sent to Google servers over HTTPS and is processed by Google as
          our processor under the{" "}
          <a
            href="https://firebase.google.com/terms/data-processing-terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firebase Data Processing Terms
          </a>
          . Only our developers can view it, and only in aggregated or
          per-crash form. We do not use it for advertising or share it with
          anyone else.
        </p>

        <h3>Firmware updates</h3>
        <p>
          When you check for or install a DashKit firmware update, the app
          downloads a version manifest and the firmware file from our storage
          on Google Firebase. That request carries your IP address and
          standard HTTP headers, as any download does, and nothing else. The
          firmware is then sent to your DashKit over Bluetooth.
        </p>

        <h3>Settings and files on your device</h3>
        <p>
          Your preferences (chosen dashboard, units, dark mode, which readouts
          to show, pinned controls, automations) are stored locally on your
          phone. If you import a custom dashboard file, the app only reads the
          file you picked and stores a reference to it. This data never leaves
          your phone, except through Android&apos;s own system backup if you
          have that enabled for your device, which is controlled by you and
          Google, not by us.
        </p>

        <h3>What the app does not do</h3>
        <ul>
          <li>No user accounts and no collection of names, email addresses,
            phone numbers or payment details.</li>
          <li>No advertising, no ad SDKs, no Advertising ID.</li>
          <li>No access to your contacts, calendar, photos, microphone, camera,
            SMS or call logs.</li>
          <li>No background location and no location history.</li>
          <li>No selling of personal data and no sharing for marketing.</li>
        </ul>

        <h2>Why we process this data (legal bases)</h2>
        <ul>
          <li>
            <strong>Consent</strong> (GDPR Art. 6(1)(a)): using your location
            for speed-camera warnings. You give it through the Android
            permission prompt and can withdraw it at any time in system
            settings.
          </li>
          <li>
            <strong>Legitimate interest</strong> (GDPR Art. 6(1)(f)): crash
            reporting and diagnostics, to keep the app working and secure.
            The data is technical, pseudonymous and minimal, and you can opt
            out as described below.
          </li>
          <li>
            <strong>Performing a contract</strong> (GDPR Art. 6(1)(b)):
            delivering firmware updates to your DashKit.
          </li>
        </ul>

        <h2>Who receives the data</h2>
        <ul>
          <li>
            <strong>Google LLC (Firebase Crashlytics, Firebase Analytics,
            Firebase Storage):</strong> crash reports, diagnostic and usage
            data, and firmware download requests. Google acts as our
            processor.
          </li>
          <li>
            <strong>Eifrig Media GmbH (Blitzer.de / atudo.net):</strong> your
            approximate location, only if you enabled the Location permission,
            to return nearby speed cameras. Acts as an independent controller.
          </li>
        </ul>
        <p>
          We do not sell personal data and we do not share it with data
          brokers or advertisers. We would only disclose data to authorities
          where a law requires it.
        </p>
        <p>
          Google may process data outside the European Economic Area,
          including in the United States. These transfers are covered by the
          EU-US Data Privacy Framework and the European Commission&apos;s
          Standard Contractual Clauses included in Google&apos;s data
          processing terms.
        </p>

        <h2>How long we keep it, and how to delete it</h2>
        <ul>
          <li>
            <strong>Crash reports and diagnostics:</strong> kept in Firebase
            Crashlytics for 90 days, then deleted automatically.
          </li>
          <li>
            <strong>Usage events:</strong> kept in Firebase Analytics for no
            longer than 14 months, then deleted automatically. Aggregated
            statistics that no longer identify an installation may be kept
            longer.
          </li>
          <li>
            <strong>Location:</strong> never stored by the app or by us. The
            speed-camera list is cached in memory on your phone and discarded
            when the app closes.
          </li>
          <li>
            <strong>Vehicle data and settings:</strong> stay on your phone
            until you delete them or uninstall the app.
          </li>
          <li>
            <strong>Firmware download logs:</strong> standard server logs on
            Google&apos;s infrastructure, retained under Google&apos;s
            standard log retention.
          </li>
        </ul>
        <p>
          To delete data held on your phone, clear the app&apos;s storage or
          uninstall the app. To have crash and diagnostic data associated with
          your installation deleted from Firebase, email{" "}
          <a href="mailto:info@softwiredtech.com">info@softwiredtech.com</a>.
          Because the installation ID is random and not linked to you, please
          include your phone model, Android version and the approximate time
          of any crash so we can find the records. We will complete the
          deletion within one month.
        </p>
        <p>
          To stop crash and usage reporting going forward, uninstall the app.
          DashPilot is open source, and you can also build it yourself without
          the Firebase libraries.
        </p>

        <h2>How we protect it</h2>
        <ul>
          <li>
            All network traffic to Google and to the speed-camera provider
            uses HTTPS (TLS).
          </li>
          <li>
            The Bluetooth link between your phone and DashKit is bonded and
            encrypted at the Bluetooth LE link layer.
          </li>
          <li>
            The app collects no identity data, so nothing it collects can be
            used on its own to identify you.
          </li>
          <li>
            Access to the Firebase project is limited to our developers.
          </li>
        </ul>

        <h2>Children</h2>
        <p>
          DashPilot is a tool for car owners and is not directed at children.
          We do not knowingly collect personal data from anyone under 16. If
          you believe a child has provided us with personal data, contact us
          and we will delete it.
        </p>

        <h2>Your rights</h2>
        <p>
          Under the GDPR you have the right to access the personal data we hold
          about you, to have it corrected or deleted, to restrict or object to
          its processing, to receive it in a portable format, and to withdraw
          consent at any time without affecting the lawfulness of processing
          before the withdrawal. To exercise any of these, email{" "}
          <a href="mailto:info@softwiredtech.com">info@softwiredtech.com</a>.
          We will respond within one month.
        </p>
        <p>
          If you are in the United States, we do not sell or share personal
          data as those terms are defined in state privacy laws, and the
          rights above are available to you as well.
        </p>
        <p>
          You can also lodge a complaint with your local data-protection
          authority or with the Hungarian National Authority for Data
          Protection and Freedom of Information (NAIH), Falk Miksa utca 9-11.,
          1055 Budapest, Hungary,{" "}
          <a href="https://naih.hu" target="_blank" rel="noopener noreferrer">
            naih.hu
          </a>
          .
        </p>

        <h2>Open source</h2>
        <p>
          The source code of DashPilot is public at{" "}
          <a
            href="https://github.com/softwiredtech/dashpilot"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/softwiredtech/dashpilot
          </a>
          . You can verify everything in this policy by reading the code.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we change how DashPilot handles data, we will update this page
          and the date at the top, and, for significant changes, tell you in
          the app or in the release notes. The current version always lives at
          this address.
        </p>
      </div>
    </section>
  );
}
