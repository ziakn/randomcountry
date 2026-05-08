"use client";

import { useState, useEffect, useCallback } from "react";
import { Sparkles, ArrowRight, TrendingUp, Globe2, Compass, Layers, Brain, BookOpen, BarChart2, Eye, ThumbsUp } from "lucide-react";
import CountryCard from "../components/CountryCard";
import GenerateButton from "../components/GenerateButton";
import { getRandomCountry, getAllCountries } from "../utils/getRandomCountry";
import dynamic from "next/dynamic";

const GlobeMap = dynamic(() => import("../components/GlobeMap"), { ssr: false, loading: () => <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-700 rounded-2xl animate-pulse" /> });

const POPULAR_COUNTRIES = [
  { code: "jp", name: "Japan" },
  { code: "us", name: "United States" },
  { code: "it", name: "Italy" },
  { code: "pk", name: "Pakistan" },
  { code: "ca", name: "Canada" },
  { code: "au", name: "Australia" },
  { code: "fr", name: "France" },
  { code: "de", name: "Germany" },
  { code: "br", name: "Brazil" },
  { code: "in", name: "India" },
  { code: "mx", name: "Mexico" },
  { code: "th", name: "Thailand" },
];

const CONTINENTS = [
  { name: "Asia", icon: "🌏", countries: 48, description: "The largest and most diverse continent" },
  { name: "Europe", icon: "🌍", countries: 44, description: "A tapestry of cultures and history" },
  { name: "Africa", icon: "🌍", countries: 54, description: "The cradle of civilization" },
  { name: "North America", icon: "🗺️", countries: 23, description: "From Arctic tundra to tropical beaches" },
  { name: "South America", icon: "🌎", countries: 12, description: "Land of ancient wonders and vibrant cultures" },
  { name: "Oceania", icon: "🏝️", countries: 14, description: "Islands of paradise in the Pacific" },
];

const TRENDING_NOW = ["Japan", "Italy", "Switzerland", "Norway", "South Korea", "Thailand", "UAE", "Portugal", "New Zealand"];

export default function Home() {
  const [country, setCountry] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [spinGlobe, setSpinGlobe] = useState(false);
  const [currentGlobeCountry, setCurrentGlobeCountry] = useState(0);
  const allCountries = getAllCountries();

  useEffect(() => {
    setCountry(getRandomCountry());
    setMounted(true);
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
    const hist = localStorage.getItem("country_history");
    if (hist) setHistory(JSON.parse(hist));
  }, []);

  const handleGenerate = useCallback(() => {
    let newCountry = getRandomCountry(country?.code);
    setCountry(newCountry);
    setSpinGlobe(true);

    // Add to history
    const entry = { code: newCountry.code, name: newCountry.name, timestamp: Date.now() };
    const newHistory = [entry, ...history.filter((h: any) => h.code !== newCountry.code)].slice(0, 50);
    setHistory(newHistory);
    localStorage.setItem("country_history", JSON.stringify(newHistory));

    setTimeout(() => setSpinGlobe(false), 2000);
  }, [country, history]);

  useEffect(() => {
    if (mounted) {
      const interval = setInterval(() => {
        setCurrentGlobeCountry((prev) => (prev + 1) % allCountries.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [mounted, allCountries.length]);

  const handleCopy = () => {
    if (country) {
      const text = `${country.name} - Capital: ${country.capital}, Population: ${country.population}, Currency: ${country.currency}`;
      navigator.clipboard.writeText(text);
    }
  };

  const handleShare = () => {
    if (country) {
      const url = `${typeof window !== "undefined" ? window.location.origin : ""}/country/${country.code}`;
      if (navigator.share) {
        navigator.share({ title: `Discover ${country.name}`, url });
      } else {
        navigator.clipboard.writeText(url);
      }
    }
  };

  const handleFavorite = () => {
    if (country) {
      const newFavorites = favorites.includes(country.code)
        ? favorites.filter((c: string) => c !== country.code)
        : [...favorites, country.code];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  const handlePopularClick = (code: string) => {
    const c = getRandomCountry(code);
    setCountry(c);
    const entry = { code: c.code, name: c.name, timestamp: Date.now() };
    const newHistory = [entry, ...history.filter((h: any) => h.code !== c.code)].slice(0, 50);
    setHistory(newHistory);
    localStorage.setItem("country_history", JSON.stringify(newHistory));
  };

  if (!mounted || !country) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Discovering the world...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 text-white pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="absolute inset-0 opacity-10">
          <GlobeMap size={600} interactive={false} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-down">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>🌍 Trusted by 100K+ geography enthusiasts worldwide</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              Explore the World
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">One Country at a Time</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 font-light leading-relaxed">
              Discover fascinating countries from every corner of the globe. Click to explore capitals, cultures, cuisines, and hidden gems.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Globe2 className="w-6 h-6 text-blue-400" />
              </div>
              <input
                type="text"
                placeholder="Search any country..."
                className="w-full pl-12 pr-6 py-5 rounded-2xl text-lg text-gray-900 placeholder-gray-400 bg-white/95 backdrop-blur-sm shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = (e.target as HTMLInputElement).value;
                    if (val) window.location.href = `/country/${val.toLowerCase().replace(/\s+/g, "-")}`;
                  }
                }}
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {[
              { icon: <Globe2 />, label: "Countries", value: "195+" },
              { icon: <TrendingUp />, label: "Generated", value: "1M+" },
              { icon: <Eye />, label: "Monthly Visitors", value: "500K+" },
              { icon: <ThumbsUp />, label: "User Rating", value: "4.9/5" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm mb-2">{stat.icon}</div>
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-sm text-blue-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L48 52C96 44 192 28 288 32C384 36 480 60 576 68C672 76 768 68 864 52C960 36 1056 12 1152 8C1248 4 1344 12 1392 16L1440 20V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1 relative z-10">
        {/* Generate Section */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-12 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mb-4 animate-pulse-slow">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Random Country Generator
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              One click takes you on a journey to a random destination. Discover countries you never knew existed!
            </p>
          </div>

          {/* Globe Animation */}
          <div className="flex justify-center mb-8">
            <div
              className={`transition-all duration-1000 ${spinGlobe ? "animate-spin" : ""}`}
              onClick={() => setSpinGlobe(!spinGlobe)}
            >
              <GlobeMap coordinates={country.coordinates} size={200} />
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <GenerateButton onClick={handleGenerate} />
          </div>

          {/* Result Card */}
          {country && (
            <div className="animate-fade-in-up">
              <CountryCard country={country} onCopy={handleCopy} onShare={handleShare} onFavorite={handleFavorite} isFavorited={favorites.includes(country.code)} />
            </div>
          )}
        </section>

        {/* Popular Countries */}
        <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Popular Countries 🌟</h2>
              <p className="text-gray-600 dark:text-gray-400">Explore the most popular destinations around the world</p>
            </div>
            <Link href="/country/japan" className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 font-medium inline-flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {POPULAR_COUNTRIES.map((c) => {
              const country = getRandomCountry(c.code);
              return country ? (
                <Link
                  key={c.code}
                  href={`/country/${c.code}`}
                  onClick={() => handlePopularClick(c.code)}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:-translate-y-1 transition-all text-center group"
                >
                  <img src={country.flagUrl} alt={country.name} className="w-full h-14 object-cover rounded-lg shadow-sm mb-3" loading="lazy" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">{c.name}</p>
                </Link>
              ) : null;
            })}
          </div>
        </section>

        {/* Explore by Continent */}
        <section className="mb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Explore by Continent</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-10">Discover countries from every corner of the world</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTINENTS.map((continent, i) => (
              <Link
                key={continent.name}
                href={`/continent/${continent.name.toLowerCase()}`}
                className={`rounded-2xl p-6 border-2 transition-all hover:scale-[1.02] cursor-pointer ${
                  i % 3 === 0 ? "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800 hover:border-blue-400" :
                  i % 3 === 1 ? "bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 hover:border-green-400" :
                  "bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-800 hover:border-purple-400"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{continent.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{continent.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{continent.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{continent.countries} countries</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Compare CTA */}
        <section className="mb-16 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-3xl p-8 md:p-12 text-white animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <Layers className="w-10 h-10 mx-auto md:mx-0 mb-3 text-yellow-300" />
              <h2 className="text-3xl font-bold mb-2">Compare Any Two Countries</h2>
              <p className="text-blue-100 text-lg">Side-by-side comparison of population, area, economy, and more</p>
            </div>
            <Link href="/compare" className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 hover:text-gray-900 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              Try It Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Quiz CTA */}
        <section className="mb-16 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 md:p-12 border border-green-200 dark:border-green-800 animate-fade-in" style={{ animationDelay: "0.7s" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <Brain className="w-10 h-10 mx-auto md:mx-0 mb-3 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Test Your Geography Knowledge</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Flag quizzes, capital challenges, and fun facts trivia</p>
            </div>
            <Link href="/quiz" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              Start Quiz <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Trending Now */}
        <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Trending Now
          </h2>
          <div className="flex flex-wrap gap-3">
            {TRENDING_NOW.map((name, i) => {
              const country = allCountries.find((c: any) => c.name.toLowerCase() === name.toLowerCase() || c.name.toLowerCase().includes(name.toLowerCase()));
              return country ? (
                <Link
                  key={i}
                  href={`/country/${country.code}`}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2.5 rounded-full hover:shadow-md hover:border-blue-300 transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                  <img src={country.flagIcon || country.flagUrl} alt={country.name} className="w-5 h-3.5 rounded-sm" loading="lazy" />
                  {name}
                </Link>
              ) : null;
            })}
          </div>
        </section>

        {/* Blog Preview */}
        <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Latest from the Blog 📝</h2>
              <p className="text-gray-600 dark:text-gray-400">Travel guides, geography insights, and country rankings</p>
            </div>
            <Link href="/blog" className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 font-medium inline-flex items-center gap-1">
              View All Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { slug: "most-beautiful-countries-in-europe", title: "Most Beautiful Countries in Europe", desc: "From Norway's fjords to Greece's islands, discover Europe's most stunning destinations." },
              { slug: "cheapest-countries-to-travel", title: "Cheapest Countries to Travel", desc: "Explore budget-friendly destinations where your money goes further and adventures await." },
              { slug: "safest-countries-in-asia", title: "Safest Countries in Asia", desc: "Your guide to secure and welcoming Asian destinations for every type of traveler." },
            ].map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-emerald-500 h-40 flex items-center justify-center">
                  <span className="text-6xl">🌍</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{post.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mb-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl p-8 md:p-12 text-white text-center animate-fade-in" style={{ animationDelay: "1s" }}>
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Get the World in Your Inbox</h2>
          <p className="text-yellow-100 mb-6">Receive a fascinating country fact, travel tip, and destination highlight every week.</p>
          <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-yellow-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-yellow-50 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-yellow-200">We respect your privacy. Unsubscribe at any time.</p>
        </section>
      </div>
    </main>
  );
}