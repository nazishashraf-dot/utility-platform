import { describe, expect, it } from "vitest";
import { convertCurrencyAmount } from "./convertCurrency";

// Shaped like a real exchange-rate API response: base EUR, rates relative to it.
const base = "EUR";
const rates = { USD: 1.1, GBP: 0.85 };

describe("convertCurrencyAmount", () => {
  it("converts from the base currency using the rate directly", () => {
    expect(convertCurrencyAmount(1, "EUR", "USD", rates, base)).toBeCloseTo(
      1.1,
      10
    );
  });

  it("converts to the base currency by dividing by the rate", () => {
    expect(
      convertCurrencyAmount(1.1, "USD", "EUR", rates, base)
    ).toBeCloseTo(1, 10);
  });

  it("converts between two non-base currencies via the base", () => {
    const result = convertCurrencyAmount(100, "USD", "GBP", rates, base);
    expect(result).toBeCloseTo((100 / 1.1) * 0.85, 10);
  });

  it("returns the same amount when converting a currency to itself", () => {
    expect(convertCurrencyAmount(50, "USD", "USD", rates, base)).toBe(50);
  });

  it("handles zero", () => {
    expect(convertCurrencyAmount(0, "USD", "GBP", rates, base)).toBe(0);
  });

  it("is reversible when swapping from/to currencies", () => {
    const gbp = convertCurrencyAmount(75, "USD", "GBP", rates, base);
    const backToUsd = convertCurrencyAmount(gbp, "GBP", "USD", rates, base);
    expect(backToUsd).toBeCloseTo(75, 10);
  });

  it("throws on an invalid (non-numeric) amount", () => {
    expect(() =>
      convertCurrencyAmount(NaN, "USD", "EUR", rates, base)
    ).toThrow();
  });

  it("throws when a currency has no rate in the table", () => {
    expect(() =>
      convertCurrencyAmount(1, "USD", "AED", rates, base)
    ).toThrow();
  });
});
