import { describe, expect, it } from "vitest";
import { convert } from "./convert";
import { temperatureCategory } from "../data/temperature";

const units = temperatureCategory.units;

describe("convert (temperature - formula-based units)", () => {
  it("converts 0°C to 32°F", () => {
    expect(convert(0, "celsius", "fahrenheit", units)).toBeCloseTo(32, 10);
  });

  it("converts 100°C to 212°F", () => {
    expect(convert(100, "celsius", "fahrenheit", units)).toBeCloseTo(212, 10);
  });

  it("converts 0°C to 273.15K", () => {
    expect(convert(0, "celsius", "kelvin", units)).toBeCloseTo(273.15, 10);
  });

  it("converts 32°F to 0°C", () => {
    expect(convert(32, "fahrenheit", "celsius", units)).toBeCloseTo(0, 10);
  });

  it("converts 273.15K to 0°C", () => {
    expect(convert(273.15, "kelvin", "celsius", units)).toBeCloseTo(0, 10);
  });

  it("converts directly between two non-base formula units (F to K)", () => {
    expect(convert(32, "fahrenheit", "kelvin", units)).toBeCloseTo(273.15, 10);
  });

  it("returns the same value when converting a unit to itself", () => {
    expect(convert(37, "celsius", "celsius", units)).toBe(37);
  });

  it("handles negative temperatures", () => {
    expect(convert(-40, "celsius", "fahrenheit", units)).toBeCloseTo(-40, 10);
  });
});

describe("convert (temperature) - existing factor-based paths still work", () => {
  it("still throws on invalid values, same as before", () => {
    expect(() => convert(NaN, "celsius", "fahrenheit", units)).toThrow();
  });

  it("still throws on unknown unit ids", () => {
    expect(() => convert(0, "celsius", "rankine", units)).toThrow();
  });
});
