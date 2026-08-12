import ConverterPanel from "@/components/ConverterPanel";
import ConverterPageShell from "@/components/ConverterPageShell";
import { weightCategory } from "@/features/converters/data/weight";

export const metadata = {
  title: "Weight Converter - kg, lb, grams, ounces | Utility Platform",
  description:
    "Instantly convert weight and mass between kilograms, pounds, grams, and ounces.",
};

export default function WeightConverterPage() {
  return (
    <ConverterPageShell title="Weight Converter">
      <ConverterPanel category={weightCategory} />
    </ConverterPageShell>
  );
}
