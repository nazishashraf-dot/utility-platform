import Link from "next/link";

export default function ToolCard({ name, description, href, icon: Icon }) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-primary-50/40 p-6 shadow-md shadow-gray-200/50 transition-all duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl"
    >
      {Icon && (
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-200 group-hover:bg-primary-100">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <h2 className="mt-4 text-lg font-semibold text-gray-900">{name}</h2>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </Link>
  );
}
