import CountryCard from "@/components/CountryCard";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import Link from "next/link";
import { Globe2, MapPin, Users, Coins, Flag } from "lucide-react";
import countriesData from "@/data/countries.json";

const allCountriesData = countriesData;

type Props = {
  params: Promise<{ continent: string }>;
};

const CONTINENT_INFO: Record<string, { emoji: string; description: string; countries: number }> = {
  asia: { emoji: "🌏", description: "The largest and most diverse continent, home to ancient civilizations, stunning landscapes, and vibrant cultures.", countries: 48 },
  europe: { emoji: "🌍", description: "A tapestry of cultures and history, from ancient ruins to modern metropolises.", countries: 44 },
  africa: { emoji: "🌍", description: "The cradle of civilization, featuring diverse ecosystems, rich cultures, and incredible wildlife.", countries: 54 },
  "north america": { emoji: "🗺️", description: "From Arctic tundra to tropical beaches, a continent of incredible diversity.", countries: 23 },
  "south america": { emoji: "🌎", description: "Land of ancient wonders, vibrant cultures, and breathtaking natural beauty.", countries: 12 },
  oceania: { emoji: "🏝️", description: "Islands of paradise in the Pacific, known for stunning beaches and unique cultures.", countries: 14 },
  antarctica: { emoji: "❄️", description: "The frozen continent at the bottom of the world, uninhabited except for research stations.", countries: 0 },
};

function generateContent(continentName: string) {
  const contents: Record<string, string> = {
    asia: `Asia is the world's largest continent, covering approximately 44.58 million square kilometers and home to over 4.7 billion people. From the towering Himalayas to the tropical beaches of Southeast Asia, the continent offers incredible geographic diversity. Asia is the birthplace of many of the world's oldest civilizations, including Mesopotamia, the Indus Valley, and Chinese civilization. Today, it is home to some of the world's fastest-growing economies and most dynamic cultures. Whether you're exploring the bustling streets of Tokyo, the temples of Angkor Wat, or the beaches of Bali, Asia offers endless opportunities for discovery.`,
    europe: `Europe, the second-smallest continent, has had an outsized impact on world history and culture. From the ancient Greek and Roman empires to the Renaissance and the Industrial Revolution, Europe has been at the forefront of human civilization. Today, it offers a remarkable blend of ancient history and modern innovation. Visitors can explore medieval castles, world-class museums, stunning coastlines, and some of the world's finest cuisine. With 44 countries packed into a relatively small area, Europe offers an incredible diversity of cultures, languages, and landscapes within easy traveling distance.`,
    africa: `Africa, the world's second-largest and second-most-populous continent, is often called the cradle of humankind. With 54 recognized countries, Africa offers extraordinary geographic diversity — from the Sahara Desert to tropical rainforests, from the Great Rift Valley to the savannas of the Serengeti. The continent is home to incredible wildlife, including the Big Five game animals, and boasts ancient civilizations like Egypt, Kush, and Great Zimbabwe. Africa's cultural diversity is unmatched, with over 2,000 languages spoken across the continent.`,
    "north america": `North America, the third-largest continent, encompasses 23 countries and territories, with the United States, Canada, and Mexico being the largest. The continent offers an incredible range of landscapes, from the Arctic tundra of northern Canada to the tropical beaches of the Caribbean. North America has been shaped by indigenous cultures for thousands of years, European colonization, and waves of immigration that have created incredibly diverse societies. From the Grand Canyon to Niagara Falls, from New York City to ancient Mayan ruins, North America has something for every traveler.`,
    "south america": `South America is a continent of superlatives — home to the Amazon rainforest (the world's largest), the Andes mountains (the longest continental mountain range), and the Atacama Desert (one of the driest places on Earth). The continent's 12 countries blend indigenous, European, and African influences into vibrant cultures known for music, dance, and incredible cuisine. From Machu Picchu to Rio de Janeiro's beaches, from Patagonia's glaciers to the Galápagos Islands, South America offers unforgettable adventures.`,
    oceania: `Oceania encompasses the islands of the Pacific Ocean, including Australia, New Zealand, and thousands of smaller islands grouped into Melanesia, Micronesia, and Polynesia. The region is known for its stunning beaches, incredible marine life, and unique indigenous cultures. From Australia's Outback and Great Barrier Reef to New Zealand's dramatic fjords and the tropical paradise of Fiji and Tahiti, Oceania offers a diverse range of experiences for travelers.`,
    antarctica: `Antarctica is Earth's southernmost continent, containing the geographic South Pole. It is the fifth-largest continent, nearly twice the size of Australia, and is almost entirely covered by ice. With no permanent residents, Antarctica is dedicated to scientific research. While not a typical tourist destination, a small number of visitors travel there each year to witness its otherworldly landscapes and unique wildlife, including penguins, seals, and whales.`,
  };
  return contents[continentName.toLowerCase()] || `Explore the countries of ${continentName}.`;
}

export default async function ContinentPage({ params }: Props) {
  const { continent } = await params;
  const continentKey = continent.toLowerCase().replace(/s$/, "");
  const info = CONTINENT_INFO[continentKey] || { emoji: "🌍", description: "", countries: 0 };
  const allCountries = allCountriesData;

  const filteredCountries = allCountries.filter((c) => {
    const cRegion = c.region;
    return cRegion.toLowerCase() === continentKey || c.region.toLowerCase() === continentKey;
  });

  // Sort by population (largest first)
  const sortedCountries = [...filteredCountries].sort(
    (a, b) => (b.populationRaw || 0) - (a.populationRaw || 0)
  );

  const description = generateContent(continentKey);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${info.emoji} ${continent} Countries`,
    description: description.slice(0, 160),
    url: `https://randomcountry.ziamuhammad.com/continent/${continent}`,
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Continents", href: "/continents" },
    { label: continent },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbBar items={breadcrumbItems} />

        {/* Hero */}
        <section className="text-center mb-12 animate-fade-in-down">
          <span className="text-6xl mb-4 block">{info.emoji}</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Countries in {continent}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">{description}</p>
          <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {filteredCountries.length} countries
            </span>
          </div>
        </section>

        {/* Country Grid */}
        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            All {filteredCountries.length} Countries in {continent}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sortedCountries.map((country) => (
              <CountryCard key={country.code} country={country} variant="compact" />
            ))}
          </div>
        </section>

        {sortedCountries.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No countries found for this continent.</p>
          </div>
        )}
      </div>
    </main>
  );
}