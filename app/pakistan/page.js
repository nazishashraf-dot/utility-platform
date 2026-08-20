import ToolCard from "@/components/ToolCard";
import { pakistanTools } from "@/features/pakistan/toolsList";

export const metadata = {
  title: "Pakistan Tools - Gold & Silver Rates, and more | Utility Platform",
  description:
    "Pakistan-specific tools: live gold and silver rates per tola in PKR, with more tools on the way.",
};

export default function PakistanToolsPage() {
  return (
    <div className="bg-gradient-to-b from-primary-50/30 via-white to-white">
      <div className="mx-auto w-full max-w-5xl px-6 pt-16 pb-20 sm:px-10 sm:pt-24">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Tools for Pakistan
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Local rates and calculators, built for Pakistan.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pakistanTools.map((tool) => (
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
