// Shared by every converter page so the faint background treatment and
// heading layout can't drift out of sync between pages.
export default function ConverterPageShell({ title, children }) {
  return (
    <div className="bg-gradient-to-b from-primary-50/50 via-white to-white">
      <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-10">
        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          {title}
        </h1>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
