import { describe, expect, it } from "vitest";
import { calculateFlatRate, calculateReducingBalance } from "./calculate";

describe("calculateReducingBalance", () => {
  it("matches the standard EMI formula for a known reference loan (100,000 @ 12% for 12 months)", () => {
    const result = calculateReducingBalance(100000, 12, 12);

    expect(result.monthlyInstallment).toBeCloseTo(8884.88, 1);
    expect(result.totalPayment).toBeCloseTo(106618.55, 1);
    expect(result.totalInterest).toBeCloseTo(6618.55, 1);
  });

  it("matches a second known reference loan (500,000 @ 15% for 36 months)", () => {
    const result = calculateReducingBalance(500000, 15, 36);

    expect(result.monthlyInstallment).toBeCloseTo(17332.66, 1);
    expect(result.totalPayment).toBeCloseTo(623975.91, 1);
    expect(result.totalInterest).toBeCloseTo(123975.91, 1);
  });

  it("charges zero interest at a 0% rate, splitting principal evenly", () => {
    const result = calculateReducingBalance(120000, 0, 12);

    expect(result.monthlyInstallment).toBeCloseTo(10000, 6);
    expect(result.totalInterest).toBeCloseTo(0, 6);
  });
});

describe("calculateFlatRate", () => {
  it("charges interest on the full original principal for the whole term (100,000 @ 12% for 12 months)", () => {
    const result = calculateFlatRate(100000, 12, 12);

    // 100,000 * 12% * (12/12) = 12,000 flat interest, split over 12 months.
    expect(result.totalInterest).toBeCloseTo(12000, 6);
    expect(result.totalPayment).toBeCloseTo(112000, 6);
    expect(result.monthlyInstallment).toBeCloseTo(9333.33, 2);
  });

  it("matches a second known reference loan (500,000 @ 15% for 36 months)", () => {
    const result = calculateFlatRate(500000, 15, 36);

    // 500,000 * 15% * (36/12) = 225,000 flat interest.
    expect(result.totalInterest).toBeCloseTo(225000, 6);
    expect(result.totalPayment).toBeCloseTo(725000, 6);
    expect(result.monthlyInstallment).toBeCloseTo(20138.89, 2);
  });

  it("reports an effective annual rate well above the stated flat rate", () => {
    const result = calculateFlatRate(100000, 12, 12);

    expect(result.effectiveAnnualRatePercent).toBeGreaterThan(12);
    expect(result.effectiveAnnualRatePercent).toBeCloseTo(23.7, 1);
  });

  it("reports an effective rate close to 0 at a stated 0% flat rate", () => {
    const result = calculateFlatRate(120000, 0, 12);

    expect(result.effectiveAnnualRatePercent).toBeCloseTo(0, 6);
  });
});

describe("reducing balance vs flat rate, same inputs", () => {
  it("always produces lower total interest under reducing balance than flat rate", () => {
    const scenarios = [
      [100000, 12, 12],
      [500000, 15, 36],
      [250000, 8, 24],
      [1000000, 20, 60],
    ];

    scenarios.forEach(([principal, rate, months]) => {
      const reducing = calculateReducingBalance(principal, rate, months);
      const flat = calculateFlatRate(principal, rate, months);

      expect(reducing.totalInterest).toBeLessThan(flat.totalInterest);
    });
  });

  it("shows the flat rate's effective annual rate exceeding its own stated rate", () => {
    const flat = calculateFlatRate(250000, 8, 24);

    expect(flat.effectiveAnnualRatePercent).toBeGreaterThan(8);
  });
});
