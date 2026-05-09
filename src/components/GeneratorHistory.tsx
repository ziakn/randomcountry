"use client";

import { useState, useEffect } from "react";
import { Shuffle, Clock, X, Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import countriesData from "@/data/countries.json";

const getAllCountries = () => countriesData;
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

type Favorite = {
  code: string;
  name: string;
};

export default function GeneratorHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [activeTab, setActiveTab] = useState<"history" | "favorites">("history");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("country_history");
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
    try {
      const saved = localStorage.getItem("favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("country_history");
  };

  const removeFavorite = (code: string) => {
    const newFavs = favorites.filter((f) => f.code !== code);
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Activity</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("history")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              activeTab === "history"
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            History ({history.length})
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              activeTab === "favorites"
                ? "bg-pink-600 text-white"
                : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            Saved ({favorites.length})
          </button>
        </div>
      </div>

      {activeTab === "history" ? (
        history.length > 0 ? (
          <>
            <div className="space-y-3">
              {history.slice(0, 50).map((entry, index) => {
                const colors = [
                  "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
                  "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                  "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                  "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                  "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
                ];
                const color = colors[index % colors.length];
                return (
                  <Link
                    key={entry.code + entry.timestamp}
                    href={`/country/${entry.code}`}
                    className={`flex items-center gap-3 p-3 rounded-xl border hover:shadow-md transition-all ${color}`}
                  >
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {entry.timestamp === history[0].timestamp && index === 0 ? "🆕" : `${index + 1}`}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{entry.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                      {formatTime(entry.timestamp)}
                    </p>
                  </Link>
                );
              })}
            </div>
            {history.length > 10 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Showing last 50 of {history.length} entries
              </p>
            )}
            <button
              onClick={clearHistory}
              className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Clear History
            </button>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🕰️</div>
            <p className="text-gray-500 mb-2">No history yet</p>
            <p className="text-sm text-gray-400">Start exploring countries to see your history here</p>
          </div>
        )
      ) : (
        <>
          {favorites.length > 0 ? (
            <>
              <div className="space-y-3">
                {favorites.slice(0, 50).map((fav, index) => (
                  <div
                    key={fav.code}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${
                      index % 2 === 0
                        ? "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800"
                        : "bg-white dark:bg-gray-700/30 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{fav.name}</p>
                    <button
                      onClick={() => removeFavorite(fav.code)}
                      className="ml-auto text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label={`Remove ${fav.name} from favorites`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={clearFavorites}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 border-2 border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400 rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
              >
                <Heart className="w-4 h-4" /> Clear Saved
              </button>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">💗</div>
              <p className="text-gray-500 mb-2">No saved countries</p>
              <p className="text-sm text-gray-400">Save countries you love from the generator</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}