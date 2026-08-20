// Standard unit conversions for pricing precious metals the way Pakistani
// markets quote them (per tola, not per troy ounce or gram).
export const TROY_OUNCE_IN_GRAMS = 31.1035;
export const TOLA_IN_GRAMS = 11.6638;

// 24K gold is ~99.9% pure; 22K jewellery gold is 22/24 of that, conventionally
// rounded to this factor by Pakistani bullion markets.
export const GOLD_22K_PURITY = 0.9167;

// USD/troy-oz -> USD/gram -> USD/tola -> PKR/tola. Works for any metal
// quoted per troy ounce (gold or silver); purity adjustments happen outside
// this function since only gold jewellery needs one.
export function usdPerOunceToPkrPerTola(usdPerOunce, usdToPkrRate) {
  const usdPerGram = usdPerOunce / TROY_OUNCE_IN_GRAMS;
  const usdPerTola = usdPerGram * TOLA_IN_GRAMS;
  return usdPerTola * usdToPkrRate;
}

// Computes the three PKR/tola prices the gold-silver-rates page displays,
// from raw USD/troy-oz spot prices plus the USD->PKR rate.
export function calculateGoldSilverRatesPkr({
  goldUsdPerOunce,
  silverUsdPerOunce,
  usdToPkrRate,
}) {
  const gold24kPerTola = usdPerOunceToPkrPerTola(goldUsdPerOunce, usdToPkrRate);
  const gold22kPerTola = gold24kPerTola * GOLD_22K_PURITY;
  const silverPerTola = usdPerOunceToPkrPerTola(silverUsdPerOunce, usdToPkrRate);

  return { gold24kPerTola, gold22kPerTola, silverPerTola };
}

export default calculateGoldSilverRatesPkr;
