import TemperatureConverter from "./TemperatureConverter";

export const metadata = {
  title: "Temperature Converter - Utility Platform",
};

export default function TemperatureConverterPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-10">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
        Temperature Converter
      </h1>
      <div className="mt-8">
        <TemperatureConverter />
      </div>
    </div>
  );
}
