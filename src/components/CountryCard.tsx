import React from 'react';

type CountryCardProps = {
  country: {
    name: string;
    capital: string;
    population: string;
    region: string;
    flagUrl: string;
    code: string;
    currency: string;
    language: string;
    coordinates: [number, number];
  };
  onCopy?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
};

export default function CountryCard({ country, onCopy, onShare, onFavorite, isFavorited }: CountryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 animate-fade-in">
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-20 mb-4 shadow-md rounded-lg overflow-hidden">
          <img 
            src={country.flagUrl} 
            alt={`Flag of ${country.name}`} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-1">{country.name}</h2>
        <span className="text-lg text-blue-600 font-medium">{country.region}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <span className="text-sm text-gray-500 block mb-1">Capital</span>
          <span className="text-lg font-semibold text-gray-900">{country.capital}</span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <span className="text-sm text-gray-500 block mb-1">Population</span>
          <span className="text-lg font-semibold text-gray-900">{country.population}</span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <span className="text-sm text-gray-500 block mb-1">Currency</span>
          <span className="text-lg font-semibold text-gray-900">{country.currency}</span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <span className="text-sm text-gray-500 block mb-1">Language</span>
          <span className="text-lg font-semibold text-gray-900">{country.language}</span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-6">
        {onCopy && (
          <button 
            onClick={onCopy}
            className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Copy
          </button>
        )}
        {onShare && (
          <button 
            onClick={onShare}
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Share
          </button>
        )}
        {onFavorite && (
          <button 
            onClick={onFavorite}
            className={`py-2 px-4 rounded-lg font-medium transition-colors ${
              isFavorited ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            ★
          </button>
        )}
      </div>
    </div>
  );
}