'use client';

import { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard';
import GenerateButton from '../components/GenerateButton';
import GoogleMap from '../components/GoogleMap';
import { getRandomCountry, Country } from '../utils/getRandomCountry';

export default function Home() {
  const [country, setCountry] = useState<Country | null>(null);
  const [mounted, setMounted] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setCountry(getRandomCountry());
    setMounted(true);
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const handleGenerate = () => {
    let newCountry = getRandomCountry();
    while (country && newCountry.code === country.code) {
      newCountry = getRandomCountry();
    }
    setCountry(newCountry);
  };

  const handleCopy = () => {
    if (country) {
      const text = `${country.name} - Capital: ${country.capital}, Population: ${country.population}, Currency: ${country.currency}`;
      navigator.clipboard.writeText(text);
    }
  };

  const handleShare = () => {
    if (country) {
      const url = `${window.location.origin}/country/${country.code}`;
      if (navigator.share) {
        navigator.share({
          title: `Check out ${country.name}`,
          url: url,
        });
      } else {
        navigator.clipboard.writeText(url);
      }
    }
  };

  const handleFavorite = () => {
    if (country) {
      const newFavorites = favorites.includes(country.code)
        ? favorites.filter(c => c !== country.code)
        : [...favorites, country.code];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  if (!mounted) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Random Country Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Discover the world with our instant country generator. Click below to explore random countries, 
          learn about their capitals, populations, currencies, and more.
        </p>
      </header>

      <div className="flex flex-col items-center mb-12">
        <GenerateButton onClick={handleGenerate} />
      </div>

      {country && (
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <CountryCard 
            country={country} 
            onCopy={handleCopy}
            onShare={handleShare}
            onFavorite={handleFavorite}
            isFavorited={favorites.includes(country.code)}
          />
          <GoogleMap countryName={country.name} coordinates={country.coordinates} />
        </div>
      )}

      <section className="mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore the World
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 10H3M16 6l4 4-4 4M8 6l4 4-4 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">195+ Countries</h3>
              <p className="text-gray-600 text-sm">Comprehensive database of nations worldwide</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Detailed Info</h3>
              <p className="text-gray-600 text-sm">Capitals, populations, currencies, languages & more</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">SEO Optimized</h3>
              <p className="text-gray-600 text-sm">Discover country-specific pages with rich content</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 bg-gray-50 -mx-4 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many countries are in the generator?</h3>
              <p className="text-gray-600">Our database includes 195+ recognized countries and territories, sourced from international data standards.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is the data accurate and up-to-date?</h3>
              <p className="text-gray-600">Yes! We regularly update our dataset to ensure populations, capitals, and currencies reflect the most current global information.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I share the results?</h3>
              <p className="text-gray-600">Absolutely! Use the share button to easily share any country with friends or on social media.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}