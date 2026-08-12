import CurrencyConverterPanel from "@/components/CurrencyConverterPanel";

export const metadata = {
  title: "Currency Converter - USD, EUR, GBP, and more | Utility Platform",
  description:
    "Convert between major world currencies using live, daily-updated exchange rates.",
};

export default function CurrencyConverterPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-10">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
        Currency Converter
      </h1>
      <div className="mt-8">
        <CurrencyConverterPanel />
      </div>
    </div>
  );
}
