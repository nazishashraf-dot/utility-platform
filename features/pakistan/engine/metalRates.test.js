import { describe, expect, it } from "vitest";
import {
  TOLA_IN_GRAMS,
  TROY_OUNCE_IN_GRAMS,
  GOLD_22K_PURITY,
  usdPerOunceToPkrPerTola,
  calculateGoldSilverRatesPkr,
} from "./metalRates";

describe("usdPerOunceToPkrPerTola", () => {
  it("converts USD/troy-oz to PKR/tola via grams", () => {
    // 10 USD/gram (311.035 = 31.1035 * 10) at a PKR rate of 10 ->
    // 10 * 11.6638 * 10 = 1166.38 PKR/tola.
    const result = usdPerOunceToPkrPerTola(TROY_OUNCE_IN_GRAMS * 10, 10);
    expect(result).toBeCloseTo(1166.38, 6);
  });

  it("scales linearly with the USD-PKR rate", () => {
    const base = usdPerOunceToPkrPerTola(TROY_OUNCE_IN_GRAMS * 10, 1);
    const doubled = usdPerOunceToPkrPerTola(TROY_OUNCE_IN_GRAMS * 10, 2);
    expect(doubled).toBeCloseTo(base * 2, 6);
  });

  it("returns exactly one tola's worth of grams in PKR when the USD/gram and rate are both 1", () => {
    const result = usdPerOunceToPkrPerTola(TROY_OUNCE_IN_GRAMS, 1);
    expect(result).toBeCloseTo(TOLA_IN_GRAMS, 6);
  });
});

describe("calculateGoldSilverRatesPkr", () => {
  it("computes gold 24K, gold 22K, and silver PKR/tola prices", () => {
    const result = calculateGoldSilverRatesPkr({
      goldUsdPerOunce: TROY_OUNCE_IN_GRAMS * 10,
      silverUsdPerOunce: TROY_OUNCE_IN_GRAMS * 5,
      usdToPkrRate: 10,
    });

    expect(result.gold24kPerTola).toBeCloseTo(1166.38, 6);
    expect(result.gold22kPerTola).toBeCloseTo(1166.38 * GOLD_22K_PURITY, 6);
    expect(result.silverPerTola).toBeCloseTo(583.19, 6);
  });

  it("prices 22K gold below 24K gold, scaled by the purity factor exactly", () => {
    const result = calculateGoldSilverRatesPkr({
      goldUsdPerOunce: TROY_OUNCE_IN_GRAMS * 10,
      silverUsdPerOunce: TROY_OUNCE_IN_GRAMS * 5,
      usdToPkrRate: 10,
    });

    expect(result.gold22kPerTola / result.gold24kPerTola).toBeCloseTo(
      GOLD_22K_PURITY,
      10
    );
  });

  it("does not apply the gold purity factor to silver", () => {
    const result = calculateGoldSilverRatesPkr({
      goldUsdPerOunce: TROY_OUNCE_IN_GRAMS * 10,
      silverUsdPerOunce: TROY_OUNCE_IN_GRAMS * 10,
      usdToPkrRate: 10,
    });

    expect(result.silverPerTola).toBeCloseTo(result.gold24kPerTola, 6);
    expect(result.silverPerTola).not.toBeCloseTo(result.gold22kPerTola, 1);
  });
});
