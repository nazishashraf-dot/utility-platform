import GoldSilverRatesPanel from "@/components/GoldSilverRatesPanel";

export const metadata = {
  title: "Gold & Silver Rates in Pakistan (PKR per Tola) | Utility Platform",
  description:
    "Live gold (24K, 22K) and silver rates per tola in Pakistani Rupees, calculated from international spot prices.",
};

export default function GoldSilverRatesPage() {
  return (
    <div className="bg-gradient-to-b from-primary-50/50 via-white to-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10">
        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Gold &amp; Silver Rates
        </h1>
        <div className="mt-8">
          <GoldSilverRatesPanel />
        </div>
      </div>
    </div>
  );
}
