"use client";

import { useState } from "react";
import { Heart, HeartFilled, Share2, Copy, Check, Flag, MapPin, Users, Coins, Languages, Phone, Clock, Info } from "lucide-react";

type Country = {
  name: string;
  officialName: string;
  capital: string;
  population: string;
  region: string;
  code: string;
  currency: string;
  language: string;
  coordinates: [number, number];
  timezones: string[];
  flagUrl: string;
  area: number;
  subregion: string;
};

type CountryCardProps = {
  country: Country;
  onCopy?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
  showActions?: boolean;
  variant?: "default" | "compact" | "featured";
};

export default function CountryCard({ 
  country, 
  onCopy, 
  onShare, 
  onFavorite, 
  isFavorited, 
  showActions = true,
  variant = "default" 
}: CountryCardProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = () => {
    const text = `${country.name} - Capital: ${country.capital}, Population: ${country.population}, Currency: ${country.currency}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  const handleShare = () => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/country/${country.code}`;
    if (navigator.share) {
      navigator.share({
        title: `Discover ${country.name}`,
        text: `Check out ${country.name} - ${country.capital}`,
        url,
      });
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } else {
      navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
    onShare?.();
  };

  if (variant === "compact") {
    return (
      <Link href={`/country/${country.code}`} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:-translate-y-1 group">
        <img src={country.flagUrl} alt={`Flag of ${country.name}`} className="w-10 h-7 rounded shadow-sm" loading="lazy" />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-white truncate">{country.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{country.capital}</p>
        </div>
        <span className="text-xs text-gray-400">{country.region}</span>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 group hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <img src={country.flagUrl} alt={`Flag of ${country.name}`} className="w-full h-40 object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-2xl font-bold text-white">{country.name}</h3>
            <p className="text-white/80 text-sm">{country.capital}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {country.population}</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {country.region}</span>
            <span className="flex items-center gap-1"><Coins className="w-4 h-4" /> {country.currency.split('(')[0].trim()}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 animate-fade-in hover:shadow-xl transition-all duration-300 group">
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-20 mb-4 shadow-md rounded-lg overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 group-hover:ring-blue-400 transition-all">
          <img 
            src={country.flagUrl} 
            alt={`Flag of ${country.name}`} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{country.name}</h2>
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider">{country.region}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 w-full">
        <StatItem icon={<MapPin />} label="Capital" value={country.capital} />
        <StatItem icon={<Users />} label="Population" value={country.population} />
        <StatItem icon={<Coins />} label="Currency" value={country.currency.split('(')[0].trim()} />
        <StatItem icon={<Languages />} label="Language" value={country.language} />
      </div>
      
      <Link href={`/country/${country.code}`} className="mt-6 block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transition-all hover:shadow-lg">
        View Details →
      </Link>

      {showActions && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handleCopy}
            className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-1"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-1"
          >
            {shared ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {shared ? "Shared!" : "Share"}
          </button>
          {onFavorite && (
            <button
              onClick={onFavorite}
              className={`p-2 rounded-lg font-medium transition-colors ${
                isFavorited ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {isFavorited ? <HeartFilled className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
              <span className="sr-only">Favorite</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="text-gray-400 w-4 h-4 mx-auto mb-1">{icon}</div>
      <span className="text-xs text-gray-500 dark:text-gray-400 block mb-0.5">{label}</span>
      <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">{value}</span>
    </div>
  );
}

import Link from "next/link";