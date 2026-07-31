import { COUNTRIES } from "./markets";

/**
 * EU VAT-number handling for the B2B reverse charge.
 *
 * An EU company buying with a VAT number from a member state other than
 * Hungary (the seller's country) is charged 0% VAT — it self-accounts for VAT
 * at home ("reverse charge"). Hungarian VAT numbers are a domestic supply and
 * get normal Hungarian VAT, as do companies without a parseable EU VAT number.
 */

/** ISO codes of the EU member states we ship to. */
const EU_ISO_CODES = new Set(
  COUNTRIES.filter((c) => c.market === "EU").map((c) => c.code)
);

export type ParsedEuVat = {
  /** ISO 3166-1 country code (Greece = GR). */
  isoCountry: string;
  /** Country code as VIES expects it (Greece = EL). */
  viesCountry: string;
  /** Digits/letters after the country prefix. */
  number: string;
};

/**
 * Parse a free-form VAT number ("de 123.456.789") into its country and body.
 * Returns null when the prefix isn't an EU member state — such numbers are
 * treated as foreign tax IDs and charged VAT normally, not rejected.
 */
export function parseEuVat(raw: string): ParsedEuVat | null {
  const cleaned = raw.toUpperCase().replace(/[\s.-]/g, "");
  const prefix = cleaned.slice(0, 2);
  const number = cleaned.slice(2);
  if (!/^[A-Z0-9+*]{2,12}$/.test(number)) return null;

  // Greek VAT numbers use the EL prefix; accept the ISO code GR too.
  const isoCountry = prefix === "EL" ? "GR" : prefix;
  if (!EU_ISO_CODES.has(isoCountry)) return null;

  return {
    isoCountry,
    viesCountry: isoCountry === "GR" ? "EL" : isoCountry,
    number,
  };
}

/** True when this VAT number entitles the buyer to the 0% reverse charge. */
export function qualifiesForReverseCharge(vat: ParsedEuVat | null): boolean {
  return vat !== null && vat.isoCountry !== "HU";
}
