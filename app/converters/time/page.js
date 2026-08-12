import ConverterPanel from "@/components/ConverterPanel";
import ConverterPageShell from "@/components/ConverterPageShell";
import { timeCategory } from "@/features/converters/data/time";

export const metadata = {
  title: "Time Converter - seconds, minutes, hours, days | Utility Platform",
  description:
    "Instantly convert time between seconds, minutes, hours, days, and weeks.",
};

export default function TimeConverterPage() {
  return (
    <ConverterPageShell title="Time Converter">
      <ConverterPanel category={timeCategory} />
    </ConverterPageShell>
  );
}
