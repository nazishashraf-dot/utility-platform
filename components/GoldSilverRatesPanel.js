"use client";

import { useCallback, useEffect, useState } from "react";

function formatPkr(amount) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amount);
}

function RateCard({ title, amountPkr }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg shadow-gray-200/50">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className="mt-2 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
        <span className="break-all text-3xl font-bold text-primary-600 sm:text-4xl">
          {formatPkr(amountPkr)}
        </span>
        <span className="text-base font-medium text-primary-600/70">PKR</span>
      </div>
    </div>
  );
}

export default function GoldSilverRatesPanel() {
  const [rates, setRates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchError, setHasFetchError] = useState(false);

  // No setState before the first `await` here, so nothing runs
  // synchronously within the effect that calls this on mount.
  const fetchRates = useCallback(async () => {
    try {
      const response = await fetch("/api/metal-rates");
      const data = await response.json();
      if (!response.ok || !data.gold24kPerTola) {
        throw new Error("Malformed response");
      }
      setRates(data);
      setHasFetchError(false);
    } catch {
      setHasFetchError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRates();
  }, [fetchRates]);

  function handleRetry() {
    setIsLoading(true);
    setHasFetchError(false);
    fetchRates();
  }

  if (isLoading) {
    return (
      <p className="text-center text-base text-gray-400">
        Loading gold and silver rates...
      </p>
    );
  }

  if (hasFetchError || !rates) {
    return (
      <div className="text-center">
        <p className="text-base text-gray-400">
          Unable to load gold and silver rates right now.
        </p>
        <button
          type="button"
          onClick={handleRetry}
          className="mt-3 text-sm font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <RateCard title="Gold 24K per tola" amountPkr={rates.gold24kPerTola} />
        <RateCard title="Gold 22K per tola" amountPkr={rates.gold22kPerTola} />
        <RateCard title="Silver per tola" amountPkr={rates.silverPerTola} />
      </div>

      {rates.date && (
        <p className="mt-4 text-center text-xs text-gray-400">
          Rates as of {rates.date}
        </p>
      )}

      <p className="mt-6 text-center text-xs text-gray-400">
        These are indicative market rates calculated from live international
        spot prices and the USD-PKR exchange rate. They are not official
        Sarafa Bazaar rates and may differ from local dealer prices.
      </p>
    </div>
  );
}
