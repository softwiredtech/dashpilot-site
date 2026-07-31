/**
 * Countries DashKit developer early access ships to, and how each is priced.
 *
 * - EU countries: the net price is charged plus the destination country's
 *   standard VAT rate (OSS-style destination taxation). VAT also applies to
 *   shipping, as tax follows the goods.
 * - UK and US: the net price is charged with no tax collected — import
 *   duties/taxes are the customer's responsibility on delivery.
 *
 * VAT rates are standard rates as of July 2026. They change rarely but do
 * change (e.g. Estonia 2025, Romania 2025) — review this table when a member
 * state announces a rate change.
 */

export type Market = "EU" | "UK" | "US";

export type Country = {
  /** ISO 3166-1 alpha-2, what Stripe expects. */
  code: string;
  name: string;
  market: Market;
  /** Standard VAT rate in percent. Only set for EU countries. */
  vatRate?: number;
};

/** Flat shipping per market, in EUR (net — VAT is added on top for EU). */
export const SHIPPING_EUR: Record<Market, number> = {
  EU: 12,
  UK: 20,
  US: 20,
};

export const COUNTRIES: Country[] = [
  { code: "AT", name: "Austria", market: "EU", vatRate: 20 },
  { code: "BE", name: "Belgium", market: "EU", vatRate: 21 },
  { code: "BG", name: "Bulgaria", market: "EU", vatRate: 20 },
  { code: "HR", name: "Croatia", market: "EU", vatRate: 25 },
  { code: "CY", name: "Cyprus", market: "EU", vatRate: 19 },
  { code: "CZ", name: "Czechia", market: "EU", vatRate: 21 },
  { code: "DK", name: "Denmark", market: "EU", vatRate: 25 },
  { code: "EE", name: "Estonia", market: "EU", vatRate: 24 },
  { code: "FI", name: "Finland", market: "EU", vatRate: 25.5 },
  { code: "FR", name: "France", market: "EU", vatRate: 20 },
  { code: "DE", name: "Germany", market: "EU", vatRate: 19 },
  { code: "GR", name: "Greece", market: "EU", vatRate: 24 },
  { code: "HU", name: "Hungary", market: "EU", vatRate: 27 },
  { code: "IE", name: "Ireland", market: "EU", vatRate: 23 },
  { code: "IT", name: "Italy", market: "EU", vatRate: 22 },
  { code: "LV", name: "Latvia", market: "EU", vatRate: 21 },
  { code: "LT", name: "Lithuania", market: "EU", vatRate: 21 },
  { code: "LU", name: "Luxembourg", market: "EU", vatRate: 17 },
  { code: "MT", name: "Malta", market: "EU", vatRate: 18 },
  { code: "NL", name: "Netherlands", market: "EU", vatRate: 21 },
  { code: "PL", name: "Poland", market: "EU", vatRate: 23 },
  { code: "PT", name: "Portugal", market: "EU", vatRate: 23 },
  { code: "RO", name: "Romania", market: "EU", vatRate: 21 },
  { code: "SK", name: "Slovakia", market: "EU", vatRate: 23 },
  { code: "SI", name: "Slovenia", market: "EU", vatRate: 22 },
  { code: "ES", name: "Spain", market: "EU", vatRate: 21 },
  { code: "SE", name: "Sweden", market: "EU", vatRate: 25 },
  { code: "GB", name: "United Kingdom", market: "UK" },
  { code: "US", name: "United States", market: "US" },
];

export function findCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}
