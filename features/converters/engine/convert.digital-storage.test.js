import { describe, expect, it } from "vitest";
import { convert } from "./convert";
import { digitalStorageCategory } from "../data/digital-storage";

const units = digitalStorageCategory.units;

describe("convert (digital storage)", () => {
  it("converts kilobytes to bytes", () => {
    expect(convert(1, "kilobyte", "byte", units)).toBe(1024);
  });

  it("converts megabytes to kilobytes", () => {
    expect(convert(1, "megabyte", "kilobyte", units)).toBe(1024);
  });

  it("converts gigabytes to kilobytes", () => {
    expect(convert(1, "gigabyte", "kilobyte", units)).toBe(1048576);
  });

  it("converts terabytes to gigabytes", () => {
    expect(convert(1, "terabyte", "gigabyte", units)).toBe(1024);
  });

  it("handles zero", () => {
    expect(convert(0, "gigabyte", "megabyte", units)).toBe(0);
  });

  it("is reversible when swapping from/to units", () => {
    const kilobytes = convert(5, "megabyte", "kilobyte", units);
    const backToMegabytes = convert(kilobytes, "kilobyte", "megabyte", units);
    expect(backToMegabytes).toBeCloseTo(5, 10);
  });
});
