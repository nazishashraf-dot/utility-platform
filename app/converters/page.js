import ToolCard from "@/components/ToolCard";
import { converterTools } from "@/features/converters/toolsList";

export const metadata = {
  title: "Converters - Currency, Length, Weight, and more | Utility Platform",
  description:
    "Fast, no-fuss unit converters: currency, length, weight, temperature, volume, time, and digital storage.",
};

export default function ConvertersPage() {
  return (
    <div className="bg-gradient-to-b from-primary-50/30 via-white to-white">
      <div className="mx-auto w-full max-w-5xl px-6 pt-16 pb-20 sm:px-10 sm:pt-24">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Converters
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Fast, no-fuss converters. No sign-up, no clutter.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {converterTools.map((tool) => (
            <ToolCard
              key={tool.href}
              name={tool.name}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
