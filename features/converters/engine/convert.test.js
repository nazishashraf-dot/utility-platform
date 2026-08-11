import { describe, expect, it } from "vitest";
import { convert } from "./convert";
import { lengthCategory } from "../data/length";

const units = lengthCategory.units;

describe("convert (length)", () => {
  it("converts kilometers to miles", () => {
    expect(convert(1, "kilometer", "mile", units)).toBeCloseTo(0.621371, 5);
  });

  it("converts miles to kilometers", () => {
    expect(convert(1, "mile", "kilometer", units)).toBeCloseTo(1.609344, 6);
  });

  it("converts meters to feet", () => {
    expect(convert(1, "meter", "foot", units)).toBeCloseTo(3.28084, 5);
  });

  it("converts inches to centimeters", () => {
    expect(convert(1, "inch", "centimeter", units)).toBeCloseTo(2.54, 5);
  });

  it("is reversible when swapping from/to units", () => {
    const km = convert(5, "mile", "kilometer", units);
    const backToMiles = convert(km, "kilometer", "mile", units);
    expect(backToMiles).toBeCloseTo(5, 5);
  });

  it("returns the same value when converting a unit to itself", () => {
    expect(convert(42, "yard", "yard", units)).toBe(42);
  });

  it("handles zero", () => {
    expect(convert(0, "kilometer", "mile", units)).toBe(0);
  });

  it("handles negative values (length can be a relative/negative offset)", () => {
    expect(convert(-1, "kilometer", "mile", units)).toBeCloseTo(-0.621371, 5);
  });

  it("handles very large values without losing precision", () => {
    expect(convert(1e12, "kilometer", "meter", units)).toBeCloseTo(1e15, -3);
  });

  it("handles very small values without collapsing to zero", () => {
    expect(convert(1e-9, "kilometer", "meter", units)).toBeCloseTo(1e-6, 15);
  });

  it("throws on an invalid (non-numeric) value", () => {
    expect(() => convert("abc", "kilometer", "mile", units)).toThrow();
    expect(() => convert(NaN, "kilometer", "mile", units)).toThrow();
    expect(() => convert(Infinity, "kilometer", "mile", units)).toThrow();
  });

  it("throws on an unknown unit id", () => {
    expect(() => convert(1, "kilometer", "lightyear", units)).toThrow();
    expect(() => convert(1, "lightyear", "mile", units)).toThrow();
  });
});
