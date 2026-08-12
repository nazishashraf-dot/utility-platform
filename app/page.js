import ToolCard from "@/components/ToolCard";
import { converterTools } from "@/features/converters/toolsList";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Simple tools for everyday tasks
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
          />
        ))}
      </div>
    </div>
  );
}
