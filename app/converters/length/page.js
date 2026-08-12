import ConverterPanel from "@/components/ConverterPanel";
import ConverterPageShell from "@/components/ConverterPageShell";
import { lengthCategory } from "@/features/converters/data/length";

export const metadata = {
  title: "Length Converter - km, miles, meters, feet | Utility Platform",
  description:
    "Instantly convert length and distance between kilometers, miles, meters, feet, centimeters, inches, and yards.",
};

export default function LengthConverterPage() {
  return (
    <ConverterPageShell title="Length Converter">
      <ConverterPanel category={lengthCategory} />
    </ConverterPageShell>
  );
}
