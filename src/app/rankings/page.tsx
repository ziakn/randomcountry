import { getAllCountries } from "@/utils/getRandomCountry";
import CountryCard from "@/components/CountryCard";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import { ArrowRight, Earth, Users, MapPin, BarChart2, TrendingUp, Award, Clock } from "lucide-react";

export const metadata = {
  title: "Rankings - Top Countries by Various Categories",
  description: "Explore country rankings by population, area, popularity, and more. Discover where countries stand globally.",
  openGraph: {
    title: "Country Rankings",
    description: "Explore top countries ranked by population, area, and other categories.",
  },
  alternates: {
    canonical: "/rankings",
  },
};

export default async function RankingsPage() {
  const allCountries = getAllCountries();

  // Sort countries for various rankings
  const byPopulation = [...allCountries].sort((a, b) => (b.populationRaw || 0) - (a.populationRaw || 0));
  const byArea = [...allCountries].filter(c => c.area > 0).sort((a, b) => b.area - a.area);
  const alphabetical = [...allCountries].sort((a, b) => a.name.localeCompare(b.name));
  const byNameLength = [...allCountries].sort((a, b) => b.name.length - a.name.length);

  const rankings = [
    {
      id: "population",
      title: "Most Populated Countries",
      description: "Ranked by total population size",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      countries: byPopulation.slice(0, 20),
      getValue: (c: any) => c.populationRaw,
      formatValue: (v: number) => v.toLocaleString(),
    },
    {
      id: "area",
      title: "Largest Countries by Area",
      description: "Ranked by total land area in square kilometers",
      icon: <MapPin className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      countries: byArea.slice(0, 20),
      getValue: (c: any) => c.area,
      formatValue: (v: number) => `${v.toLocaleString()} km²`,
    },
    {
      id: "alphabetical",
      title: "Countries A to Z",
      description: "All countries in alphabetical order",
      icon: <BarChart2 className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      countries: alphabetical,
      getValue: () => 0,
      formatValue: () => "",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar items={[{ label: "Home", href: "/" }, { label: "Rankings" }]} />

      {/* Header */}
      <section className="text-center mb-12 animate-fade-in-down">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-full px-4 py-2 mb-6">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Global Rankings</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
          Country Rankings
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore how countries compare across different categories — from population and area to alphabetical listings.
        </p>
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        {[
          { label: "Total Countries", value: allCountries.length, icon: <Earth className="w-5 h-5" /> },
          { label: "Most Populated", value: byPopulation[0]?.name || "—", icon: <Users className="w-5 h-5" />, small: true },
          { label: "Largest by Area", value: byArea[0]?.name || "—", icon: <MapPin className="w-5 h-5" />, small: true },
          { label: "Longest Name", value: byNameLength[0]?.name || "—", icon: <Award className="w-5 h-5" />, small: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
            <div className="text-gray-400 w-6 h-6 mx-auto mb-2">{stat.icon}</div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`font-bold text-gray-900 dark:text-white ${stat.small ? "text-sm" : "text-lg"}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Ranking Sections */}
      {rankings.map((ranking, index) => (
        <section
          key={ranking.id}
          className="animate-fade-in"
          style={{ animationDelay: `${0.3 + index * 0.15}s` }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${ranking.color} rounded-2xl flex items-center justify-center text-white`}>
                {ranking.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{ranking.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{ranking.description}</p>
              </div>
            </div>
            <Link
              href={`/rankings/${ranking.id}`}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 font-medium inline-flex items-center gap-1"
            >
              View All {ranking.countries.length > 10 ? "→" : ""}
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">Country</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-500 dark:text-gray-400">
                      {ranking.id === "alphabetical" ? "Capital" : ranking.title.split(" ")[0]}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {ranking.countries.map((country: any, i: number) => (
                    <tr key={country.code} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                          i < 3
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/country/${country.code}`} className="flex items-center gap-3 group">
                          <img src={country.flagUrl} alt={country.name} className="w-8 h-5 rounded shadow-sm" loading="lazy" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {country.name}
                          </span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-600 dark:text-gray-300 font-medium">
                        {ranking.formatValue(ranking.getValue(country))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* Fun Rankings */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-3xl p-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Fun Country Facts & Records</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { emoji: "🕐", title: "Most Time Zones", value: "France (12 zones)" },
            { emoji: "🏔️", title: "Highest Point", value: "Nepal (Mount Everest)" },
            { emoji: "🏜️", title: "Lowest Point", value: "Israel (Dead Sea)" },
            { emoji: "🌊", title: "Longest Coastline", value: "Canada (202,080 km)" },
            { emoji: "🏝️", title: "Most Islands", value: "Sweden (267,570+)" },
            { emoji: "🚗", title: "Most Roads", value: "United States (6.8M km)" },
            { emoji: "🌡️", title: "Coldest Capital", value: "Mongolia (Ulaanbaatar)" },
            { emoji: "☀️", title: "Hottest Capital", value: "Djibouti" },
          ].map((fact, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-4">
              <span className="text-2xl">{fact.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{fact.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{fact.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Space */}
      <div className="ad-placeholder my-12 min-h-[100px]">
        📢 Ad Space - Rankings
      </div>
    </main>
  );
}