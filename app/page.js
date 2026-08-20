import ToolCard from "@/components/ToolCard";
import { converterTools } from "@/features/converters/toolsList";
import { pakistanHubLink } from "@/features/pakistan/toolsList";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-primary-50/30 via-white to-white">
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-300/30 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
          <div className="absolute top-4 -left-16 h-64 w-64 rounded-full bg-sky-300/25 blur-3xl sm:h-80 sm:w-80" />
          <div className="absolute -top-12 -right-16 h-64 w-64 rounded-full bg-purple-300/25 blur-3xl sm:h-80 sm:w-80" />
        </div>

        <div className="mx-auto w-full max-w-5xl px-6 pt-16 pb-20 text-center sm:px-10 sm:pt-24">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            One click. Every conversion you&apos;ll ever need.
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Fast, no-fuss converters. No sign-up, no clutter.
          </p>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block h-10 w-full text-primary-500 sm:h-16"
        >
          <path
            fill="currentColor"
            fillOpacity="0.12"
            d="M0,32 C240,72 480,0 720,24 C960,48 1200,8 1440,40 L1440,80 L0,80 Z"
          />
        </svg>
      </section>

      <div className="mx-auto w-full max-w-5xl px-6 pb-16 sm:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {converterTools.map((tool) => (
            <ToolCard
              key={tool.href}
              name={tool.name}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
            />
          ))}
          <ToolCard
            name={pakistanHubLink.name}
            description={pakistanHubLink.description}
            href={pakistanHubLink.href}
            icon={pakistanHubLink.icon}
          />
        </div>
      </div>
    </div>
  );
}
