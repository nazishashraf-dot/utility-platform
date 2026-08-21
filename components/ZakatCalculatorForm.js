"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { calculateZakat } from "@/features/calculators/zakat/calculate";

function formatPkr(amount) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amount);
}

function parseAmount(value) {
  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

const FIELDS = [
  { key: "cash", label: "Cash in hand (PKR)" },
  { key: "bankBalances", label: "Bank balances (PKR)" },
  { key: "goldGrams", label: "Gold you own (grams)" },
  { key: "silverGrams", label: "Silver you own (grams)" },
  { key: "businessInventory", label: "Business inventory value (PKR)" },
  { key: "otherInvestments", label: "Other investments (PKR)" },
  { key: "debts", label: "Debts / liabilities due (PKR)" },
];

const inputClassName =
  "mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:bg-gray-50 disabled:text-gray-400";

export default function ZakatCalculatorForm() {
  const formId = useId();

  const [values, setValues] = useState(() =>
    Object.fromEntries(FIELDS.map((field) => [field.key, ""]))
  );
  const [nisabStandard, setNisabStandard] = useState("gold");
  const [result, setResult] = useState(null);

  const [metalRates, setMetalRates] = useState(null);
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [hasFetchError, setHasFetchError] = useState(false);

  // No setState before the first `await` here, so nothing runs
  // synchronously within the effect that calls this on mount.
  const fetchMetalRates = useCallback(async () => {
    try {
      const response = await fetch("/api/metal-rates");
      const data = await response.json();
      if (!response.ok || !data.gold24kPerGram || !data.silverPerGram) {
        throw new Error("Malformed response");
      }
      setMetalRates(data);
      setHasFetchError(false);
    } catch {
      setHasFetchError(true);
    } finally {
      setIsLoadingRates(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMetalRates();
  }, [fetchMetalRates]);

  function handleRetryRates() {
    setIsLoadingRates(true);
    setHasFetchError(false);
    fetchMetalRates();
  }

  function handleFieldChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleCalculate(event) {
    event.preventDefault();
    if (!metalRates) return;

    const parsedValues = Object.fromEntries(
      FIELDS.map((field) => [field.key, parseAmount(values[field.key])])
    );

    setResult(
      calculateZakat({
        ...parsedValues,
        nisabStandard,
        goldPricePerGram: metalRates.gold24kPerGram,
        silverPricePerGram: metalRates.silverPerGram,
      })
    );
  }

  const isDisabled = isLoadingRates || hasFetchError;

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FIELDS.map((field) => {
            const inputId = `${formId}-${field.key}`;
            return (
              <div key={field.key}>
                <label
                  htmlFor={inputId}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  id={inputId}
                  type="text"
                  inputMode="decimal"
                  value={values[field.key]}
                  onChange={(event) =>
                    handleFieldChange(field.key, event.target.value)
                  }
                  placeholder="0"
                  disabled={isDisabled}
                  className={inputClassName}
                />
              </div>
            );
          })}
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-gray-700">
            Nisab standard
          </legend>
          <p className="mt-1 text-xs text-gray-400">
            Gold Nisab (87.48g) is the higher, more cautious threshold;
            silver Nisab (612.36g) is lower, so more people meet it.
          </p>
          <div className="mt-3 flex gap-4">
            {["gold", "silver"].map((standard) => (
              <label
                key={standard}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="radio"
                  name={`${formId}-nisab-standard`}
                  value={standard}
                  checked={nisabStandard === standard}
                  onChange={() => setNisabStandard(standard)}
                  disabled={isDisabled}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-200"
                />
                {standard === "gold" ? "Gold" : "Silver"}
              </label>
            ))}
          </div>
        </fieldset>

        {hasFetchError ? (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Unable to load current gold/silver rates right now.
            </p>
            <button
              type="button"
              onClick={handleRetryRates}
              className="mt-2 text-sm font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700"
            >
              Retry
            </button>
          </div>
        ) : (
          <button
            type="submit"
            disabled={isDisabled}
            className="mt-6 w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isLoadingRates ? "Loading current rates..." : "Calculate Zakat"}
          </button>
        )}
      </form>

      {result && (
        <div className="mt-8 rounded-xl bg-gradient-to-br from-primary-50 via-primary-50 to-primary-100/60 p-6 text-center">
          <p className="text-sm font-medium text-gray-500">
            Nisab threshold ({result.nisabStandard === "silver" ? "silver" : "gold"}
            , {result.nisabThresholdGrams}g)
          </p>
          <p className="mt-1 text-lg font-semibold text-gray-700">
            {formatPkr(result.nisabThresholdPkr)} PKR
          </p>

          <div className="mt-6">
            {result.isZakatDue ? (
              <>
                <p className="text-sm font-medium text-gray-500">
                  Zakat is due
                </p>
                <div className="mt-1 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
                  <span className="break-all text-3xl font-bold text-primary-600 sm:text-5xl">
                    {formatPkr(result.zakatAmount)}
                  </span>
                  <span className="text-base font-medium text-primary-600/70 sm:text-lg">
                    PKR
                  </span>
                </div>
              </>
            ) : (
              <p className="text-lg font-semibold text-gray-700">
                Zakat is not due - net zakatable wealth is below Nisab.
              </p>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Net zakatable wealth: {formatPkr(result.netZakatableWealth)} PKR
          </p>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-gray-400">
        This is a general estimate to help with calculation, not a religious
        ruling. If your assets are complex or you have specific questions,
        please consult a knowledgeable scholar.
      </p>
    </div>
  );
}
