import { describe, expect, it } from "vitest";
import {
  NISAB_GOLD_GRAMS,
  NISAB_SILVER_GRAMS,
  ZAKAT_RATE,
  calculateZakat,
} from "./calculate";

const GOLD_PRICE = 20000; // PKR per gram
const SILVER_PRICE = 300; // PKR per gram

const GOLD_NISAB_PKR = NISAB_GOLD_GRAMS * GOLD_PRICE; // 1,749,600
const SILVER_NISAB_PKR = NISAB_SILVER_GRAMS * SILVER_PRICE; // 183,708

describe("calculateZakat - gold Nisab standard", () => {
  it("is due when net wealth is clearly above the gold Nisab", () => {
    const result = calculateZakat({
      cash: 2_000_000,
      nisabStandard: "gold",
      goldPricePerGram: GOLD_PRICE,
      silverPricePerGram: SILVER_PRICE,
    });

    expect(result.nisabThresholdPkr).toBeCloseTo(GOLD_NISAB_PKR, 6);
    expect(result.isZakatDue).toBe(true);
    expect(result.zakatAmount).toBeCloseTo(2_000_000 * ZAKAT_RATE, 6);
  });

  it("is not due when net wealth is clearly below the gold Nisab", () => {
    const result = calculateZakat({
      cash: 500_000,
      nisabStandard: "gold",
      goldPricePerGram: GOLD_PRICE,
      silverPricePerGram: SILVER_PRICE,
    });

    expect(result.isZakatDue).toBe(false);
    expect(result.zakatAmount).toBe(0);
  });

  it("is due when net wealth exactly equals the gold Nisab", () => {
    const result = calculateZakat({
      cash: GOLD_NISAB_PKR,
      nisabStandard: "gold",
      goldPricePerGram: GOLD_PRICE,
      silverPricePerGram: SILVER_PRICE,
    });

    expect(result.isZakatDue).toBe(true);
    expect(result.zakatAmount).toBeCloseTo(GOLD_NISAB_PKR * ZAKAT_RATE, 6);
  });
});

describe("calculateZakat - silver Nisab standard", () => {
  it("is due when net wealth is clearly above the silver Nisab", () => {
    const result = calculateZakat({
      cash: 250_000,
      nisabStandard: "silver",
      goldPricePerGram: GOLD_PRICE,
      silverPricePerGram: SILVER_PRICE,
    });

    expect(result.nisabThresholdPkr).toBeCloseTo(SILVER_NISAB_PKR, 6);
    expect(result.isZakatDue).toBe(true);
    expect(result.zakatAmount).toBeCloseTo(250_000 * ZAKAT_RATE, 6);
  });

  it("is not due when net wealth is clearly below the silver Nisab", () => {
    const result = calculateZakat({
      cash: 100_000,
      nisabStandard: "silver",
      goldPricePerGram: GOLD_PRICE,
      silverPricePerGram: SILVER_PRICE,
    });

    expect(result.isZakatDue).toBe(false);
    expect(result.zakatAmount).toBe(0);
  });

  it("is due when net wealth exactly equals the silver Nisab", () => {
    const result = calculateZakat({
      cash: SILVER_NISAB_PKR,
      nisabStandard: "silver",
      goldPricePerGram: GOLD_PRICE,
      silverPricePerGram: SILVER_PRICE,
    });

    expect(result.isZakatDue).toBe(true);
    expect(result.zakatAmount).toBeCloseTo(SILVER_NISAB_PKR * ZAKAT_RATE, 6);
  });
});

describe("calculateZakat - asset aggregation and debts", () => {
  it("values gold and silver holdings at the given per-gram prices and includes them in total assets", () => {
    const result = calculateZakat({
      goldGrams: 50,
      silverGrams: 100,
      nisabStandard: "gold",
      goldPricePerGram: GOLD_PRICE,
      silverPricePerGram: SILVER_PRICE,
    });

    expect(result.goldValue).toBeCloseTo(50 * GOLD_PRICE, 6);
    expect(result.silverValue).toBeCloseTo(100 * SILVER_PRICE, 6);
    expect(result.totalZakatableAssets).toBeCloseTo(
      50 * GOLD_PRICE + 100 * SILVER_PRICE,
      6
    );
  });

  it("echoes every input back on the result so a breakdown can be rendered without recomputing", () => {
    const result = calculateZakat({
      cash: 10_000,
      bankBalances: 20_000,
      goldGrams: 5,
      silverGrams: 15,
      businessInventory: 30_000,
      otherInvestments: 40_000,
      debts: 5_000,
      nisabStandard: "gold",
      goldPricePerGram: GOLD_PRICE,
      silverPricePerGram: SILVER_PRICE,
    });

    expect(result.cash).toBe(10_000);
    expect(result.bankBalances).toBe(20_000);
    expect(result.goldGrams).toBe(5);
    expect(result.goldPricePerGram).toBe(GOLD_PRICE);
    expect(result.silverGrams).toBe(15);
    expect(result.silverPricePerGram).toBe(SILVER_PRICE);
    expect(result.businessInventory).toBe(30_000);
    expect(result.otherInvestments).toBe(40_000);
    expect(result.debts).toBe(5_000);
  });

  it("subtracts debts from total assets before comparing to Nisab", () => {
    const result = calculateZakat({
      cash: 2_500_000,
      debts: 500_000,
      nisabStandard: "gold",
      goldPricePerGram: GOLD_PRICE,
      silverPricePerGram: SILVER_PRICE,
    });

    expect(result.netZakatableWealth).toBeCloseTo(2_000_000, 6);
    expect(result.isZakatDue).toBe(true);
    expect(result.zakatAmount).toBeCloseTo(2_000_000 * ZAKAT_RATE, 6);
  });

  it("can be due under the silver standard but not the gold standard for the same wealth", () => {
    const inputs = {
      goldGrams: 50,
      silverGrams: 100,
      cash: 500_000,
      bankBalances: 200_000,
      businessInventory: 100_000,
      otherInvestments: 50_000,
      debts: 300_000,
      goldPricePerGram: GOLD_PRICE,
      silverPricePerGram: SILVER_PRICE,
    };

    const underGold = calculateZakat({ ...inputs, nisabStandard: "gold" });
    const underSilver = calculateZakat({ ...inputs, nisabStandard: "silver" });

    expect(underGold.netZakatableWealth).toBeCloseTo(
      underSilver.netZakatableWealth,
      6
    );
    expect(underGold.isZakatDue).toBe(false);
    expect(underSilver.isZakatDue).toBe(true);
  });

  it("is not due when debts exceed assets, leaving negative net wealth", () => {
    const result = calculateZakat({
      cash: 100_000,
      debts: 300_000,
      nisabStandard: "silver",
      goldPricePerGram: GOLD_PRICE,
      silverPricePerGram: SILVER_PRICE,
    });

    expect(result.netZakatableWealth).toBeCloseTo(-200_000, 6);
    expect(result.isZakatDue).toBe(false);
    expect(result.zakatAmount).toBe(0);
  });
});
