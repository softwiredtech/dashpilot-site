"use client";

import { useState, type FormEvent } from "react";

import { VEHICLE_MODELS } from "./vehicles";

export default function OrderPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sameAddress, setSameAddress] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");

  const selectedModel = VEHICLE_MODELS.find((m) => m.code === model);
  const selectedVariant = selectedModel?.variants.find(
    (v) => v.code === variant
  );

  const price = process.env.NEXT_PUBLIC_PRICE_EUR || "149";
  const formattedPrice = `€${Number(price).toLocaleString("en-US")}`;

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
      shipping_zip: val("shipping_zip"),
      shipping_city: val("shipping_city"),
      shipping_address: val("shipping_address"),
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
        <h1>Order DashKit</h1>
        <p className="order-price">DashKit — {formattedPrice}</p>

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
              <label htmlFor="tax_number">Tax number</label>
              <input
                id="tax_number"
                name="tax_number"
                type="text"
                required
                placeholder="EU123456789"
              />
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
            disabled={loading || !acceptedTerms || !selectedVariant}
          >
            {loading ? "Processing…" : `Pay ${formattedPrice}`}
          </button>

          <p className="form-hint">
            You&apos;ll be redirected to Stripe&apos;s secure payment page.
          </p>
        </form>
      </div>
    </section>
  );
}
