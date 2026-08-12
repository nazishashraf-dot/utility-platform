import { describe, expect, it } from "vitest";
import { convert } from "./convert";
import { timeCategory } from "../data/time";

const units = timeCategory.units;

describe("convert (time)", () => {
  it("converts hours to seconds", () => {
    expect(convert(1, "hour", "second", units)).toBe(3600);
  });

  it("converts days to seconds", () => {
    expect(convert(1, "day", "second", units)).toBe(86400);
  });

  it("converts weeks to days", () => {
    expect(convert(1, "week", "day", units)).toBe(7);
  });

  it("converts minutes to hours", () => {
    expect(convert(90, "minute", "hour", units)).toBeCloseTo(1.5, 10);
  });

  it("handles zero", () => {
    expect(convert(0, "hour", "second", units)).toBe(0);
  });

  it("is reversible when swapping from/to units", () => {
    const seconds = convert(2.5, "day", "second", units);
    const backToDays = convert(seconds, "second", "day", units);
    expect(backToDays).toBeCloseTo(2.5, 10);
  });
});
