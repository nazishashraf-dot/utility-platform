import CurrencyConverterPanel from "@/components/CurrencyConverterPanel";
import ConverterPageShell from "@/components/ConverterPageShell";

export const metadata = {
  title: "Currency Converter - USD, EUR, GBP, and more | Utility Platform",
  description:
    "Convert between major world currencies using live, daily-updated exchange rates.",
};

export default function CurrencyConverterPage() {
  return (
    <ConverterPageShell title="Currency Converter">
      <CurrencyConverterPanel />
    </ConverterPageShell>
  );
}
