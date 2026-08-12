import ConverterPanel from "@/components/ConverterPanel";
import { weightCategory } from "@/features/converters/data/weight";

export const metadata = {
  title: "Weight Converter - Utility Platform",
};

export default function WeightConverterPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-10">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
        Weight Converter
      </h1>
      <div className="mt-8">
        <ConverterPanel category={weightCategory} />
      </div>
    </div>
  );
}
