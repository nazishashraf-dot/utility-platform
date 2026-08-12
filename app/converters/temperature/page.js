import ConverterPageShell from "@/components/ConverterPageShell";
import TemperatureConverter from "./TemperatureConverter";

export const metadata = {
  title: "Temperature Converter - Celsius, Fahrenheit, Kelvin | Utility Platform",
  description:
    "Instantly convert temperature between Celsius, Fahrenheit, and Kelvin.",
};

export default function TemperatureConverterPage() {
  return (
    <ConverterPageShell title="Temperature Converter">
      <TemperatureConverter />
    </ConverterPageShell>
  );
}
