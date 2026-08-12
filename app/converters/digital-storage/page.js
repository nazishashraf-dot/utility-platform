import ConverterPanel from "@/components/ConverterPanel";
import ConverterPageShell from "@/components/ConverterPageShell";
import { digitalStorageCategory } from "@/features/converters/data/digital-storage";

export const metadata = {
  title: "Digital Storage Converter - bytes, KB, MB, GB | Utility Platform",
  description:
    "Instantly convert digital storage between bytes, kilobytes, megabytes, gigabytes, and terabytes using the standard 1024-based convention.",
};

export default function DigitalStorageConverterPage() {
  return (
    <ConverterPageShell title="Digital Storage Converter">
      <ConverterPanel category={digitalStorageCategory} />
    </ConverterPageShell>
  );
}
