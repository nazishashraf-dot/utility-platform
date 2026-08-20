import { fetchExchangeRates } from "@/app/api/_lib/exchangeRates";
import { calculateGoldSilverRatesPkr } from "@/features/pakistan/engine/metalRates";

const SPOT_URL = "https://xaus.com/api/v1/spot?compact=1";

// Gold/silver spot prices move throughout the day but Sarafa Bazaar-style
// rates aren't typically re-quoted more than a couple of times an hour, so a
// 45-minute cache keeps this fresh without hammering either upstream API.
const REVALIDATE_SECONDS = 45 * 60;

export async function GET() {
  try {
    const [spotResponse, exchangeRates] = await Promise.all([
      fetch(SPOT_URL, { next: { revalidate: REVALIDATE_SECONDS } }),
      fetchExchangeRates(),
    ]);

    if (!spotResponse.ok) {
      return Response.json(
        { error: "The metal rate provider returned an error." },
        { status: 502 }
      );
    }

    const spot = await spotResponse.json();
    const goldUsdPerOunce = spot.spot_usd_oz;
    const silverUsdPerOunce = spot.silver_usd_oz;
    const usdToPkrRate = exchangeRates.rates.PKR;

    if (!goldUsdPerOunce || !silverUsdPerOunce || !usdToPkrRate) {
      return Response.json(
        { error: "The metal rate provider returned an error." },
        { status: 502 }
      );
    }

    const { gold24kPerTola, gold22kPerTola, silverPerTola } =
      calculateGoldSilverRatesPkr({
        goldUsdPerOunce,
        silverUsdPerOunce,
        usdToPkrRate,
      });

    return Response.json(
      {
        gold24kPerTola,
        gold22kPerTola,
        silverPerTola,
        usdToPkrRate,
        date: exchangeRates.date,
        updatedAt: spot.updated_at ?? null,
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
        },
      }
    );
  } catch {
    return Response.json(
      { error: "Unable to reach the metal rate provider." },
      { status: 502 }
    );
  }
}
