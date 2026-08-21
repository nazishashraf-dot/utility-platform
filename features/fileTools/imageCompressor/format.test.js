import { describe, expect, it } from "vitest";
import { calculateReductionPercent, formatBytes } from "./format";

describe("formatBytes", () => {
  it("formats sub-1KB sizes in bytes", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(512)).toBe("512 B");
  });

  it("formats kilobyte-range sizes", () => {
    expect(formatBytes(1024)).toBe("1.00 KB");
    expect(formatBytes(1536)).toBe("1.50 KB");
    expect(formatBytes(200 * 1024)).toBe("200.0 KB");
  });

  it("formats megabyte-range sizes", () => {
    expect(formatBytes(5 * 1024 * 1024)).toBe("5.00 MB");
    expect(formatBytes(12.5 * 1024 * 1024)).toBe("12.5 MB");
  });

  it("treats invalid input as 0 B", () => {
    expect(formatBytes(-5)).toBe("0 B");
    expect(formatBytes(NaN)).toBe("0 B");
  });
});

describe("calculateReductionPercent", () => {
  it("returns a positive percentage when the file shrank", () => {
    expect(calculateReductionPercent(1000, 250)).toBeCloseTo(75, 6);
  });

  it("returns a negative percentage when the file grew", () => {
    expect(calculateReductionPercent(1000, 1200)).toBeCloseTo(-20, 6);
  });

  it("returns 0 when the size is unchanged", () => {
    expect(calculateReductionPercent(1000, 1000)).toBe(0);
  });

  it("returns 0 for a zero-byte original instead of dividing by zero", () => {
    expect(calculateReductionPercent(0, 500)).toBe(0);
  });
});
