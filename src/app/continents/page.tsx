import BreadcrumbBar from "@/components/BreadcrumbBar";
import Link from "next/link";
import countriesData from "@/data/countries";

const allCountries = countriesData;

export const metadata = {
  title: "Continents - Explore Countries by Continent",
  description: "Explore all continents and their countries. Browse Asia, Europe, Africa, Americas, and Oceania.",
  openGraph: {
    title: "Explore Countries by Continent",
    description: "Browse the world by continent. Discover countries in Asia, Europe, Africa, the Americas, and Oceania.",
  },
  alternates: {
    canonical: "/continents",
  },
};

const CONTINENTS = [
  { name: "Asia", slug: "asia", emoji: "🌏", countries: 48, desc: "The largest continent with rich cultures and landscapes" },
  { name: "Europe", slug: "europe", emoji: "🌍", countries: 44, desc: "Historic cities, diverse cultures, and stunning architecture" },
  { name: "Africa", slug: "africa", emoji: "🌍", countries: 54, desc: "The cradle of civilization with incredible wildlife" },
  { name: "North America", slug: "north america", emoji: "🗺️", countries: 23, desc: "From Arctic tundra to tropical paradise" },
  { name: "South America", slug: "south america", emoji: "🌎", countries: 12, desc: "Ancient wonders and vibrant cultures" },
  { name: "Oceania", slug: "oceania", emoji: "🏝️", countries: 14, desc: "Pacific islands, Australia, and New Zealand" },
  { name: "Antarctica", slug: "antarctica", emoji: "❄️", countries: 0, desc: "The frozen frontier" },
];

export default async function ContinentsPage() {
  const countries = allCountries;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar items={[{ label: "Home", href: "/" }, { label: "Continents" }]} />

      <section className="animate-fade-in-down">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Explore by Continent 🌍
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover countries organized by continent. Click on any continent to explore its nations,
            geography, cultures, and travel destinations.{` `}
            {allCountries.length} countries across {CONTINENTS.length} continents.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CONTINENTS.map((continent) => (
            <Link href={`/continent/${continent.slug}`} key={continent.slug}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                <span className="text-5xl mb-3 block group-hover:scale-110 transition-transform">{continent.emoji}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{continent.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{continent.desc}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                    Explore {continent.countries} countries →
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs text-gray-500">
                    {continent.countries}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All Regions */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Subregions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Eastern Asia", "Southeastern Asia", "Southern Asia", "Western Asia",
              "Central Asia", "Northern Europe", "Southern Europe", "Eastern Europe",
              "Western Europe", "Caribbean", "Central America", "South America",
              "Northern Africa", "Western Africa", "Eastern Africa", "Southern Africa",
              "Melanesia", "Micronesia", "Polynesia",
            ].map((region) => {
              const count = allCountries.filter((c: any) => c.subregion === region).length;
              return (
                <Link key={region} href={`/continent/${region.toLowerCase()}`}>
                  <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{region}</span>
                    <span className="text-xs text-gray-400 block mt-1">{count} countries</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}