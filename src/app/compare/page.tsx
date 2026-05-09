"use client";

import { useState, useEffect } from "react";
import { Globe2, Target } from "lucide-react";
import GlobeMap from "@/components/GlobeMap";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import dynamic from "next/dynamic";
import countriesData from "@/data/countries";

const allCountries = countriesData;

const CountryCard = dynamic(() => import("@/components/CountryCard"), { ssr: false });

export default function ComparePage() {
  const [country1, setCountry1] = useState<string>("");
  const [country2, setCountry2] = useState<string>("");
  const [result1, setResult1] = useState<any>(null);
  const [result2, setResult2] = useState<any>(null);
  const [searchOpen, setSearchOpen] = useState<"1" | "2" | null>(null);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);

  const handlePreset = (c1: string, c2: string) => {
    const country1Data = allCountries.find((c: any) => c.code === c1 || c.name.toLowerCase().includes(c1));
    const country2Data = allCountries.find((c: any) => c.code === c2 || c.name.toLowerCase().includes(c2));
    if (country1Data) {
      setCountry1(country1Data.name);
      setResult1(country1Data);
    }
    if (country2Data) {
      setCountry2(country2Data.name);
      setResult2(country2Data);
    }
  };

  useEffect(() => {
    if (query.length < 2) {
      setFiltered([]);
      return;
    }
    const q = query.toLowerCase();
    const results = allCountries.filter(
      (c: any) =>
        c.name.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
    ).slice(0, 8);
    setFiltered(results);
  }, [query, allCountries]);

  const selectCountry = (country: any, slot: "1" | "2") => {
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
    { key: "capital", label: "Capital", isNumeric: false },
    { key: "region", label: "Region", isNumeric: false },
    { key: "subregion", label: "Subregion", isNumeric: false },
    { key: "population", label: "Population", isNumeric: true },
    { key: "area", label: "Area (km²)", isNumeric: true },
    { key: "currency", label: "Currency", isNumeric: false },
    { key: "language", label: "Language", isNumeric: false },
    { key: "timezones", label: "Timezones", isNumeric: false },
  ];

  const getCompareStyle = (val1: string, val2: string, isNum: boolean) => {
    if (!val1 || !val2) return {};
    if (isNum) {
      const n1 = parseFloat(val1.replace(/[^0-9.-]/g, ""));
      const n2 = parseFloat(val2.replace(/[^0-9.-]/g, ""));
      if (!isNaN(n1) && !isNaN(n2)) {
        return n1 > n2 ? { backgroundColor: "rgba(37, 99, 235, 0.08)" } : n2 > n1 ? { backgroundColor: "rgba(22, 163, 74, 0.08)" } : {};
      }
    }
    return {};
  };

  const PRESET_COMPARISONS = [
    { c1: "japan", c2: "south-korea", label: "Japan vs South Korea" },
    { c1: "usa", c2: "china", label: "USA vs China" },
    { c1: "france", c2: "italy", label: "France vs Italy" },
    { c1: "germany", c2: "uk", label: "Germany vs UK" },
    { c1: "india", c2: "china", label: "India vs China" },
    { c1: "brazil", c2: "argentina", label: "Brazil vs Argentina" },
    { c1: "canada", c2: "usa", label: "Canada vs USA" },
    { c1: "australia", c2: "new-zealand", label: "Australia vs New Zealand" },
  ];

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar items={[{ label: "Home", href: "/" }, { label: "Compare Countries" }]} />

      {/* Header */}
      <section className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
          Compare Countries <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Side by Side</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select two countries to compare their population, area, economy, culture, and more.
        </p>
      </section>

      {/* Preset Comparisons */}
      <section className="mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-blue-600" /> Quick Compare
        </h3>
        <div className="flex flex-wrap gap-3">
          {PRESET_COMPARISONS.map((preset, i) => (
            <button
              key={i}
              onClick={() => handlePreset(preset.c1, preset.c2)}
              className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:-translate-y-0.5"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </section>

      {/* Search Inputs */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["1", "2"].map((slot) => (
            <div key={slot} className="relative">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Country {slot === "1" ? "A" : "B"}
              </label>
              <input
                type="text"
                value={slot === "1" ? country1 : country2}
                onChange={(e) => {
                  if (slot === "1") setCountry1(e.target.value);
                  else setCountry2(e.target.value);
                  setQuery(e.target.value);
                  setSearchOpen(slot as "1" | "2");
                }}
                onClick={() => setSearchOpen(slot as "1" | "2")}
                placeholder="Type to search..."
                className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 text-gray-900 dark:text-white placeholder-gray-400 text-lg"
              />
              {(slot === "1" ? country1 : country2) && (
                <button
                  onClick={() => {
                    if (slot === "1") { setCountry1(""); setResult1(null); }
                    else { setCountry2(""); setResult2(null); }
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              )}
              {searchOpen === slot && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 animate-fade-in max-h-60 overflow-y-auto">
                  {query.length < 2 ? (
                    <p className="p-6 text-sm text-gray-500 text-center">Type at least 2 characters to search</p>
                  ) : filtered.length === 0 ? (
                    <p className="p-6 text-sm text-gray-500 text-center">No countries found</p>
                  ) : (
                    filtered.map((c: any) => (
                      <button
                        key={c.code}
                        onClick={() => selectCountry(c, slot as "1" | "2")}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <img src={c.flagUrl} alt={c.name} className="w-8 h-5 rounded shadow-sm" loading="lazy" />
                        <span className="text-sm font-medium">{c.name}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Compare Button */}
        {(result1 || result2) && (
          <div className="text-center mt-6">
            <button
              onClick={() => {
                if (result1 && result2) {
                  window.location.href = `/compare/${result1.code}-vs-${result2.code}`;
                }
              }}
              disabled={!result1 || !result2}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-2xl text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              <Target className="w-5 h-5" />
              Compare Countries
            </button>
          </div>
        )}
      </section>

      {/* Comparison Results */}
      {(result1 && result2) && (
        <section className="animate-fade-in-up">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            <img src={result1.flagUrl} alt={result1.name} className="w-8 h-5 inline rounded shadow-sm" />
            <span className="mx-2">vs</span>
            <img src={result2.flagUrl} alt={result2.name} className="w-8 h-5 inline rounded shadow-sm" />
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{result1.name}</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{result2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {fields.map((field) => {
                  const val1 = result1[field.key];
                  const val2 = result2[field.key];
                  if (field.key === "subregion" && result1[field.key] === "N/A" && result2[field.key] === "N/A") return null;
                  return (
                    <tr key={field.key} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{field.label}</td>
                      <td
                        className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white"
                        style={getCompareStyle(
                          typeof val1 === "string" ? val1 : String(val1),
                          typeof val2 === "string" ? val2 : String(val2),
                          field.isNumeric
                        )}
                      >
                        {typeof val1 === "string" ? val1.split("(")[0].trim() : val1}
                      </td>
                      <td
                        className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white"
                        style={getCompareStyle(
                          typeof val2 === "string" ? val2 : String(val2),
                          typeof val1 === "string" ? val1 : String(val1),
                          field.isNumeric
                        )}
                      >
                        {typeof val2 === "string" ? val2.split("(")[0].trim() : val2}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Ad Space */}
      <div className="ad-placeholder my-12 min-h-[100px]">
        📢 Ad Space - Compare Tool
      </div>
    </main>
  );
}