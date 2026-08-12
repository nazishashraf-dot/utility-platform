import { describe, expect, it } from "vitest";
import { convert } from "./convert";
import { volumeCategory } from "../data/volume";

const units = volumeCategory.units;

describe("convert (volume)", () => {
  it("converts gallons to liters", () => {
    expect(convert(1, "gallon", "liter", units)).toBeCloseTo(3.78541, 5);
  });

  it("converts liters to gallons", () => {
    expect(convert(3.785411784, "liter", "gallon", units)).toBeCloseTo(1, 5);
  });

  it("converts liters to milliliters", () => {
    expect(convert(1, "liter", "milliliter", units)).toBe(1000);
  });

  it("converts cups to fluid ounces (1 cup is 8 fl oz)", () => {
    expect(convert(1, "cup", "fluid-ounce", units)).toBeCloseTo(8, 5);
  });

  it("handles zero", () => {
    expect(convert(0, "gallon", "liter", units)).toBe(0);
  });

  it("is reversible when swapping from/to units", () => {
    const milliliters = convert(2, "cup", "milliliter", units);
    const backToCups = convert(milliliters, "milliliter", "cup", units);
    expect(backToCups).toBeCloseTo(2, 5);
  });
});
