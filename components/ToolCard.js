import Link from "next/link";

export default function ToolCard({ name, description, href }) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-gray-100 bg-white p-6 shadow-md shadow-gray-200/50 transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg"
    >
      <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </Link>
  );
}
