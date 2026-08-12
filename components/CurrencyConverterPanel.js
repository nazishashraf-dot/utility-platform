"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { formatNumber } from "@/features/converters/engine/formatNumber";
import { convertCurrencyAmount } from "@/features/converters/engine/convertCurrency";
import { currencyCategory } from "@/features/converters/data/currency";

const currencies = currencyCategory.units;

export default function CurrencyConverterPanel() {
  const valueInputId = useId();

  const [value, setValue] = useState("1");
  const [fromCurrency, setFromCurrency] = useState(currencies[0].id);
  const [toCurrency, setToCurrency] = useState(currencies[1].id);
  const [copied, setCopied] = useState(false);

  const [ratesData, setRatesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchError, setHasFetchError] = useState(false);

  // No setState before the first `await` here, so nothing runs
  // synchronously within the effect that calls this on mount.
  const fetchRates = useCallback(async () => {
    try {
      const response = await fetch("/api/exchange-rates");
      const data = await response.json();
      if (!response.ok || !data.rates) throw new Error("Malformed response");
      setRatesData(data);
      setHasFetchError(false);
    } catch {
      setHasFetchError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetching remote data on mount is a legitimate effect use case (see
    // https://react.dev/learn/you-might-not-need-an-effect#fetching-data).
    // The lint rule's static analysis flags this because fetchRates
    // eventually calls a setter, but it can't see that those calls only
    // happen after the `await` - i.e. asynchronously, not synchronously
    // within the effect, which is what the rule actually targets.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRates();
  }, [fetchRates]);

  function handleRetry() {
    setIsLoading(true);
    setHasFetchError(false);
    fetchRates();
  }

  const isDisabled = isLoading || hasFetchError;

  const { result, message } = useMemo(() => {
    if (isLoading) {
      return { result: null, message: "Loading exchange rates..." };
    }
    if (hasFetchError || !ratesData) {
      return {
        result: null,
        message: "Unable to load exchange rates right now.",
      };
    }

    const trimmed = value.trim();
    if (trimmed === "") {
      return { result: null, message: "Enter an amount to convert." };
    }

    const parsed = Number(trimmed);
    if (!Number.isFinite(parsed)) {
      return { result: null, message: "Enter a valid number." };
    }

    try {
      return {
        result: convertCurrencyAmount(
          parsed,
          fromCurrency,
          toCurrency,
          ratesData.rates,
          ratesData.base
        ),
        message: null,
      };
    } catch {
      return {
        result: null,
        message: "Exchange rate unavailable for the selected currency.",
      };
    }
  }, [value, fromCurrency, toCurrency, ratesData, isLoading, hasFetchError]);

  const formattedResult = result === null ? null : formatNumber(result);

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  async function handleCopy() {
    if (formattedResult === null) return;
    try {
      await navigator.clipboard.writeText(formattedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access unavailable/denied - nothing to recover from here.
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50 sm:p-8">
      <div>
        <label
          htmlFor={valueInputId}
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          id={valueInputId}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter an amount"
          disabled={isDisabled}
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-lg text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:bg-gray-50 disabled:text-gray-400"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>
          <select
            value={fromCurrency}
            onChange={(event) => setFromCurrency(event.target.value)}
            disabled={isDisabled}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:bg-gray-50 disabled:text-gray-400"
          >
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.id} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          aria-label="Swap currencies"
          disabled={isDisabled}
          className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-lg text-gray-600 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-50 sm:mx-0 sm:mb-1"
        >
          ↔
        </button>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            To
          </label>
          <select
            value={toCurrency}
            onChange={(event) => setToCurrency(event.target.value)}
            disabled={isDisabled}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:bg-gray-50 disabled:text-gray-400"
          >
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.id} - {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-gradient-to-br from-primary-50 via-primary-50 to-primary-100/60 p-6 text-center">
        <p className="text-sm font-medium text-gray-500">Result</p>
        {formattedResult !== null ? (
          <div className="mt-1 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
            <span className="break-all text-3xl font-bold text-primary-600 sm:text-5xl">
              {formattedResult}
            </span>
            <span className="text-base font-medium text-primary-600/70 sm:text-lg">
              {toCurrency}
            </span>
          </div>
        ) : (
          <p className="mt-1 text-base text-gray-400">{message}</p>
        )}

        {hasFetchError && (
          <button
            type="button"
            onClick={handleRetry}
            className="mt-3 block w-full text-sm font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700"
          >
            Retry
          </button>
        )}

        <button
          type="button"
          onClick={handleCopy}
          disabled={formattedResult === null}
          className="mt-4 rounded-lg border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-white"
        >
          {copied ? "Copied!" : "Copy Result"}
        </button>

        {ratesData?.date && !hasFetchError && (
          <p className="mt-3 text-xs text-gray-400">
            Rates as of {ratesData.date}
          </p>
        )}
      </div>
    </div>
  );
}
