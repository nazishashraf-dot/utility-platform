// Unlike the other categories, currencies have no fixed conversion factor -
// rates change daily and are fetched live from /api/exchange-rates. `id` is
// the ISO currency code, since that's exactly what the rates API keys on.
//
// Limited to currencies actually supported by our rate source (Frankfurter,
// which mirrors ECB reference rates): notably PKR and AED are NOT covered
// and are intentionally excluded rather than shown with rates that don't exist.
export const currencyCategory = {
  id: "currency",
  name: "Currency",
  units: [
    { id: "USD", name: "US Dollar" },
    { id: "EUR", name: "Euro" },
    { id: "GBP", name: "British Pound" },
    { id: "INR", name: "Indian Rupee" },
    { id: "CNY", name: "Chinese Yuan" },
    { id: "JPY", name: "Japanese Yen" },
    { id: "AUD", name: "Australian Dollar" },
    { id: "CAD", name: "Canadian Dollar" },
  ],
};

export default currencyCategory;
