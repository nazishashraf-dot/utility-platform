import ConverterPanel from "@/components/ConverterPanel";
import { digitalStorageCategory } from "@/features/converters/data/digital-storage";

export const metadata = {
  title: "Digital Storage Converter - Utility Platform",
};

export default function DigitalStorageConverterPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-10">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
        Digital Storage Converter
      </h1>
      <div className="mt-8">
        <ConverterPanel category={digitalStorageCategory} />
      </div>
    </div>
  );
}
