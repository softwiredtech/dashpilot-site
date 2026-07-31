"use client";

import { useState, type FormEvent } from "react";

import { ORDERS_OPEN } from "@/lib/flags";
import { COUNTRIES, findCountry, SHIPPING_EUR } from "@/lib/markets";
import { parseEuVat, qualifiesForReverseCharge } from "@/lib/vat";

import { VEHICLE_MODELS } from "./vehicles";

const euro = (cents: number) =>
  `€${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function OrderPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sameAddress, setSameAddress] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [devAcknowledged, setDevAcknowledged] = useState(false);
  const [shippingCountry, setShippingCountry] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");

  const selectedModel = VEHICLE_MODELS.find((m) => m.code === model);
  const selectedVariant = selectedModel?.variants.find(
    (v) => v.code === variant
  );

  const price = process.env.NEXT_PUBLIC_PRICE_EUR || "139";
  const formattedPrice = `€${Number(price).toLocaleString("en-US")}`;

  const country = findCountry(shippingCountry);
  const priceCents = Number(price) * 100;
  const shippingCents = country ? SHIPPING_EUR[country.market] * 100 : 0;
  // EU companies with a VAT number from another member state get the 0%
  // intra-community reverse charge. Mirrors the server's decision; the number
  // itself is verified against VIES server-side.
  const reverseCharge =
    isCompany &&
    country?.market === "EU" &&
    qualifiesForReverseCharge(parseEuVat(taxNumber));
  // Stripe applies the tax rate per line item and rounds each, so mirror that
  // here to keep the preview cent-exact with the Stripe checkout page.
  const vatCents =
    country?.vatRate && !reverseCharge
      ? Math.round((priceCents * country.vatRate) / 100) +
        Math.round((shippingCents * country.vatRate) / 100)
      : 0;
  const totalCents = priceCents + shippingCents + vatCents;

  if (!ORDERS_OPEN) {
    return (
      <section className="order prelaunch">
        <div className="prelaunch-inner">
          <p className="eyebrow">Pricing &amp; availability</p>
          <h1>DashKit is almost here</h1>
          <p className="prelaunch-sub">
            The first batch ships <strong>end of August 2026</strong>. Here&apos;s
            what it costs and what you get.
          </p>

          <div className="prelaunch-card">
            <div className="prelaunch-price">
              <span className="prelaunch-amount">{formattedPrice}</span>
              <span className="prelaunch-unit">excl. VAT</span>
            </div>
            <p className="prelaunch-vat">
              VAT and shipping calculated at checkout · Ships to the EU, UK
              &amp; US
            </p>

            <ul className="prelaunch-list">
              <li>DashKit device — dual CAN-FD, BLE 5, OTA updates</li>
              <li>
                Plug-and-play harness for your exact car — nothing to splice or
                solder
              </li>
              <li>DashPilot companion app — free, no subscription</li>
              <li>Open firmware you can build on</li>
            </ul>

            <div className="prelaunch-cta">
              <a
                className="cta-primary"
                href="mailto:info@softwiredtech.com?subject=Notify%20me%20when%20DashKit%20orders%20open&body=Let%20me%20know%20when%20I%20can%20order%20a%20DashKit."
              >
                Email me when orders open
              </a>
              <p className="form-hint">
                No payments or pre-orders are being taken yet — ordering opens
                when the first batch ships.
              </p>
            </div>
          </div>

          <p className="prelaunch-note">
            Driving something other than a Tesla, or want a batch for a fleet?
            Get in touch at{" "}
            <a href="mailto:info@softwiredtech.com">info@softwiredtech.com</a>
          </p>
        </div>
      </section>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const val = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement).value;

    const data = {
      name: val("name"),
      email: val("email"),
      phone: val("phone"),
      is_company: isCompany,
      dev_acknowledged: devAcknowledged,
      shipping_country: shippingCountry,
      shipping_zip: val("shipping_zip"),
      shipping_city: val("shipping_city"),
      shipping_address: val("shipping_address"),
      billing_country: sameAddress ? shippingCountry : val("billing_country"),
      billing_zip: sameAddress ? val("shipping_zip") : val("billing_zip"),
      billing_city: sameAddress ? val("shipping_city") : val("billing_city"),
      billing_address: sameAddress
        ? val("shipping_address")
        : val("billing_address"),
      ...(isCompany && { tax_number: val("tax_number") }),
      model,
      variant,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong with your order.");
      }

      window.location.href = result.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
      setLoading(false);
    }
  }

  return (
    <section className="order">
      <div className="order-inner">
        <p className="eyebrow">Developer early access</p>
        <h1>Order DashKit</h1>
        <p className="order-price">
          DashKit — {formattedPrice} excl. VAT
        </p>
        <div className="dev-notice">
          <p className="dev-notice-title">⚠ Developer early access</p>
          <p>
            This batch is for <strong>developers</strong>: open-firmware
            hardware for people who want to build on it. Expect rough edges, a
            hands-on install, and features that are still evolving with the
            community — not a finished consumer product.
          </p>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="order-form">
          {/* Buyer type toggle */}
          <div className="toggle-group">
            <button
              type="button"
              onClick={() => setIsCompany(false)}
              className={`toggle-btn ${!isCompany ? "active" : ""}`}
            >
              Individual
            </button>
            <button
              type="button"
              onClick={() => setIsCompany(true)}
              className={`toggle-btn ${isCompany ? "active" : ""}`}
            >
              Company
            </button>
          </div>

          {/* Harness selection — pick the car, we ship the matching harness */}
          <div className="picker">
            {/* Step 1 — model */}
            <div className="picker-step">
              <div className="picker-head">
                <span className={`picker-badge ${model ? "done" : ""}`}>
                  {model ? "✓" : "1"}
                </span>
                <h2>{selectedModel ? selectedModel.name : "Select your model"}</h2>
                {model && (
                  <button
                    type="button"
                    className="picker-change"
                    onClick={() => {
                      setModel("");
                      setVariant("");
                    }}
                  >
                    Change
                  </button>
                )}
              </div>

              {!model && (
                <div className="picker-body picker-grid">
                  {VEHICLE_MODELS.map((m) => (
                    <button
                      key={m.code}
                      type="button"
                      className="picker-card"
                      onClick={() => {
                        setModel(m.code);
                        setVariant("");
                      }}
                    >
                      <span className="picker-card-title">{m.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Step 2 — variant */}
            {selectedModel && (
              <div className="picker-step">
                <div className="picker-head">
                  <span className={`picker-badge ${variant ? "done" : ""}`}>
                    {variant ? "✓" : "2"}
                  </span>
                  <h2>
                    {selectedVariant
                      ? selectedVariant.name
                      : "Select your variant"}
                  </h2>
                  {variant && (
                    <button
                      type="button"
                      className="picker-change"
                      onClick={() => setVariant("")}
                    >
                      Change
                    </button>
                  )}
                </div>

                {!variant && (
                  <div className="picker-body picker-grid">
                    {selectedModel.variants.map((v) => (
                      <button
                        key={v.code}
                        type="button"
                        className="picker-card"
                        onClick={() => setVariant(v.code)}
                      >
                        <span className="picker-card-title">{v.name}</span>
                        <span className="picker-card-desc">{v.description}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="form-hint picker-hint">
            Driving something else? Get in touch at{" "}
            <a href="mailto:info@softwiredtech.com">info@softwiredtech.com</a>
          </p>

          {/* Name / Company name */}
          <div className="field">
            <label htmlFor="name">{isCompany ? "Company name" : "Name"}</label>
            <input id="name" name="name" type="text" required />
          </div>

          {isCompany && (
            <div className="field">
              <label htmlFor="tax_number">Tax / VAT number</label>
              <input
                id="tax_number"
                name="tax_number"
                type="text"
                required
                placeholder="DE123456789"
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
              />
              {country?.market === "EU" && (
                <p className="form-hint">
                  {reverseCharge
                    ? "EU VAT number — the 0% reverse charge applies. We verify the number against VIES."
                    : "EU companies outside Hungary: enter your VAT number with the country prefix (e.g. DE123456789) to buy at 0% VAT under the reverse charge."}
                </p>
              )}
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" required />
          </div>

          {/* Shipping address */}
          <fieldset>
            <legend>Shipping address</legend>
            <div className="field">
              <label htmlFor="shipping_country">Country</label>
              <select
                id="shipping_country"
                name="shipping_country"
                required
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                <option value="" disabled>
                  Select your country
                </option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-row">
              <div className="field field-zip">
                <label htmlFor="shipping_zip">ZIP / Postcode</label>
                <input
                  id="shipping_zip"
                  name="shipping_zip"
                  type="text"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="shipping_city">City</label>
                <input
                  id="shipping_city"
                  name="shipping_city"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="shipping_address">Street, house no.</label>
              <input
                id="shipping_address"
                name="shipping_address"
                type="text"
                required
              />
            </div>
          </fieldset>

          {/* Same address toggle */}
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={sameAddress}
              onChange={(e) => setSameAddress(e.target.checked)}
            />
            Billing address is the same as the shipping address
          </label>

          {/* Billing address (conditional) */}
          {!sameAddress && (
            <fieldset>
              <legend>Billing address</legend>
              <div className="field">
                <label htmlFor="billing_country">Country</label>
                <select
                  id="billing_country"
                  name="billing_country"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field-row">
                <div className="field field-zip">
                  <label htmlFor="billing_zip">ZIP / Postcode</label>
                  <input
                    id="billing_zip"
                    name="billing_zip"
                    type="text"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="billing_city">City</label>
                  <input
                    id="billing_city"
                    name="billing_city"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="billing_address">Street, house no.</label>
                <input
                  id="billing_address"
                  name="billing_address"
                  type="text"
                  required
                />
              </div>
            </fieldset>
          )}

          {/* Price summary — updates with the shipping country */}
          {country && (
            <div className="order-summary">
              <div className="order-summary-row">
                <span>DashKit — Developer Early Access</span>
                <span>{euro(priceCents)}</span>
              </div>
              <div className="order-summary-row">
                <span>Shipping ({country.name})</span>
                <span>{euro(shippingCents)}</span>
              </div>
              {reverseCharge ? (
                <>
                  <div className="order-summary-row">
                    <span>VAT — reverse charge</span>
                    <span>{euro(0)}</span>
                  </div>
                  <p className="form-hint">
                    VAT to be accounted for by the recipient (Art. 196 EU VAT
                    Directive).
                  </p>
                </>
              ) : country.vatRate ? (
                <div className="order-summary-row">
                  <span>VAT ({country.vatRate}%)</span>
                  <span>{euro(vatCents)}</span>
                </div>
              ) : (
                <p className="form-hint">
                  Prices exclude tax. Import duties and taxes may be collected
                  by the carrier on delivery.
                </p>
              )}
              <div className="order-summary-row order-summary-total">
                <span>Total</span>
                <span>{euro(totalCents)}</span>
              </div>
            </div>
          )}

          {/* Developer early access acknowledgement */}
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={devAcknowledged}
              onChange={(e) => setDevAcknowledged(e.target.checked)}
            />
            I understand this is a developer early-access device intended for
            development purposes, not a finished consumer product.
          </label>

          {/* Terms checkbox */}
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            I have read and accept the Terms &amp; Conditions
          </label>

          <button
            type="submit"
            className="cta-primary submit-btn"
            disabled={
              loading ||
              !acceptedTerms ||
              !devAcknowledged ||
              !selectedVariant ||
              !country
            }
          >
            {loading
              ? "Processing…"
              : country
                ? `Pay ${euro(totalCents)}`
                : `Pay ${formattedPrice}`}
          </button>

          <p className="form-hint">
            You&apos;ll be redirected to Stripe&apos;s secure payment page.
          </p>
        </form>
      </div>
    </section>
  );
}
