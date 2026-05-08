"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Flag, Loader2 } from "lucide-react";
import Link from "next/link";

type Country = {
  name: string;
  code: string;
  flagUrl: string;
};

type SearchBarProps = {
  onClose?: () => void;
  autoFocus?: boolean;
};

export default function SearchBar({ onClose, autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any country by name, capital, or region..."
          autoFocus={autoFocus}
          className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all text-sm"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          {loading ? (
            <div className="py-8 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
          ) : results.length > 0 ? (
            <div className="py-2 max-h-80 overflow-y-auto">
              {results.map((country) => (
                <Link
                  key={country.code}
                  href={`/country/${country.code}`}
                  onClick={handleSelect}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <img
                    src={country.flagUrl}
                    alt={country.name}
                    className="w-8 h-5.5 rounded shadow-sm"
                    loading="lazy"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {country.name}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-gray-500">
              <Flag className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              No countries found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}