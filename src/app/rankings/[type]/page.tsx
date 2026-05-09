import CountryCard from "@/components/CountryCard";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import Link from "next/link";
import countriesData from "@/data/countries.json";

const allCountries = countriesData;

type Props = {
  params: Promise<{ type: string }>;
};

export default async function RankingTypePage({ params }: Props) {
  const { type } = await params;
  const allData = allCountries;

  const rankingConfig: Record<string, { title: string; description: string; getValue: (c: any) => number; format: (v: number) => string }> = {
    "largest-countries": {
      title: "Largest Countries by Area",
      description: "The world's biggest countries by total land area",
      getValue: (c) => c.area || 0,
      format: (v) => `${v.toLocaleString()} km²`,
    },
    "most-populated": {
      title: "Most Populated Countries",
      description: "Countries ranked by total population",
      getValue: (c) => c.populationRaw || 0,
      format: (v) => v.toLocaleString(),
    },
    "smallest-countries": {
      title: "Smallest Countries by Area",
      description: "The world's smallest nations",
      getValue: (c) => c.area || 0,
      format: (v) => `${v.toLocaleString()} km²`,
    },
    "least-populated": {
      title: "Least Populated Countries",
      description: "Countries with the smallest populations",
      getValue: (c) => c.populationRaw || 0,
      format: (v) => v.toLocaleString(),
    },
  };

  const config = rankingConfig[type];
  if (!config) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Ranking not found</h1>
        <p className="text-gray-600 mt-4">The ranking type "{type}" does not exist.</p>
        <Link href="/rankings" className="text-blue-600 hover:underline mt-4 inline-block">Back to Rankings</Link>
      </main>
    );
  }

  const isAscending = type === "smallest-countries" || type === "least-populated";
  const sorted = [...allCountries]
    .filter((c: any) => c.area > 0 || type.includes("populated"))
    .sort((a: any, b: any) => {
      const diff = config.getValue(a) - config.getValue(b);
      return isAscending ? diff : -diff;
    })
    .slice(0, 50);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: config.title,
    description: config.description,
    itemListElement: sorted.map((c: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Country",
        name: c.name,
        url: `https://randomcountry.ziamuhammad.com/country/${c.code}`,
      },
    })),
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Rankings", href: "/rankings" },
    { label: config.title },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbBar items={breadcrumbItems} />

      <section className="animate-fade-in-down">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            {config.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{config.description}</p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sorted.map((country: any, i: number) => (
            <Link key={country.code} href={`/country/${country.code}`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:-translate-y-1 transition-all text-center group">
                <span className="text-xs font-bold text-gray-400 mb-2 block">#{i + 1}</span>
                <img src={country.flagUrl} alt={country.name} className="w-full h-14 object-cover rounded-lg shadow-sm mb-2 group-hover:scale-105 transition-transform" loading="lazy" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{country.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}