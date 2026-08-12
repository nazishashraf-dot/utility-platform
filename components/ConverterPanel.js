"use client";

import { useId, useMemo, useState } from "react";
import { convert } from "@/features/converters/engine/convert";
import { formatNumber } from "@/features/converters/engine/formatNumber";

export default function ConverterPanel({ category }) {
  const units = category.units;
  const valueInputId = useId();

  const [value, setValue] = useState("1");
  const [fromUnitId, setFromUnitId] = useState(units[0].id);
  const [toUnitId, setToUnitId] = useState(units[1]?.id ?? units[0].id);
  const [copied, setCopied] = useState(false);

  const { result, message } = useMemo(() => {
    const trimmed = value.trim();
    if (trimmed === "") {
      return { result: null, message: "Enter a value to convert." };
    }

    const parsed = Number(trimmed);
    if (!Number.isFinite(parsed)) {
      return { result: null, message: "Enter a valid number." };
    }

    try {
      return {
        result: convert(parsed, fromUnitId, toUnitId, units),
        message: null,
      };
    } catch {
      return { result: null, message: "Unable to convert this value." };
    }
  }, [value, fromUnitId, toUnitId, units]);

  const formattedResult = result === null ? null : formatNumber(result);
  const toUnitName = units.find((unit) => unit.id === toUnitId)?.name ?? "";

  function handleSwap() {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
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
          Value
        </label>
        <input
          id={valueInputId}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter a number"
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-lg text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>
          <select
            value={fromUnitId}
            onChange={(event) => setFromUnitId(event.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          aria-label="Swap units"
          className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-lg text-gray-600 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 sm:mx-0 sm:mb-1"
        >
          ↔
        </button>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            To
          </label>
          <select
            value={toUnitId}
            onChange={(event) => setToUnitId(event.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-primary-50 p-6 text-center">
        <p className="text-sm font-medium text-gray-500">Result</p>
        {formattedResult !== null ? (
          <div className="mt-1 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
            <span className="break-all text-3xl font-bold text-primary-600 sm:text-5xl">
              {formattedResult}
            </span>
            <span className="text-base font-medium text-primary-600/70 sm:text-lg">
              {toUnitName}
            </span>
          </div>
        ) : (
          <p className="mt-1 text-base text-gray-400">{message}</p>
        )}

        <button
          type="button"
          onClick={handleCopy}
          disabled={formattedResult === null}
          className="mt-4 rounded-lg border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-white"
        >
          {copied ? "Copied!" : "Copy Result"}
        </button>
      </div>
    </div>
  );
}
