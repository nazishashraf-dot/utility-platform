"use client";

import { useId, useState } from "react";
import {
  calculateFlatRate,
  calculateReducingBalance,
} from "@/features/calculators/loan/calculate";

function formatPkr(amount) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatPercent(value) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 2,
  }).format(value);
}

function parseAmount(value) {
  const parsed = Number(value.trim());
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

const inputClassName =
  "mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200";

const METHODS = [
  {
    key: "reducing",
    label: "Reducing Balance (Bank Loan)",
  },
  {
    key: "flat",
    label: "Flat Rate (Installment Plan)",
  },
];

export default function LoanCalculatorForm() {
  const formId = useId();

  const [principal, setPrincipal] = useState("");
  const [ratePercent, setRatePercent] = useState("");
  const [months, setMonths] = useState("");
  const [method, setMethod] = useState("reducing");
  const [result, setResult] = useState(null);

  function handleCalculate(event) {
    event.preventDefault();

    const parsedPrincipal = parseAmount(principal);
    const parsedRate = parseAmount(ratePercent);
    const parsedMonths = Math.max(1, Math.round(parseAmount(months)));

    const calculation =
      method === "flat"
        ? calculateFlatRate(parsedPrincipal, parsedRate, parsedMonths)
        : calculateReducingBalance(parsedPrincipal, parsedRate, parsedMonths);

    setResult({
      method,
      statedRatePercent: parsedRate,
      months: parsedMonths,
      ...calculation,
    });
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor={`${formId}-principal`}
              className="block text-sm font-medium text-gray-700"
            >
              Loan amount (PKR)
            </label>
            <input
              id={`${formId}-principal`}
              type="text"
              inputMode="decimal"
              value={principal}
              onChange={(event) => setPrincipal(event.target.value)}
              placeholder="0"
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-rate`}
              className="block text-sm font-medium text-gray-700"
            >
              Annual interest rate (%)
            </label>
            <input
              id={`${formId}-rate`}
              type="text"
              inputMode="decimal"
              value={ratePercent}
              onChange={(event) => setRatePercent(event.target.value)}
              placeholder="0"
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-months`}
              className="block text-sm font-medium text-gray-700"
            >
              Loan term (months)
            </label>
            <input
              id={`${formId}-months`}
              type="text"
              inputMode="decimal"
              value={months}
              onChange={(event) => setMonths(event.target.value)}
              placeholder="0"
              className={inputClassName}
            />
          </div>
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-gray-700">
            Interest method
          </legend>
          <p className="mt-1 text-xs text-gray-400">
            Reducing balance charges interest only on what you still owe, so
            it shrinks each month. Flat rate charges interest on the full
            original amount for the whole term, so it costs more than its
            stated rate suggests.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-4">
            {METHODS.map((option) => (
              <label
                key={option.key}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="radio"
                  name={`${formId}-method`}
                  value={option.key}
                  checked={method === option.key}
                  onChange={() => setMethod(option.key)}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-200"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Calculate Installment
        </button>
      </form>

      {result && (
        <div className="mt-8 rounded-xl bg-gradient-to-br from-primary-50 via-primary-50 to-primary-100/60 p-6 text-center">
          <p className="text-sm font-medium text-gray-500">
            Monthly installment
          </p>
          <div className="mt-1 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
            <span className="break-all text-3xl font-bold text-primary-600 sm:text-5xl">
              {formatPkr(result.monthlyInstallment)}
            </span>
            <span className="text-base font-medium text-primary-600/70 sm:text-lg">
              PKR
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total amount payable
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-700">
                {formatPkr(result.totalPayment)} PKR
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total interest
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-700">
                {formatPkr(result.totalInterest)} PKR
              </p>
            </div>
          </div>

          {result.method === "flat" && (
            <div className="mt-6 rounded-lg border border-primary-200 bg-white/60 p-4 text-left">
              <p className="text-sm text-gray-700">
                A flat rate of{" "}
                <span className="font-semibold">
                  {formatPercent(result.statedRatePercent)}%
                </span>{" "}
                actually costs about the same as a reducing-balance loan at{" "}
                <span className="font-semibold text-primary-600">
                  {formatPercent(result.effectiveAnnualRatePercent)}%
                </span>{" "}
                effective annual rate - because interest keeps being charged
                on the original amount even as you pay it down.
              </p>
            </div>
          )}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-gray-400">
        This is a general estimate for planning purposes, based on the
        standard EMI (reducing balance) and flat-rate formulas. Actual bank
        or lender terms, fees, and rounding may differ - check with your
        lender for exact figures.
      </p>
    </div>
  );
}
