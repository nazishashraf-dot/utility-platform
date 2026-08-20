import { fetchExchangeRates } from "@/app/api/_lib/exchangeRates";

export async function GET() {
  try {
    const normalized = await fetchExchangeRates();

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
