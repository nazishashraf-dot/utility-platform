import ConverterPanel from "@/components/ConverterPanel";
import ConverterPageShell from "@/components/ConverterPageShell";
import { volumeCategory } from "@/features/converters/data/volume";

export const metadata = {
  title: "Volume Converter - liters, gallons, cups | Utility Platform",
  description:
    "Instantly convert volume between liters, milliliters, US gallons, US fluid ounces, and cups.",
};

export default function VolumeConverterPage() {
  return (
    <ConverterPageShell title="Volume Converter">
      <ConverterPanel category={volumeCategory} />
    </ConverterPageShell>
  );
}
