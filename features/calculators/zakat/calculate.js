// Nisab thresholds in grams, per the standard reference weights (7.5 tola
// gold / 52.5 tola silver, converted to grams).
export const NISAB_GOLD_GRAMS = 87.48;
export const NISAB_SILVER_GRAMS = 612.36;

// Zakat is 2.5% of net zakatable wealth, once that wealth meets or exceeds
// Nisab.
export const ZAKAT_RATE = 0.025;

// Pure calculation only - metal prices are fetched elsewhere (see
// /api/metal-rates) and passed in here, so this stays testable without a
// network call.
export function calculateZakat({
  cash = 0,
  bankBalances = 0,
  goldGrams = 0,
  silverGrams = 0,
  businessInventory = 0,
  otherInvestments = 0,
  debts = 0,
  nisabStandard,
  goldPricePerGram,
  silverPricePerGram,
}) {
  const goldValue = goldGrams * goldPricePerGram;
  const silverValue = silverGrams * silverPricePerGram;

  const totalZakatableAssets =
    cash +
    bankBalances +
    goldValue +
    silverValue +
    businessInventory +
    otherInvestments;

  const netZakatableWealth = totalZakatableAssets - debts;

  const nisabThresholdGrams =
    nisabStandard === "silver" ? NISAB_SILVER_GRAMS : NISAB_GOLD_GRAMS;
  const nisabPricePerGram =
    nisabStandard === "silver" ? silverPricePerGram : goldPricePerGram;
  const nisabThresholdPkr = nisabThresholdGrams * nisabPricePerGram;

  const isZakatDue = netZakatableWealth >= nisabThresholdPkr;
  const zakatAmount = isZakatDue ? netZakatableWealth * ZAKAT_RATE : 0;

  return {
    // Echoed back alongside the computed values so the UI can render a full
    // breakdown (what was entered -> what it converted to -> the total)
    // without recomputing or duplicating this logic.
    cash,
    bankBalances,
    goldGrams,
    goldPricePerGram,
    goldValue,
    silverGrams,
    silverPricePerGram,
    silverValue,
    businessInventory,
    otherInvestments,
    debts,
    totalZakatableAssets,
    netZakatableWealth,
    nisabStandard: nisabStandard === "silver" ? "silver" : "gold",
    nisabThresholdGrams,
    nisabThresholdPkr,
    isZakatDue,
    zakatAmount,
  };
}

export default calculateZakat;
