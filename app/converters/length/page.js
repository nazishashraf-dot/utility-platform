import ConverterPanel from "@/components/ConverterPanel";
import { lengthCategory } from "@/features/converters/data/length";

export const metadata = {
  title: "Length Converter - km, miles, meters, feet | Utility Platform",
  description:
    "Instantly convert length and distance between kilometers, miles, meters, feet, centimeters, inches, and yards.",
};

export default function LengthConverterPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-10">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
        Length Converter
      </h1>
      <div className="mt-8">
        <ConverterPanel category={lengthCategory} />
      </div>
    </div>
  );
}
