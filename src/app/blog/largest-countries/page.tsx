import Link from "next/link";
import BreadcrumbBar from "@/components/BreadcrumbBar";

export const metadata = {
  title: "Largest Countries in the World by Area | Random Country Generator",
  description: "From Russia to Vatican City, explore the world's biggest and smallest nations ranked by total land area.",
  openGraph: {
    title: "Largest Countries in the World by Area",
    description: "Discover which countries cover the most land area on Earth. From Russia's vast tundras to tiny city-states.",
  },
  alternates: {
    canonical: "/blog/largest-countries",
  },
};

export default function BlogPost() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Largest Countries" },
        ]}
      />

      <article className="animate-fade-in-down">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Largest Countries in the World by Area
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <time>February 1, 2024</time>
            <span>•</span>
            <span>5 min read</span>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1 w-20 rounded-full" />
        </header>

        <div className="prose lg:prose-lg max-w-none dark:prose-invert">
          <p>
            Earth is home to 195 recognized countries, varying enormously in size. Russia alone covers more
            than 17 million square kilometers, while Vatican City fits within a single city block. Let's
            explore the largest countries in the world by total land area.
          </p>

          <h2>The Top 10 Largest Countries by Area</h2>

          {[
            { name: "Russia", area: "17.1M km²", emoji: "🇷🇺" },
            { name: "Canada", area: "10.0M km²", emoji: "🇨🇦" },
            { name: "United States", area: "9.8M km²", emoji: "🇺🇸" },
            { name: "China", area: "9.6M km²", emoji: "🇨🇳" },
            { name: "Brazil", area: "8.5M km²", emoji: "🇧🇷" },
            { name: "Australia", area: "7.7M km²", emoji: "🇦🇺" },
            { name: "India", area: "3.3M km²", emoji: "🇮🇳" },
            { name: "Argentina", area: "2.8M km²", emoji: "🇦🇷" },
            { name: "Kazakhstan", area: "2.7M km²", emoji: "🇰🇿" },
            { name: "Algeria", area: "2.4M km²", emoji: "🇩🇿" },
          ].map((country, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <span className="font-bold text-gray-700 dark:text-gray-300 w-8">{i + 1}.</span>
              <span className="text-2xl">{country.emoji}</span>
              <span className="flex-1 font-semibold text-gray-900 dark:text-white">{country.name}</span>
              <span className="text-gray-600 dark:text-gray-400">{country.area}</span>
            </div>
          ))}

          <h2>Interesting Facts About Large Countries</h2>
          <ul>
            <li><strong>Russia</strong> spans 11 time zones and covers more area than Pluto's surface.</li>
            <li><strong>Canada</strong> has more lakes than the rest of the world's lakes combined.</li>
            <li><strong>China</strong> and <strong>the United States</strong> are nearly the same size, depending on measurement methods.</li>
            <li><strong>Brazil</strong> is the largest country in the Southern Hemisphere.</li>
            <li><strong>Australia</strong> is the only country that is also a continent.</li>
            <li><strong>Kazakhstan</strong> is the largest landlocked country in the world.</li>
          </ul>

          <h2>Smallest Countries in the World</h2>
          <p>
            At the other end of the spectrum, some of the world's smallest countries by area include Vatican
            City (0.44 km²), Monaco (2.02 km²), San Marino (61 km²), Liechtenstein (160 km²), and
            Tuvalu (26 km²). Despite their tiny size, many of these nations have rich histories and
            unique cultural identities.
          </p>

          <blockquote>
            Size doesn't determine a country's significance. Many of the world's smallest nations are among
            the wealthiest, most densely populated, and culturally richest places on Earth.
          </blockquote>
        </div>
      </article>
    </main>
  );
}