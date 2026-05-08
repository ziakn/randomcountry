import Link from "next/link";
import BreadcrumbBar from "@/components/BreadcrumbBar";

export const metadata = {
  title: "Richest Countries in the World by GDP | Random Country Generator",
  description: "Which nations have the strongest economies? Explore global wealth rankings, GDP per capita, and economic powerhouses.",
  openGraph: {
    title: "Richest Countries in the World by GDP",
    description: "Global wealth rankings and economic powerhouses ranked by GDP and GDP per capita.",
  },
  alternates: {
    canonical: "/blog/richest-countries",
  },
};

export default function BlogPost() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Richest Countries" },
        ]}
      />

      <article className="animate-fade-in-down">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Richest Countries in the World
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <time>February 15, 2024</time>
            <span>•</span>
            <span>6 min read</span>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1 w-20 rounded-full" />
        </header>

        <div className="prose lg:prose-lg max-w-none dark:prose-invert">
          <p>
            Economic strength is measured in many ways — total GDP, GDP per capita, purchasing power parity,
            and quality of life. Here we explore the world's richest countries by various metrics.
          </p>

          <h2>Top 10 Countries by GDP (Nominal)</h2>

          {[
            { name: "United States", gdp: "$25.5T", emoji: "🇺🇸" },
            { name: "China", gdp: "$18.3T", emoji: "🇨🇳" },
            { name: "Japan", gdp: "$4.2T", emoji: "🇯🇵" },
            { name: "Germany", gdp: "$4.1T", emoji: "🇩🇪" },
            { name: "India", gdp: "$3.5T", emoji: "🇮🇳" },
            { name: "United Kingdom", gdp: "$3.3T", emoji: "🇬🇧" },
            { name: "France", gdp: "$3.0T", emoji: "🇫🇷" },
            { name: "Italy", gdp: "$2.2T", emoji: "🇮🇹" },
            { name: "Canada", gdp: "$2.1T", emoji: "🇨🇦" },
            { name: "Brazil", gdp: "$2.1T", emoji: "🇧🇷" },
          ].map((country, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <span className="font-bold text-gray-700 dark:text-gray-300 w-8">{i + 1}.</span>
              <span className="text-2xl">{country.emoji}</span>
              <span className="flex-1 font-semibold text-gray-900 dark:text-white">{country.name}</span>
              <span className="text-gray-600 dark:text-gray-400 font-mono">{country.gdp}</span>
            </div>
          ))}

          <h2>Richest by GDP Per Capita</h2>
          <p>
            When measured by GDP per capita, the rankings shift dramatically. Small, wealthy nations like
            Luxembourg, Switzerland, and Norway top the list, reflecting their high standard of living
            and small populations.
          </p>
          <ul>
            <li><strong>Luxembourg</strong> — Europe's wealthiest nation per capita, a major financial center.</li>
            <li><strong>Switzerland</strong> — Renowned for banking, pharmaceuticals, and precision manufacturing.</li>
            <li><strong>Norway</strong> — Oil wealth combined with strong social systems creates extreme prosperity.</li>
            <li><strong>Ireland</strong> — A tech hub attracting major multinational corporations.</li>
            <li><strong>Qatar</strong> — Natural gas wealth has made Qatar one of the richest globally.</li>
            <li><strong>Singapore</strong> — A global financial center with remarkably high GDP per capita.</li>
          </ul>

          <h2>Emerging Economic Powers</h2>
          <p>
            Several nations are experiencing rapid economic growth that may reshape global wealth rankings in
            the coming decades. India, with its massive population and growing tech sector, is projected to
            become the world's third-largest economy by 2030. Vietnam, Indonesia, and Bangladesh are also
            among the fastest-growing economies.
          </p>

          <blockquote>
            Wealth is more than just numbers on a balance sheet. True prosperity encompasses quality of life,
            healthcare, education, and the well-being of all citizens.
          </blockquote>
        </div>
      </article>
    </main>
  );
}