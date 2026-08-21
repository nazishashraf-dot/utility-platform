import LoanCalculatorForm from "@/components/LoanCalculatorForm";

export const metadata = {
  title: "Loan / Installment Calculator (PKR) | Utility Platform",
  description:
    "Calculate your monthly installment for a PKR loan using reducing-balance or flat-rate interest, and see the effective annual rate a flat-rate plan really costs.",
};

export default function LoanCalculatorPage() {
  return (
    <div className="bg-gradient-to-b from-primary-50/50 via-white to-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10">
        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Loan / Installment Calculator
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Compare bank-style reducing-balance loans against flat-rate
          installment plans, and see the true annual cost behind a flat
          rate.
        </p>
        <div className="mt-8">
          <LoanCalculatorForm />
        </div>
      </div>
    </div>
  );
}
