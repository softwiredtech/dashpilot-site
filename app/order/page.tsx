"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { VEHICLE_MODELS } from "./vehicles";

type Country = { name: string; alpha2: string };

type Rate = {
  id: string;
  courier: string;
  service: string;
  amount: number;
  currency: string;
  minDays: number;
  maxDays: number;
};

const ADDRESS_FIELDS = [
  "shipping_zip",
  "shipping_city",
  "shipping_address",
] as const;

export default function OrderPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sameAddress, setSameAddress] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");

  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesError, setCountriesError] = useState("");
  const [country, setCountry] = useState("");

  const [rates, setRates] = useState<Rate[] | null>(null);
  const [selectedRateId, setSelectedRateId] = useState("");
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesError, setRatesError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const selectedModel = VEHICLE_MODELS.find((m) => m.code === model);
  const selectedVariant = selectedModel?.variants.find(
    (v) => v.code === variant
  );
  const selectedRate = rates?.find((r) => r.id === selectedRateId);

  const price = process.env.NEXT_PUBLIC_PRICE_EUR || "149";
  const formattedPrice = `€${Number(price).toLocaleString("en-US")}`;

  const money = (amount: number) =>
    new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
    }).format(amount);

  const total = selectedRate ? Number(price) + selectedRate.amount : null;

  /** Countries we ship to, straight from Easyship. */
  useEffect(() => {
    let cancelled = false;

    fetch("/api/countries")
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error);
        return body.countries as Country[];
      })
      .then((list) => {
        if (!cancelled) setCountries(list);
      })
      .catch(() => {
        if (!cancelled) {
          setCountriesError(
            "We couldn't load the country list. Please refresh and try again."
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /** Any address edit invalidates a quote — rates are address-specific. */
  function invalidateRates() {
    setRates(null);
    setSelectedRateId("");
    setRatesError("");
  }

  async function fetchRates() {
    const form = formRef.current;
    if (!form) return;

    const val = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.value ?? "";

    if (!country || ADDRESS_FIELDS.some((f) => !val(f).trim())) {
      setRatesError(
        "Fill in your country and full shipping address first."
      );
      return;
    }

    setRatesLoading(true);
    setRatesError("");
    setRates(null);
    setSelectedRateId("");

    try {
      const res = await fetch("/api/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: val("name"),
          email: val("email"),
          phone: val("phone"),
          country,
          shipping_zip: val("shipping_zip"),
          shipping_city: val("shipping_city"),
          shipping_address: val("shipping_address"),
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setRates(result.rates);
      if (result.rates.length === 1) setSelectedRateId(result.rates[0].id);
    } catch (err) {
      setRatesError(
        err instanceof Error
          ? err.message
          : "Could not fetch shipping options. Please try again."
      );
    } finally {
      setRatesLoading(false);
    }
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
      country,
      rate: selectedRate,
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

        <form onSubmit={handleSubmit} className="order-form" ref={formRef}>
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
            <div className="field">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                required
                value={country}
                disabled={!countries.length}
                onChange={(e) => {
                  setCountry(e.target.value);
                  invalidateRates();
                }}
              >
                <option value="" disabled>
                  {countries.length ? "Choose a country…" : "Loading countries…"}
                </option>
                {countries.map((c) => (
                  <option key={c.alpha2} value={c.alpha2}>
                    {c.name}
                  </option>
                ))}
              </select>
              {countriesError && (
                <p className="field-error">{countriesError}</p>
              )}
            </div>
            <div className="field-row">
              <div className="field field-zip">
                <label htmlFor="shipping_zip">ZIP / Postcode</label>
                <input
                  id="shipping_zip"
                  name="shipping_zip"
                  type="text"
                  required
                  onChange={invalidateRates}
                />
              </div>
              <div className="field">
                <label htmlFor="shipping_city">City</label>
                <input
                  id="shipping_city"
                  name="shipping_city"
                  type="text"
                  required
                  onChange={invalidateRates}
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
                onChange={invalidateRates}
              />
            </div>
          </fieldset>

          {/* Shipping method — quoted live by Easyship for this address */}
          <fieldset>
            <legend>Shipping method</legend>

            {!rates && (
              <>
                <p className="form-note">
                  We quote live rates for your address. Fill in the address above,
                  then check the available options.
                </p>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={fetchRates}
                  disabled={ratesLoading}
                >
                  {ratesLoading ? "Checking…" : "Show shipping options"}
                </button>
              </>
            )}

            {rates && rates.length === 0 && (
              <div className="notice">
                <p className="notice-title">
                  No shipping options for that address.
                </p>
                <p>
                  Double-check the address, or get in touch at{" "}
                  <a href="mailto:info@softwiredtech.com">
                    info@softwiredtech.com
                  </a>{" "}
                  and we&apos;ll sort it out.
                </p>
              </div>
            )}

            {rates && rates.length > 0 && (
              <div className="rate-list">
                {rates.map((r) => (
                  <label
                    key={r.id}
                    className={`rate-option ${
                      selectedRateId === r.id ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="rate"
                      value={r.id}
                      checked={selectedRateId === r.id}
                      onChange={() => setSelectedRateId(r.id)}
                    />
                    <span className="rate-body">
                      <span className="rate-name">
                        {r.courier} — {r.service}
                      </span>
                      <span className="rate-eta">
                        {r.minDays === r.maxDays
                          ? `${r.maxDays} business days`
                          : `${r.minDays}–${r.maxDays} business days`}
                      </span>
                    </span>
                    <span className="rate-price">{money(r.amount)}</span>
                  </label>
                ))}
                <button
                  type="button"
                  className="picker-change rate-recheck"
                  onClick={fetchRates}
                  disabled={ratesLoading}
                >
                  {ratesLoading ? "Checking…" : "Re-check rates"}
                </button>
              </div>
            )}

            {ratesError && <p className="field-error">{ratesError}</p>}
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

          {selectedRate && (
            <div className="order-summary">
              <div className="order-summary-row">
                <span>DashKit</span>
                <span>{money(Number(price))}</span>
              </div>
              <div className="order-summary-row">
                <span>
                  {selectedRate.courier} — {selectedRate.service}
                </span>
                <span>{money(selectedRate.amount)}</span>
              </div>
              <div className="order-summary-row total">
                <span>Total</span>
                <span>{money(total!)}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="cta-primary submit-btn"
            disabled={
              loading || !acceptedTerms || !selectedVariant || !selectedRate
            }
          >
            {loading
              ? "Processing…"
              : `Pay ${total !== null ? money(total) : formattedPrice}`}
          </button>

          <p className="form-hint">
            You&apos;ll be redirected to Stripe&apos;s secure payment page.
          </p>
        </form>
      </div>
    </section>
  );
}
