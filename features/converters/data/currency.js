// Unlike the other categories, currencies have no fixed conversion factor -
// rates change daily and are fetched live from /api/exchange-rates. `id` is
// the ISO currency code, since that's exactly what the rates API keys on.
//
// Limited to currencies actually supported by our rate source
// (open.er-api.com) - every code listed here must exist in that API's
// response or it'll silently fail to convert.
export const currencyCategory = {
  id: "currency",
  name: "Currency",
  units: [
    { id: "USD", name: "US Dollar" },
    { id: "EUR", name: "Euro" },
    { id: "GBP", name: "British Pound" },
    { id: "INR", name: "Indian Rupee" },
    { id: "PKR", name: "Pakistani Rupee" },
    { id: "CNY", name: "Chinese Yuan" },
    { id: "JPY", name: "Japanese Yen" },
    { id: "AUD", name: "Australian Dollar" },
    { id: "CAD", name: "Canadian Dollar" },
  ],
};

export default currencyCategory;
