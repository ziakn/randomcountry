"use client";

import { useState, useEffect } from "react";
import { Clock, Info, ArrowRight } from "lucide-react";
import Link from "next/link";
import CountryMapWrapper from "./CountryMapWrapper";

type Country = {
  name: string;
  code: string;
  flagUrl: string;
  capital: string;
  region: string;
};

type RelatedCountry = {
  country: Country;
  reason: string;
};

type FunFact = {
  text: string;
  emoji?: string;
};

type CountryDetailsProps = {
  country: {
    name: string;
    officialName: string;
    capital: string;
    population: string;
    populationRaw: number;
    region: string;
    subregion: string;
    flagUrl: string;
    code: string;
    iso3: string;
    currency: string;
    currencyCode: string;
    language: string;
    coordinates: [number, number];
    area: number;
    borders: string[];
    timezones: string[];
  };
  relatedCountries: RelatedCountry[];
  funFacts: FunFact[];
};

// Static facts database for enriching country pages
const COUNTRY_FACTS: Record<string, { facts: FunFact[]; travelTips: string[]; food: string[]; attractions: string[]; bestTime: string; costEstimate: string; educationInfo: string; governmentInfo: string; religionInfo: string; economyInfo: string; geographyInfo: string }> = {
  af: {
    facts: [
      { text: "Afghanistan is known as the \"Crossroads of Asia\" due to its strategic location", emoji: "🗺️" },
      { text: "The country has produced some of the world's finest lapis lazuli for over 6,000 years", emoji: "💎" },
      { text: "Buzkashi, a horseback game using a goat carcass, is the national sport", emoji: "🐴" },
      { text: "Afghanistan has more than 100 spoken languages and dialects", emoji: "🗣️" },
    ],
    travelTips: ["Check current travel advisories before visiting", "Best time is spring (March-May) and autumn (September-November)", "Dress conservatively", "Register with your embassy"],
    food: ["Kabuli Pulao", "Mantu (dumplings)", "Ashak (leek dumplings)", "Bolani (flatbread)", "Kofta"],
    attractions: ["Bamiyan Buddhas remnants", "Band-e Amir National Park", "Minaret of Jam", "Herat Citadel"],
    bestTime: "April to June and September to October",
    costEstimate: "$20-40/day (budget travel)",
    educationInfo: "Education system rebuilding after decades of conflict. Several universities in Kabul region.",
    governmentInfo: "Islamic Emirate system since 2021",
    religionInfo: "Islam (Sunni majority ~80%, Shia minority ~19%)",
    economyInfo: "Agriculture-based economy; opium production significant; minerals including lithium and copper",
    geographyInfo: "Landlocked country in Central/South Asia with the Hindu Kush mountain range dominating the terrain",
  },
  al: {
    facts: [
      { text: "Albania has over 750,000 concrete bunkers from the communist era", emoji: "🏗️" },
      { text: "The country nods \"yes\" and \"no\" the opposite way from most countries", emoji: "👍" },
      { text: "Albania has 4 UNESCO World Heritage Sites", emoji: "🏛️" },
      { text: "The Albanian Alps are among Europe's last undiscovered wilderness", emoji: "🏔️" },
    ],
    travelTips: ["Albania is one of Europe's most affordable destinations", "Rent a car for the best experience", "Try local raki", "Visit in summer for coastal activities"],
    food: ["Tavë Kosi", "Byrek", "Fërgesë", "Qofte", "Baklava"],
    attractions: ["Butrint National Park", "Berat Castle", "Blue Eye Spring", "Gjirokastër", "Albanian Riviera"],
    bestTime: "April to June and September to October",
    costEstimate: "$30-60/day (budget-mid range)",
    educationInfo: "Free public education; University of Tirana is the oldest university",
    governmentInfo: "Parliamentary republic",
    religionInfo: "Islam (~57%), Christianity (~17%), Irreligious (~25%)",
    economyInfo: "Upper-middle-income economy; tourism, agriculture, and energy sectors growing rapidly",
    geographyInfo: "Located in Southeastern Europe on the Adriatic and Ionian Seas, bordered by Montenegro, Kosovo, North Macedonia, and Greece",
  },
};

const COUNTRY_BORDERS: Record<string, string[]> = {};

export default function CountryDetails({ country, relatedCountries = [], funFacts = [] }: CountryDetailsProps) {
  const [activeTab, setActiveTab] = useState("about");

  const factsData = COUNTRY_FACTS[country.code] || {
    facts: [
      { text: `${country.name} has a population of ${country.population} people` },
      { text: `The capital ${country.capital} is the political center` },
      { text: `${country.name} uses ${country.currency}` },
      { text: `${country.language} is spoken here` },
    ],
    travelTips: ["Research visa requirements before visiting", "Check the best season to visit", "Learn basic local phrases", "Try local cuisine"],
    food: ["Try the local cuisine", "Street food is often the best value", "Visit local markets"],
    attractions: ["Explore the capital city", "Visit natural landmarks", "Discover hidden gems off the tourist trail"],
    bestTime: "Spring and autumn are generally the best times",
    costEstimate: "$30-80/day depending on travel style",
    educationInfo: `${country.name} has an established education system.`,
    governmentInfo: "Check for latest governance information.",
    religionInfo: "Various religions practiced throughout the country.",
    economyInfo: `${country.name} has a diverse economy.`,
    geographyInfo: `${country.name} is located in ${country.region}${country.subregion !== 'N/A' ? ', ' + country.subregion : ''}.`,
  };

  const tabs = [
    { id: "about", label: "About" },
    { id: "geography", label: "Geography" },
    { id: "economy", label: "Economy" },
    { id: "culture", label: "Culture" },
    { id: "travel", label: "Travel" },
    { id: "facts", label: "Fun Facts" },
    { id: "faq", label: "FAQ" },
  ];

  const getContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <>
            <h2>About {country.name}</h2>
            <p>
              {country.name} ({country.officialName}) is a country located in {country.region}
              {country.subregion !== 'N/A' ? `, in the ${country.subregion} subregion` : ''}. Its capital city is {country.capital},
              serving as the political, economic, and cultural center of the nation. With a population of approximately {country.population} people,
              {country.name} is a significant part of the global community.
            </p>
            <p>
              The official languages spoken are {country.language}, and the currency used is {country.currency}.
              {country.area > 0 && ` The country covers a total area of ${country.area.toLocaleString()} square kilometers.`}
              {country.borders.length > 0 && ` It shares borders with ${country.borders.length} countries.`}
            </p>
            <CountryStats />
          </>
        );
      case "geography":
        return (
          <>
            <h2>Geography & Location</h2>
            <p>{factsData.geographyInfo}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
              <GeoStat label="Region" value={country.region} />
              <GeoStat label="Subregion" value={country.subregion} />
              <GeoStat label="Coordinates" value={`${country.coordinates[0]}°N, ${country.coordinates[1]}°E`} />
              <GeoStat label="Area" value={country.area > 0 ? `${country.area.toLocaleString()} km²` : 'N/A'} />
              <GeoStat label="Timezones" value={country.timezones.slice(0, 3).join(', ') || 'N/A'} />
              <GeoStat label="Calling Code" value={`+${country.iso3}` || 'N/A'} />
            </div>
            <h3>Bordering Countries</h3>
            {country.borders.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {country.borders.map(border => (
                  <Link key={border} href={`/country/${border.toLowerCase()}`} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    {border}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-2">An island nation with no land borders.</p>
            )}
            <div className="mt-8 bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
              <CountryMapWrapper countryName={country.name} coordinates={country.coordinates} />
            </div>
          </>
        );
      case "economy":
        return (
          <>
            <h2>Economy</h2>
            <p>{factsData.economyInfo}</p>
            <div className="grid grid-cols-2 gap-4 my-6">
              <EconStat label="Currency" value={country.currency} />
              <EconStat label="ISO Code" value={country.iso3} />
              <EconStat label="Region" value={country.region} />
              <EconStat label="Population" value={country.population} />
            </div>
            <h3>Economic Overview</h3>
            <p>
              {country.name}'s economy plays a role in the global marketplace. The official currency is {country.currency}.
              As {"a"} {country.region.toLowerCase()} nation with {country.population} people, it contributes to regional trade and development.
            </p>
          </>
        );
      case "culture":
        return (
          <>
            <h2>Culture & Society</h2>
            <p>
              {country.name} is home to a rich cultural heritage. The primary languages spoken are {country.language},
              reflecting the diverse communities that make up the nation. With {country.population} people across {country.area > 0 ? `${country.area.toLocaleString()} km²` : 'its territory'},
              the country showcases a vibrant tapestry of traditions and customs.
            </p>
            <div className="my-6">
              <h3>Religions &amp; Beliefs</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{factsData.religionInfo}</p>
            </div>
            <div className="my-6">
              <h3>Government &amp; Politics</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{factsData.governmentInfo}</p>
            </div>
          </>
        );
      case "travel":
        return (
          <>
            <h2>Travel Guide</h2>
            <h3 className="text-xl font-bold mb-2">🎯 Best Time to Visit</h3>
            <p>{factsData.bestTime}</p>
            <h3 className="text-xl font-bold mt-6 mb-2">💰 Estimated Daily Cost</h3>
            <p>{factsData.costEstimate}</p>
            <h3 className="text-xl font-bold mt-6 mb-2">🏨 Top Attractions</h3>
            <ul className="list-disc pl-5 space-y-2">
              {factsData.attractions.map((attr, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300">{attr}</li>
              ))}
            </ul>
            <h3 className="text-xl font-bold mt-6 mb-2">🍜 Must-Try Food</h3>
            <ul className="list-disc pl-5 space-y-2">
              {factsData.food.map((food, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300">{food}</li>
              ))}
            </ul>
            <h3 className="text-xl font-bold mt-6 mb-2">💡 Travel Tips</h3>
            <ol className="list-decimal pl-5 space-y-2">
              {factsData.travelTips.map((tip, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300">{tip}</li>
              ))}
            </ol>
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Visa Information
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">Check your country's visa requirements for visiting {country.name} at least 6-8 weeks before your trip.</p>
            </div>
          </>
        );
      case "facts":
        return (
          <>
            <h2>Fun Facts</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              {factsData.facts.map((fact, i) => (
                <div key={i} className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <span className="text-2xl mr-2">{fact.emoji || "📌"}</span>
                  <p className="text-gray-700 dark:text-gray-300">{fact.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
              <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">📊 Key Statistics</h3>
              <dl className="grid grid-cols-2 gap-2 text-sm">
                <div><dt className="text-gray-500 dark:text-gray-400">Official Name</dt><dd className="font-semibold text-gray-900 dark:text-white">{country.officialName}</dd></div>
                <div><dt className="text-gray-500 dark:text-gray-400">ISO Code</dt><dd className="font-semibold text-gray-900 dark:text-white">{country.iso3} ({country.code.toUpperCase()})</dd></div>
                <div><dt className="text-gray-500 dark:text-gray-400">Capital</dt><dd className="font-semibold text-gray-900 dark:text-white">{country.capital}</dd></div>
                <div><dt className="text-gray-500 dark:text-gray-400">Population</dt><dd className="font-semibold text-gray-900 dark:text-white">{country.population}</dd></div>
                {country.area > 0 && (
                  <div><dt className="text-gray-500 dark:text-gray-400">Area</dt><dd className="font-semibold text-gray-900 dark:text-white">{country.area.toLocaleString()} km²</dd></div>
                )}
                <div><dt className="text-gray-500 dark:text-gray-400">Region</dt><dd className="font-semibold text-gray-900 dark:text-white">{country.region}</dd></div>
                {country.timezones.length > 0 && (
                  <div><dt className="text-gray-500 dark:text-gray-400">Timezones</dt><dd className="font-semibold text-gray-900 dark:text-white">{country.timezones.slice(0, 3).join(', ')}</dd></div>
                )}
              </dl>
            </div>
          </>
        );
      case "faq":
        return (
          <>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4 mt-4">
              <FAQItem question={`What is the capital of ${country.name}?`} answer={`The capital of ${country.name} is ${country.capital}.`} />
              <FAQItem question={`What is the population of ${country.name}?`} answer={`The population of ${country.name} is approximately ${country.population} people.`} />
              <FAQItem question={`What currency is used in ${country.name}?`} answer={`The official currency of ${country.name} is ${country.currency}.`} />
              <FAQItem question={`What languages are spoken in ${country.name}?`} answer={`The primary languages spoken in ${country.name} are ${country.language}.`} />
              <FAQItem question={`Where is ${country.name} located?`} answer={`${country.name} is located in ${country.region}${country.subregion !== 'N/A' ? `, in the ${country.subregion}` : ''}.`} />
              <FAQItem question={`Is ${country.name} safe to visit?`} answer={`Safety conditions vary by region. Always check current travel advisories from your government before visiting ${country.name}. General precautions and local awareness are recommended.`} />
              <FAQItem question={`What is the calling code for ${country.name}?`} answer={`The calling code for ${country.name} is +${country.iso3} (based on ISO code).`} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm prose max-w-none animate-fade-in">
        {getContent()}
      </div>

      {/* Related Countries */}
      {relatedCountries.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Countries</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {relatedCountries.map((rel, i) => (
              <Link key={i} href={`/country/${rel.country.code}`} className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 group">
                <img src={rel.country.flagUrl} alt={rel.country.name} className="w-8 h-5.5 rounded shadow-sm" loading="lazy" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{rel.country.name}</p>
                  <p className="text-xs text-gray-500 truncate">{rel.reason}</p>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 ml-auto flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CountryStats() {
  const stats = [
    { label: "Capital", value: "capital" },
    { label: "Population", value: "population" },
    { label: "Currency", value: "currency" },
    { label: "Languages", value: "language" },
    { label: "Region", value: "region" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
      {stats.map(s => (
        <div key={s.label} className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{(country as any)[s.value]}</p>
        </div>
      ))}
    </div>
  );
}

function GeoStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
    </div>
  );
}

function EconStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-lg p-3">
      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <details className="bg-gray-50 dark:bg-gray-700/50 rounded-lg group">
      <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{question}</span>
        <span className="ml-4 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180">
          <ArrowRight className="w-4 h-4" />
        </span>
      </summary>
      <p className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">{answer}</p>
    </details>
  );
}