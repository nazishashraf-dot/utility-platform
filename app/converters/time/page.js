import ConverterPanel from "@/components/ConverterPanel";
import { timeCategory } from "@/features/converters/data/time";

export const metadata = {
  title: "Time Converter - Utility Platform",
};

export default function TimeConverterPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-10">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
        Time Converter
      </h1>
      <div className="mt-8">
        <ConverterPanel category={timeCategory} />
      </div>
    </div>
  );
}
