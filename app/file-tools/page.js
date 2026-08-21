import ToolCard from "@/components/ToolCard";
import { fileTools } from "@/features/fileTools/toolsList";

export const metadata = {
  title: "File Tools - Image Compressor, and more | Utility Platform",
  description:
    "Client-side file tools that never upload your files anywhere: image compression, and more to come.",
};

export default function FileToolsPage() {
  return (
    <div className="bg-gradient-to-b from-primary-50/30 via-white to-white">
      <div className="mx-auto w-full max-w-5xl px-6 pt-16 pb-20 sm:px-10 sm:pt-24">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            File Tools
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Runs entirely in your browser. Your files are never uploaded
            anywhere.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fileTools.map((tool) => (
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
