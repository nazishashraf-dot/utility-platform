import { describe, expect, it } from "vitest";
import { convert } from "./convert";
import { weightCategory } from "../data/weight";

const units = weightCategory.units;

describe("convert (weight)", () => {
  it("converts kilograms to pounds", () => {
    expect(convert(1, "kilogram", "pound", units)).toBeCloseTo(2.20462, 5);
  });

  it("converts pounds to kilograms", () => {
    expect(convert(1, "pound", "kilogram", units)).toBeCloseTo(0.45359237, 8);
  });

  it("converts kilograms to grams", () => {
    expect(convert(1, "kilogram", "gram", units)).toBe(1000);
  });

  it("converts ounces to pounds (16 oz is 1 lb)", () => {
    expect(convert(16, "ounce", "pound", units)).toBeCloseTo(1, 5);
  });

  it("handles zero", () => {
    expect(convert(0, "kilogram", "pound", units)).toBe(0);
  });

  it("is reversible when swapping from/to units", () => {
    const grams = convert(3, "pound", "gram", units);
    const backToPounds = convert(grams, "gram", "pound", units);
    expect(backToPounds).toBeCloseTo(3, 5);
  });
});
