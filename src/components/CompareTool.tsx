"use client";

import { useState, useEffect } from "react";
import { Globe2, Loader2, RotateCcw } from "lucide-react";

type CompareItem = {
  name: string;
  code: string;
  flagUrl: string;
  population: string;
  area: number;
  currency: string;
  language: string;
  region: string;
  capital: string;
  timezones: string[];
  populationRaw: number;
};

const PRESET_COMPARISONS = [
  { country1: "japan", country2: "south-korea" },
  { country1: "usa", country2: "china" },
  { country1: "france", country2: "italy" },
  { country1: "germany", country2: "uk" },
  { country1: "india", country2: "china" },
  { country1: "brazil", country2: "argentina" },
  { country1: "canada", country2: "usa" },
  { country1: "australia", country2: "new-zealand" },
];

const FIELD_LABELS: Record<string, string> = {
  capital: "Capital",
  region: "Region",
  subregion: "Subregion",
  population: "Population",
  area: "Area (km²)",
  currency: "Currency",
  language: "Language",
  timezone: "Timezone",
};

export default function CompareTool({ countries: allCountries }: { countries: CompareItem[] }) {
  const [country1, setCountry1] = useState<string>("");
  const [country2, setCountry2] = useState<string>("");
  const [result1, setResult1] = useState<CompareItem | null>(null);
  const [result2, setResult2] = useState<CompareItem | null>(null);
  const [searchOpen, setSearchOpen] = useState<"1" | "2" | null>(null);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<CompareItem[]>([]);

  const handlePreset = (c1: string, c2: string) => {
    const c1Data = allCountries.find((c) => c.code === c1 || c.name.toLowerCase().includes(c1));
    const c2Data = allCountries.find((c) => c.code === c2 || c.name.toLowerCase().includes(c2));
    if (c1Data) {
      setCountry1(c1Data.name);
      setResult1(c1Data);
    }
    if (c2Data) {
      setCountry2(c2Data.name);
      setResult2(c2Data);
    }
    setSearchOpen(null);
  };

  useEffect(() => {
    if (query.length < 2) {
      setFiltered([]);
      return;
    }
    const q = query.toLowerCase();
    const results = allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.capital?.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
    ).slice(0, 8);
    setFiltered(results);
  }, [query, allCountries]);

  const selectCountry = (country: CompareItem, slot: "1" | "2") => {
    if (slot === "1") {
      setCountry1(country.name);
      setResult1(country);
    } else {
      setCountry2(country.name);
      setResult2(country);
    }
    setFiltered([]);
    setSearchOpen(null);
    setQuery("");
  };

  const fields = [
    { key: "capital", label: "Capital", getValue: (c: CompareItem) => c.capital },
    { key: "region", label: "Region", getValue: (c: CompareItem) => c.region },
    { key: "subregion", label: "Subregion", getValue: (c: CompareItem) => c.subregion !== "N/A" ? c.subregion : "—" },
    { key: "population", label: "Population", getValue: (c: CompareItem) => c.population },
    { key: "area", label: "Area", getValue: (c: CompareItem) => c.area > 0 ? `${c.area.toLocaleString()} km²` : "N/A" },
    { key: "currency", label: "Currency", getValue: (c: CompareItem) => c.currency.split("(")[0].trim() },
    { key: "language", label: "Language", getValue: (c: CompareItem) => c.language },
    { key: "timezone", label: "Timezone", getValue: (c: CompareItem) => c.timezones.slice(0, 2).join(", ") || "N/A" },
  ];

  const getComparisonStyle = (val1: string, val2: string, isNumeric: boolean) => {
    if (!val1 || !val2) return {};
    if (isNumeric) {
      const n1 = parseFloat(val1.replace(/[^0-9.-]/g, ""));
      const n2 = parseFloat(val2.replace(/[^0-9.-]/g, ""));
      if (!isNaN(n1) && !isNaN(n2)) {
        if (n1 > n2) return { backgroundColor: "rgba(37, 99, 235, 0.1)" };
        if (n2 > n1) return { backgroundColor: "rgba(22, 163, 74, 0.1)" };
      }
    }
    return {};
  };

  return (
    <div className="space-y-8">
      {/* Preset Comparisons */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-blue-600" />
          Quick Compare
        </h3>
        <div className="flex flex-wrap gap-2">
          {PRESET_COMPARISONS.map((preset, i) => (
            <button
              key={i}
              onClick={() => handlePreset(preset.country1, preset.country2)}
              className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm hover:shadow-md transition-all"
            >
              {preset.country1} vs {preset.country2}
            </button>
          ))}
        </div>
      </div>

      {/* Search Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Country 1 */}
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Country 1</label>
          <input
            type="text"
            value={country1}
            onChange={(e) => {
              setCountry1(e.target.value);
              setQuery(e.target.value);
              setSearchOpen("1");
            }}
            onClick={() => setSearchOpen("1")}
            placeholder="Type to search..."
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 text-gray-900 dark:text-white placeholder-gray-400"
          />
          {country1 && (
            <button onClick={() => { setCountry1(""); setResult1(null); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <X className="w-4 h-4" />
            </button>
          )}
          {searchOpen === "1" && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 animate-fade-in">
              {query.length < 2 ? (
                <p className="p-4 text-sm text-gray-500">Type at least 2 characters</p>
              ) : filtered.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">No matches found</p>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => selectCountry(c, "1")}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <img src={c.flagUrl} alt={c.name} className="w-8 h-5 rounded shadow-sm" loading="lazy" />
                    <span className="text-sm font-medium">{c.name}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Country 2 */}
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Country 2</label>
          <input
            type="text"
            value={country2}
            onChange={(e) => {
              setCountry2(e.target.value);
              setQuery(e.target.value);
              setSearchOpen("2");
            }}
            onClick={() => setSearchOpen("2")}
            placeholder="Type to search..."
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 text-gray-900 dark:text-white placeholder-gray-400"
          />
          {country2 && (
            <button onClick={() => { setCountry2(""); setResult2(null); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <X className="w-4 h-4" />
            </button>
          )}
          {searchOpen === "2" && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 animate-fade-in">
              {query.length < 2 ? (
                <p className="p-4 text-sm text-gray-500">Type at least 2 characters</p>
              ) : filtered.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">No matches found</p>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => selectCountry(c, "2")}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <img src={c.flagUrl} alt={c.name} className="w-8 h-5 rounded shadow-sm" loading="lazy" />
                    <span className="text-sm font-medium">{c.name}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {(result1 || result2) && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                  {result1 && (
                    <div className="flex flex-col items-center">
                      <img src={result1.flagUrl} alt={result1.name} className="w-10 h-7 rounded shadow-sm mb-1" loading="lazy" />
                      <span className="text-xs font-semibold truncate max-w-[100px]">{result1.name}</span>
                    </div>
                  )}
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                  {result2 && (
                    <div className="flex flex-col items-center">
                      <img src={result2.flagUrl} alt={result2.name} className="w-10 h-7 rounded shadow-sm mb-1" loading="lazy" />
                      <span className="text-xs font-semibold truncate max-w-[100px]">{result2.name}</span>
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {fields.map((field) => (
                <tr key={field.key} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.label}
                  </td>
                  <td
                    className="px-6 py-4 text-sm text-center text-gray-900 dark:text-white"
                    style={
                      result1 && result2
                        ? getComparisonStyle(
                            field.getValue(result1),
                            field.getValue(result2),
                            field.key === "area" || field.key === "population"
                          )
                        : {}
                    }
                  >
                    {result1 ? field.getValue(result1) : "—"}
                  </td>
                  <td
                    className="px-6 py-4 text-sm text-center text-gray-900 dark:text-white"
                    style={
                      result1 && result2
                        ? getComparisonStyle(
                            field.getValue(result2),
                            field.getValue(result1),
                            field.key === "area" || field.key === "population"
                          )
                        : {}
                    }
                  >
                    {result2 ? field.getValue(result2) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}