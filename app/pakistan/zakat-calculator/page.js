import ZakatCalculatorForm from "@/components/ZakatCalculatorForm";

export const metadata = {
  title: "Zakat Calculator (PKR) | Utility Platform",
  description:
    "Estimate your Zakat in PKR based on cash, bank balances, gold, silver, business assets, and debts, using live gold/silver rates and your choice of gold or silver Nisab.",
};

export default function ZakatCalculatorPage() {
  return (
    <div className="bg-gradient-to-b from-primary-50/50 via-white to-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10">
        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Zakat Calculator
        </h1>
        <div className="mt-8">
          <ZakatCalculatorForm />
        </div>
      </div>
    </div>
  );
}
