const FRANKFURTER_URL = "https://api.frankfurter.app/latest";

// Frankfurter publishes new rates once a day (ECB reference rates), so an
// hourly revalidation is more than fresh enough and avoids hammering it.
export async function GET() {
  try {
    const response = await fetch(FRANKFURTER_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return Response.json(
        { error: "The exchange rate provider returned an error." },
        { status: 502 }
      );
    }

    const data = await response.json();

    return Response.json(data, {
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
