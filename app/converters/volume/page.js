import ConverterPanel from "@/components/ConverterPanel";
import { volumeCategory } from "@/features/converters/data/volume";

export const metadata = {
  title: "Volume Converter - liters, gallons, cups | Utility Platform",
  description:
    "Instantly convert volume between liters, milliliters, US gallons, US fluid ounces, and cups.",
};

export default function VolumeConverterPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-10">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
        Volume Converter
      </h1>
      <div className="mt-8">
        <ConverterPanel category={volumeCategory} />
      </div>
    </div>
  );
}
