const RATES_URL = "https://open.er-api.com/v6/latest/USD";

// Shared by /api/exchange-rates and /api/metal-rates so both routes fetch
// and normalize currency rates the same way instead of duplicating it.
// open.er-api.com (exchangerate-api.com's free, keyless endpoint) covers
// PKR/AED, unlike Frankfurter (ECB-only) which this used to call. Its
// response shape (base_code/time_last_update_utc) is normalized here to
// { base, date, rates } for callers.
export async function fetchExchangeRates() {
  const response = await fetch(RATES_URL, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("The exchange rate provider returned an error.");
  }

  const data = await response.json();

  if (data.result !== "success" || !data.rates) {
    throw new Error("The exchange rate provider returned an error.");
  }

  return {
    base: data.base_code,
    date: new Date(data.time_last_update_utc).toISOString().slice(0, 10),
    rates: data.rates,
  };
}

export default fetchExchangeRates;
