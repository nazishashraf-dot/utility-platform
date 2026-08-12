import Link from "next/link";
import { converterTools } from "@/features/converters/toolsList";

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-10">
      <Link
        href="/"
        className="text-xl font-semibold tracking-tight text-primary-600"
      >
        Utility Platform
      </Link>

      <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {converterTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
          >
            {tool.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
