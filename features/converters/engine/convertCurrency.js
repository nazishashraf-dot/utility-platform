// Converts an amount between currencies using a flat rate table keyed by
// currency code, all quoted relative to baseCode (whose own rate is 1 and
// is implicit - the rates API doesn't include the base in its own table).
export function convertCurrencyAmount(amount, fromCode, toCode, rates, baseCode) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    throw new Error(
      `convertCurrencyAmount: amount must be a finite number, received ${amount}`
    );
  }

  const rateOf = (code) => (code === baseCode ? 1 : rates[code]);
  const fromRate = rateOf(fromCode);
  const toRate = rateOf(toCode);

  if (!(fromRate > 0) || !(toRate > 0)) {
    throw new Error(
      `convertCurrencyAmount: missing or invalid rate for "${fromCode}" or "${toCode}"`
    );
  }

  if (fromCode === toCode) return amount;

  const amountInBase = amount / fromRate;
  return amountInBase * toRate;
}

export default convertCurrencyAmount;
