"use client";

import { useState, useEffect } from "react";
import { Sparkles, History, Clock, Heart, Target } from "lucide-react";
import dynamic from "next/dynamic";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import "@/utils/getRandomCountry";

const GeneratorHistory = dynamic(() => import("@/components/GeneratorHistory"), { ssr: false });
const CountryCard = dynamic(() => import("@/components/CountryCard"));
const GenerateButton = dynamic(() => import("@/components/GenerateButton"));

// Fetch country data
import countriesData from "@/data/countries";

const getAllCountries = () => countriesData;
const getRandomCountry = (excludeCode?: string) => {
  const all = countriesData;
  let idx = Math.floor(Math.random() * all.length);
  let c = all[idx];
  while (excludeCode && c.code === excludeCode.toLowerCase()) {
    idx = Math.floor(Math.random() * all.length);
    c = all[idx];
  }
  return c;
};

const FEATURED_COUNTRIES = [
  { code: "jp", name: "Japan" },
  { code: "it", name: "Italy" },
  { code: "us", name: "United States" },
  { code: "fr", name: "France" },
  { code: "br", name: "Brazil" },
  { code: "au", name: "Australia" },
];

export default function RandomGeneratorPage() {
  const [country, setCountry] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const allCountries = getAllCountries();

  useEffect(() => {
    setCountry(getRandomCountry());
    setMounted(true);
    try {
      const saved = localStorage.getItem("favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  const handleGenerate = () => {
    setIsLoading(true);
    const newCountry = getRandomCountry(country?.code);
    setCountry(newCountry);

    // Add to history
    const entry = { code: newCountry.code, name: newCountry.name, timestamp: Date.now() };
    const history = JSON.parse(localStorage.getItem("country_history") || "[]");
    const newHistory = [entry, ...history.filter((h: any) => h.code !== newCountry.code)].slice(0, 100);
    localStorage.setItem("country_history", JSON.stringify(newHistory));
  };

  const handleFavorite = () => {
    if (!country) return;
    const newFav = favorites.find((f) => f.code === country.code);
    let newFavorites;
    if (newFav) {
      newFavorites = favorites.filter((f) => f.code !== country.code);
    } else {
      newFavorites = [
        ...favorites,
        { code: country.code, name: country.name },
      ];
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const handleCopy = () => {
    if (!country) return;
    const text = `${country.name} - Capital: ${country.capital}\nPopulation: ${country.population}\nCurrency: ${country.currency}\nRegion: ${country.region}`;
    navigator.clipboard.writeText(text);
  };

  const handleShare = () => {
    if (!country) return;
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/country/${country.code}`;
    if (navigator.share) {
      navigator.share({ title: `Discover ${country.name}`, url });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  if (!mounted || !country) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-600">Loading generator...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar items={[{ label: "Home", href: "/" }, { label: "Random Generator" }]} />

      {/* Generator Section */}
      <section className="text-center mb-12 animate-fade-in-down">
        <div className="inline-flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-full px-4 py-2 mb-6">
          <Target className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instant Random Country Generator</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
          Discover a <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Random Country</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Click the button below to explore a random country from our database of {allCountries.length} nations. Learn about different cultures, geographies, and histories with each click!
        </p>

        {/* Globe Preview */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-180,-60,180,85&amp;layer=mapnik"
                className="w-full h-full"
                style={{ border: 0 }}
                title="World Map"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Generate Button & Result */}
      <section className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 md:p-12 shadow-sm mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="flex justify-center mb-10">
          <GenerateButton onClick={handleGenerate} isLoading={isLoading} />
        </div>

        {country && (
          <div className="animate-fade-in">
            <CountryCard country={country} onCopy={handleCopy} onShare={handleShare} onFavorite={handleFavorite} isFavorited={favorites.some(f => f.code === country.code)} showActions />
          </div>
        )}
      </section>

      {/* Featured Explore Section */}
      <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          Featured Countries to Explore
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {FEATURED_COUNTRIES.map((c) => {
            const country = getRandomCountry(c.code);
            return country ? (
              <a
                key={c.code}
                href={`/country/${c.code}`}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:-translate-y-1 transition-all text-center group cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  const newCountry = getRandomCountry(c.code);
                  setCountry(newCountry);
                  const entry = { code: newCountry.code, name: newCountry.name, timestamp: Date.now() };
                  const history = JSON.parse(localStorage.getItem("country_history") || "[]");
                  const newHistory = [entry, ...history.filter((h: any) => h.code !== newCountry.code)].slice(0, 100);
                  localStorage.setItem("country_history", JSON.stringify(newHistory));
                }}
              >
                <img src={country.flagUrl} alt={country.name} className="w-full h-14 object-cover rounded-lg shadow-sm mb-3" loading="lazy" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">{c.name}</p>
              </a>
            ) : null;
          })}
        </div>
      </section>

      {/* History & Favorites */}
      <GeneratorHistory />

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-3xl p-8 md:p-12 mb-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          How the Generator Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🎲", title: "Random Selection", desc: "Each click picks a truly random country from our database of 195+ nations using a cryptographically secure random number generator." },
            { icon: "📊", title: "Rich Data", desc: "Every result includes detailed information: capital, population, currency, language, region, and geographic coordinates." },
            { icon: "💾", title: "Save & Share", desc: "Favorite countries to revisit later, copy details to clipboard, or share discoveries with friends via social media." },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl mb-3">{item.icon}</p>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}