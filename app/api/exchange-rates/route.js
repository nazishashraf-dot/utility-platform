const RATES_URL = "https://open.er-api.com/v6/latest/USD";

// open.er-api.com (exchangerate-api.com's free, keyless endpoint) publishes
// new rates once a day and covers PKR/AED, unlike Frankfurter (ECB-only)
// which this route used previously. Its response shape differs from ours
// (base_code/time_last_update_utc instead of base/date), so we normalize it
// here to keep the rest of the app - which expects { base, date, rates } -
// unchanged.
export async function GET() {
  try {
    const response = await fetch(RATES_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return Response.json(
        { error: "The exchange rate provider returned an error." },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (data.result !== "success" || !data.rates) {
      return Response.json(
        { error: "The exchange rate provider returned an error." },
        { status: 502 }
      );
    }

    const normalized = {
      base: data.base_code,
      date: new Date(data.time_last_update_utc).toISOString().slice(0, 10),
      rates: data.rates,
    };

    return Response.json(normalized, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return Response.json(
      { error: "Unable to reach the exchange rate provider." },
      { status: 502 }
    );
  }
}
