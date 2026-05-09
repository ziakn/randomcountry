import CountryCard from "@/components/CountryCard";
import GoogleMap from "@/components/GoogleMap";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import Link from "next/link";
import countriesData from "@/data/countries";

const allCountries = countriesData;

export const metadata = {
  title: "All Countries - A to Z List",
  description: "Browse all 195+ countries in the world. Find detailed information about any country by clicking on it.",
  openGraph: {
    title: "All Countries - A to Z List",
    description: "Browse the complete list of all countries in the world.",
  },
  alternates: {
    canonical: "/countries",
  },
};

export default async function CountriesPage() {
  const allCountries = countriesData;

  const grouped: Record<string, any[]> = {};
  allCountries.forEach((c: any) => {
    const letter = c.name[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(c);
  });

  const letters = Object.keys(grouped).sort();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar items={[{ label: "Home", href: "/" }, { label: "All Countries" }]} />

      <section className="animate-fade-in-down">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            All Countries A to Z 🌍
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse all {allCountries.length} countries in the world. Click on any country to explore its profile,
            geography, culture, and travel information.
          </p>
        </header>

        {/* Quick filter by region */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {["all", "asia", "europe", "africa", "americas", "oceania"].map((region) => (
            <Link key={region} href={region === "all" ? "/countries" : `/continent/${region}`}>
              <span className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                region === "all"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-500"
              }`}>
                {region === "all" ? "All Countries" : region.charAt(0).toUpperCase() + region.slice(1)}
              </span>
            </Link>
          ))}
        </div>

        {/* Alphabetical list */}
        <div className="space-y-8">
          {letters.map((letter) => (
            <div key={letter}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sticky top-0 bg-gray-50 dark:bg-gray-900 py-2 z-10 border-b border-gray-200 dark:border-gray-700">
                {letter}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {grouped[letter]
                  .sort((a: any, b: any) => a.name.length - b.name.length)
                  .map((country: any) => (
                    <CountryCard key={country.code} country={country} variant="compact" />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}