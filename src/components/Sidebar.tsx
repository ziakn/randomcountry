"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, Heart, Share2, RefreshCw, ArrowUp, Loader2, X } from "lucide-react";
import countriesData from "@/data/countries.json";

const getAllCountries = () => countriesData;
const getCountryByCode = (code: string) => countriesData.find((c) => c.code === code.toLowerCase());
const getRandomCountry = (excludeCode?: string) => {
  let idx = Math.floor(Math.random() * countriesData.length);
  let c = countriesData[idx];
  while (excludeCode && c.code === excludeCode.toLowerCase()) {
    idx = Math.floor(Math.random() * countriesData.length);
    c = countriesData[idx];
  }
  return c;
};

type HistoryEntry = {
  code: string;
  name: string;
  timestamp: number;
};

type FavoriteEntry = {
  code: string;
  name: string;
};

export default function Sidebar() {
  const [recentCountries, setRecentCountries] = useState<HistoryEntry[]>([]);
  const [favorites, setFavorites] = useState<FavoriteEntry[]>([]);
  const [trending, setTrending] = useState(getTrendingCountries());
  const [showHistory, setShowHistory] = useState(false);
  const [dailyCountry, setDailyCountry] = useState<any>(null);

  useEffect(() => {
    // Load recent history
    try {
      const saved = localStorage.getItem('country_history');
      if (saved) setRecentCountries(JSON.parse(saved));
    } catch {}
    try {
      const saved = localStorage.getItem('favorites');
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}

    // Daily country based on date
    const today = new Date().toISOString().slice(0, 10);
    const countries = getAllCountries();
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash);
    }
    setDailyCountry(countries[Math.abs(hash) % countries.length]);
  }, []);

  function getTrendingCountries() {
    const codes = ['fr', 'jp', 'it', 'us', 'es', 'de', 'cn', 'br', 'in', 'mx', 'th', 'kr', 'au', 'ca', 'uk', 'nl', 'se', 'no', 'dk', 'fi'];
    return codes.map(code => getCountryByCode(code)).filter(Boolean);
  }

  const handleClearHistory = () => {
    setRecentCountries([]);
    localStorage.removeItem('country_history');
  };

  const handleRemoveFavorite = (code: string) => {
    const newFavs = favorites.filter(f => f.code !== code);
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  const handleAddToFavorites = (entry: FavoriteEntry) => {
    if (favorites.find(f => f.code === entry.code)) return;
    const newFavs = [...favorites, entry];
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0" role="complementary">
      {/* Daily Country of the Day */}
      {dailyCountry && (
        <div className="mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔥</span>
            <h3 className="font-bold text-gray-900 dark:text-white">Country of the Day</h3>
          </div>
          <Link href={`/country/${dailyCountry.code}`} className="flex items-center gap-3">
            <img
              src={dailyCountry.flagUrl}
              alt={dailyCountry.name}
              className="w-12 h-8 rounded shadow"
              loading="lazy"
            />
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">{dailyCountry.name}</h4>
              <p className="text-sm text-gray-500">{dailyCountry.capital} • {dailyCountry.region}</p>
            </div>
          </Link>
        </div>
      )}

      {/* Trending Countries */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span>🔥</span> Trending Countries
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {trending.slice(0, 9).map((country) => (
            <Link
              key={country.code}
              href={`/country/${country.code}`}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              onClick={() => {
                const entry: HistoryEntry = { code: country.code, name: country.name, timestamp: Date.now() };
                setRecentCountries(prev => [entry, ...prev.filter(e => e.code !== country.code).slice(0, 19)]);
                localStorage.setItem('country_history', JSON.stringify([entry, ...recentCountries.filter(e => e.code !== country.code).slice(0, 19)]));
              }}
            >
              <img
                src={country.flagIcon || country.flagUrl}
                alt={country.name}
                className="w-full h-12 object-cover rounded shadow-sm group-hover:scale-105 transition-transform"
                loading="lazy"
              />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-1 truncate w-full text-center">
                {country.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Favorites */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-between justify-between">
          <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-red-500" /> Saved Countries</span>
          {favorites.length > 0 && (
            <button onClick={() => setFavorites([])} className="text-xs text-red-500 hover:text-red-700">Clear all</button>
          )}
        </h3>
        {favorites.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-3">No saved countries yet</p>
        ) : (
          <div className="space-y-2">
            {favorites.slice(0, 10).map((fav) => {
              const country = getCountryByCode(fav.code);
              return country ? (
                <Link
                  key={fav.code}
                  href={`/country/${fav.code}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <img src={country.flagUrl} alt={country.name} className="w-6 h-4 rounded shadow-sm" loading="lazy" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{country.name}</span>
                  <button
                    onClick={(e) => { e.preventDefault(); handleRemoveFavorite(fav.code); }}
                    className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Link>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Recent History */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Recently Viewed
          </h3>
          {recentCountries.length > 0 && (
            <button onClick={handleClearHistory} className="text-xs text-gray-500 hover:text-red-500">Clear</button>
          )}
        </div>
        {recentCountries.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-3">Start exploring countries!</p>
        ) : (
          <div className="space-y-2">
            {recentCountries.slice(0, 10).map((entry) => {
              const country = getCountryByCode(entry.code);
              return country ? (
                <Link
                  key={entry.code}
                  href={`/country/${entry.code}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <img src={country.flagUrl} alt={country.name} className="w-6 h-4 rounded shadow-sm" loading="lazy" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{country.name}</span>
                </Link>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="mb-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 text-white">
        <h3 className="font-bold text-lg mb-2">🌍 Get Daily Country Facts</h3>
        <p className="text-sm text-blue-100 mb-3">Receive a fascinating country fact in your inbox every day!</p>
        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-3 py-2 rounded-lg text-sm text-gray-900 placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button className="bg-white text-blue-700 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors">
            Subscribe
          </button>
        </form>
        <p className="text-xs text-blue-200 mt-2">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </aside>
  );
}

// Helper function for trending (same as in utils, but can be used here independently)
function getTrendingCountriesStandalone() {
  const codes = ['fr', 'jp', 'it', 'us', 'es', 'de', 'cn', 'br', 'in', 'mx', 'th', 'kr', 'au', 'ca', 'uk', 'nl', 'se', 'no', 'dk', 'fi'];
  return codes.map(code => getCountryByCode(code)).filter(Boolean);
}