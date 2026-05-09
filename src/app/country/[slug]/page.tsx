import { notFound } from "next/navigation";
import { Globe2, Share2, ArrowRight, Flag, MapPin, Users, Coins, Languages, Info } from "lucide-react";
import Link from "next/link";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import CountryMapWrapper from "@/components/CountryMapWrapper";
import countriesData from "@/data/countries";

const allCountries = countriesData;

const EMOJIS = ["🇦🇫", "🇦🇱", "🇩🇿", "🇦🇩", "🇦🇴", "🇦🇬", "🇦🇷", "🇦🇲", "🇦🇺", "🇦🇹", "🇦🇿", "🇧🇸", "🇧🇭", "🇧🇩", "🇧🇧", "🇧🇾", "🇧🇪", "🇧🇿", "🇧🇯"];

type Props = {
  params: Promise<{ slug: string }>;
};

const COUNTRY_CONTENT: Record<string, any> = {
  "united-states": {
    about: "The United States of America is a vast and diverse nation spanning the North American continent. From the towering skyscrapers of New York City to the sun-drenched beaches of Hawaii, from the rugged Rocky Mountains to the rolling plains of the Midwest, the USA offers an extraordinary range of landscapes, cultures, and experiences. As a federal republic of 50 states, it is one of the world's most influential nations in politics, economics, technology, and culture.",
    geography: "The United States spans approximately 9.8 million square kilometers, making it the third or fourth largest country by total area depending on measurement methodology. It features diverse geography including the Appalachian Mountains in the east, the Great Plains in the center, the Rocky Mountains in the west, the Pacific Coast, and tropical territories in the Caribbean and Pacific. Major rivers include the Mississippi, Missouri, and Colorado. The climate ranges from arctic in Alaska to tropical in Hawaii and Florida.",
    economy: "The United States has the world's largest economy by nominal GDP, exceeding $25 trillion. It is a leading center of technological innovation, finance, and manufacturing. Key industries include technology, healthcare, finance, entertainment, aerospace, and agriculture. The US dollar serves as the world's primary reserve currency.",
    culture: "American culture is a melting pot of influences from around the world. It has given birth to globally influential art forms including jazz, rock and roll, hip-hop, and Hollywood cinema. Sports play a major role, with American football, basketball, baseball, and ice hockey being the most popular. The country is home to world-renowned universities, museums, and cultural institutions.",
    religion: "The United States is one of the most religiously diverse nations in the world. Christianity is the largest religion, with Protestantism and Catholicism being the largest denominations. Other religions practiced include Judaism, Islam, Buddhism, Hinduism, and various others. A significant and growing portion of the population identifies as secular or non-religious.",
    food: ["Hamburger - the quintessential American food", "Apple Pie - a classic American dessert", "BBQ Ribs - slow-cooked barbecue", "Clam Chowder - creamy New England soup", "Tex-Mex - fusion of Mexican and American cuisine", "Buffalo Wings - spicy fried chicken from Buffalo, NY"],
    attractions: ["Grand Canyon National Park", "Statue of Liberty, New York", "Golden Gate Bridge, San Francisco", "Walt Disney World, Florida", "Times Square, New York", "Yellowstone National Park", "Las Vegas Strip", "Hollywood, Los Angeles"],
    bestTime: "Spring (April-June) and Fall (September-October) offer the best weather in most regions",
    costEstimate: "$100-200/day for mid-range travel",
    education: "The US has the world's largest international student population. Home to Harvard, MIT, Stanford, and other world-class universities. Higher education is expensive but offers unparalleled research opportunities and career prospects.",
    funFacts: ["The US has 63 national parks covering over 210,000 km²", "Alaska is larger than the next three largest states combined", "The US has no official language at the federal level", "America's national parks receive over 300 million visitors annually", "The US produces over 100 billion pounds of milk annually"],
    faqs: [
      { q: "What is the capital of the United States?", a: "Washington, D.C. is the capital of the United States." },
      { q: "What is the population of the United States?", a: "The population is approximately 335 million people." },
      { q: "Do I need a visa to visit the US?", a: "Many nationalities require a visa. The Visa Waiver Program allows citizens of 40 countries to visit for up to 90 days without a visa." },
      { q: "What currency does the US use?", a: "The United States Dollar (USD) is the official currency." },
      { q: "What is the best way to travel around the US?", a: "Flying is best for long distances. Renting a car is ideal for road trips. Amtrak provides intercity train service." },
    ],
  },
  "japan": {
    about: "Japan is an island nation in East Asia known for its rich blend of ancient traditions and cutting-edge modernity. From neon-lit Tokyo to serene Kyoto temples, from snow-capped Mount Fuji to tropical Okinawa, Japan offers an extraordinary tapestry of experiences. It is one of the world's most technologically advanced nations while maintaining deep-rooted cultural traditions.",
    geography: "Japan is an archipelago of over 6,800 islands along the Pacific coast of East Asia. The four main islands are Honshu, Hokkaido, Kyushu, and Shikoku. Japan is predominantly mountainous, with about 73% of its land covered by forests. It is located in the Pacific Ring of Fire, making it prone to earthquakes and volcanic activity. Mount Fuji at 3,776 meters is the country's iconic peak.",
    economy: "Japan has the world's third-largest economy by nominal GDP. It is a global leader in automotive manufacturing, electronics, robotics, and precision machinery. Companies like Toyota, Sony, and Nintendo are globally recognized. Despite economic challenges including an aging population, Japan remains a powerhouse of innovation and quality.",
    culture: "Japanese culture is renowned worldwide for its art, cuisine, martial arts, and pop culture. Traditional arts include tea ceremony, ikebana (flower arranging), and kabuki theater. Modern Japanese culture has had enormous global influence through anime, manga, video games, and cuisine. The concept of omotenashi (hospitality) is central to Japanese service culture.",
    religion: "Japan practices religious freedom with Shintoism and Buddhism being the two major religions. Many Japanese people practice both simultaneously. Shinto focuses on rituals and kami (spirits), while Buddhism, introduced from China, focuses on spiritual development. Christianity and other religions have smaller followings.",
    food: ["Sushi - vinegared rice with seafood", "Ramen - noodle soup with regional variations", "Tempura - lightly battered and fried seafood and vegetables", "Wagyu Beef - high-quality Japanese beef", "Matcha desserts - green tea flavored sweets", "Okonomiyaki - savory pancake from Osaka"],
    attractions: ["Mount Fuji", "Fushimi Inari Shrine, Kyoto", "Tokyo Tower and Shibuya Crossing", "Hiroshima Peace Memorial", "Kinkaku-ji (Golden Pavilion)", "Arashiyama Bamboo Grove", "Tsukiji Outer Market"],
    bestTime: "Spring (March-May) for cherry blossoms and Autumn (October-November) for foliage",
    costEstimate: "$80-150/day for mid-range travel",
    education: "Japan's education system is highly regarded globally. Universities like the University of Tokyo and Kyoto University rank among the world's best. The government offers the MEXT scholarship for international students.",
    funFacts: ["Japan has over 6,800 islands", "There are over 1,500 earthquakes in Japan annually", "Japan has the world's oldest company (Kongo Gumi, founded 578 AD)", "Tokyo's train system has an average delay of just 18 seconds", "Japan has more than 3,000 hot spring resorts (onsen)"],
    faqs: [
      { q: "What is the capital of Japan?", a: "Tokyo is the capital and largest city of Japan." },
      { q: "Is Japan expensive?", a: "Japan can range from budget-friendly to expensive depending on your choices. Budget travelers can manage $40-60/day." },
      { q: "Do I need to speak Japanese?", a: "While Japanese is the primary language, English signage is common in major cities. A translation app is helpful." },
      { q: "When is cherry blossom season?", a: "Cherry blossoms typically bloom from late March to early April, varying by region." },
    ],
  },
  "france": {
    about: "France is the largest country in Western Europe and one of the most visited countries in the world. Known for its rich history, world-class cuisine, iconic landmarks, and cultural contributions to art, fashion, and philosophy, France continues to captivate millions of visitors each year.",
    geography: "France spans approximately 643,000 square kilometers with diverse landscapes including Mediterranean coastlines, Atlantic beaches, the Alps, the Pyrenees, rolling vineyards, and fertile river valleys. The climate varies from Mediterranean in the south to oceanic in the northwest.",
    economy: "France has the world's seventh-largest economy and is a founding member of the European Union. It excels in luxury goods, aerospace, agriculture, tourism, and nuclear energy. Paris is one of the world's leading financial centers.",
    culture: "France is the world's top tourist destination, celebrated for its art, gastronomy, wine, fashion, and architecture. From the Louvre to the Eiffel Tower, from Bordeaux vineyards to Provencal lavender fields, French culture has profoundly influenced Western civilization.",
    religion: "France is a secular state (laïcité). The majority of the population identifies as Catholic, though France is increasingly secular. Islam, Protestantism, Judaism, and Buddhism are also practiced.",
    food: ["Croissant - buttery flaky pastry", "Coq au Vin - chicken braised in wine", "Bouillabaisse - Provençal fish stew", "Camembert and Brie - famous French cheeses", "Crème Brûlée - classic French dessert", "Ratatouille - vegetable medley"],
    attractions: ["Eiffel Tower, Paris", "Palace of Versailles", "Mont Saint-Michel", "French Riviera (Côte d'Azur)", "Louvre Museum", "Notre-Dame Cathedral", "Château de Chambord"],
    bestTime: "April to October offers the best weather, with summer being peak tourist season",
    costEstimate: "$100-180/day for mid-range travel",
    education: "France hosts prestigious universities including the Sorbonne and École Normale Supérieure. Tuition is very affordable even for international students.",
    funFacts: ["France has the most time zones of any country (12)", "The Louvre is the world's largest art museum", "France produces over 1,500 varieties of cheese", "The Tour de France has been running since 1903", "France was the first country to use license plates"],
    faqs: [
      { q: "What is the capital of France?", a: "Paris is the capital and largest city of France." },
      { q: "What currency does France use?", a: "France uses the Euro (EUR)." },
      { q: "Do I need a visa for France?", a: "Citizens of EU/EEA countries don't need a visa. Others may need a Schengen visa." },
      { q: "What language is spoken in France?", a: "French is the official language." },
    ],
  },
  "germany": {
    about: "Germany is Europe's largest economy and most populous nation. Known for its precision engineering, rich history, vibrant cities, and world-class beer culture, Germany seamlessly blends medieval charm with modern innovation. From Berlin's vibrant art scene to Bavaria's fairy-tale castles, Germany offers endless exploration.",
    geography: "Germany covers approximately 357,000 square kilometers in central Europe. It features diverse landscapes from the North Sea and Baltic coasts in the north to the Bavarian Alps in the south. Major rivers include the Rhine, Danube, and Elbe. Nearly a third of the country is covered in forests.",
    economy: "Germany has Europe's largest economy and the world's fourth-largest by nominal GDP. It is a global leader in engineering, automotive manufacturing, chemicals, and renewable energy. The German economy is characterized by its Mittelstand — a strong network of small and medium-sized enterprises.",
    culture: "German culture has made enormous contributions to philosophy, music, literature, and science. From Beethoven and Bach to Goethe and Kafka, German cultural influence is profound. The country is known for Oktoberfest, Christmas markets, and a rich tradition of bread-making (over 3,000 varieties).",
    religion: "About 50% of Germans identify as Christian (roughly evenly split between Protestant and Catholic). A significant portion of the population is non-religious. Islam, Judaism, and other religions are also practiced.",
    food: ["Bratwurst with Sauerkraut", "Schnitzel - breaded meat cutlet", "Pretzel (Brezel)", "Black Forest Cake (Schwarzwälder Kirschtorte)", "Sauerbraten - pot roast", "Spätzle - egg noodles"],
    attractions: ["Neuschwanstein Castle", "Brandenburg Gate, Berlin", "Cologne Cathedral", "Black Forest", "Romantic Road", "Marienplatz, Munich", "Berlin Wall Memorial"],
    bestTime: "May to September offers the warmest weather and longest days",
    costEstimate: "$80-150/day for mid-range travel",
    education: "Germany is famous for offering tuition-free education at public universities, even for international students. It has excellent technical universities (TU9) and research institutions.",
    funFacts: ["Germany has over 1,500 varieties of sausage", "Berlin has more bridges than Venice", "Germany was the first country to adopt daylight saving time", "There are over 6,200 museums in Germany", "Munich's Oktoberfest is the world's largest folk festival"],
    faqs: [
      { q: "What is the capital of Germany?", a: "Berlin has been the capital of reunified Germany since 1990." },
      { q: "What currency does Germany use?", a: "Germany uses the Euro (EUR)." },
      { q: "Is Germany expensive?", a: "Germany is moderately priced compared to other Western European countries, especially outside major cities." },
      { q: "Can I study for free in Germany?", a: "Yes! Public universities in Germany charge no tuition fees, even for international students." },
    ],
  },
};

function generateFallbackContent(country: any) {
  return {
    about: `${country.name} (${country.officialName || country.name}) is located in ${country.region}${country.subregion !== 'N/A' ? `, in the ${country.subregion}` : ''}. Its capital city is ${country.capital}, serving as the political and administrative center. With a population of ${country.population} people across ${country.area > 0 ? country.area.toLocaleString() : 'thousands of'} square kilometers, ${country.name} is a significant part of the global community.`,
    geography: `${country.name} is located at coordinates ${country.coordinates[0]}°N, ${country.coordinates[1]}°E in ${country.region}.${country.area > 0 ? ` The country covers an area of ${country.area.toLocaleString()} square kilometers.` : ''}${country.borders && country.borders.length > 0 ? ` It shares borders with ${country.borders.join(', ')}.` : ''}${country.timezones && country.timezones.length > 0 ? ` Timezones include ${country.timezones.slice(0, 2).join(' and ')}.` : ''}`,
    economy: `${country.name}'s economy is influenced by its geographic location, natural resources, and population of ${country.population}. The official currency is ${country.currency}. The country plays a role in the broader ${country.region} economic landscape.`,
    culture: `The culture of ${country.name} reflects its diverse population and heritage. The primary languages spoken are ${country.language}. With traditions shaped by centuries of history, ${country.name} offers a unique cultural experience including distinctive cuisine, art, music, and festivals.`,
    religion: `${country.name} is home to diverse religious communities. Christianity, Islam, Hinduism, Buddhism, and various indigenous religions are practiced across different regions.`,
    food: ["Traditional local cuisine featuring regional ingredients", "Street food specialties popular with locals", "Fresh seafood and locally sourced produce", "Traditional bread and pastries", "Regional specialties unique to the area"],
    attractions: [`${country.capital} - the vibrant capital city`, `${country.name} National Museum`, `Historic old town and markets`, `Natural landmarks and scenic viewpoints`, `Cultural heritage sites`],
    bestTime: "Spring and autumn generally offer the best weather for visiting.",
    costEstimate: "$30-80/day depending on travel style and location.",
    education: `${country.name} has an established education system serving its population. Universities and educational institutions reflect the country's cultural values and development priorities.`,
    funFacts: [
      `${country.name} has a population of approximately ${country.population} people.`,
      `The capital, ${country.capital}, is the country's primary city.`,
      `${country.name} uses the currency ${country.currency}.`,
      `Languages spoken include ${country.language}.`,
      `${country.name} covers an area of ${country.area > 0 ? country.area.toLocaleString() + ' km²' : 'thousands of square kilometers'}.`,
      `The country is located in the ${country.region} region.`,
      `${country.timezones && country.timezones.length > 0 ? `Timezone(s): ${country.timezones.slice(0, 2).join(', ')}` : `The country spans multiple time zones.`}`,
    ],
    faqs: [
      { q: `What is the capital of ${country.name}?`, a: `The capital of ${country.name} is ${country.capital}.` },
      { q: `What is the population of ${country.name}?`, a: `The population is approximately ${country.population} people.` },
      { q: `What currency is used?`, a: `The official currency is ${country.currency}.` },
      { q: `What languages are spoken?`, a: `The primary languages are ${country.language}.` },
      { q: `Where is ${country.name} located?`, a: `${country.name} is in ${country.region}${country.subregion !== 'N/A' ? `, specifically in the ${country.subregion}` : ''}.` },
      { q: `What is the area of ${country.name}?`, a: `${country.area > 0 ? country.area.toLocaleString() + ' km²' : 'Diverse terrain'}.` },
      { q: `Is ${country.name} a safe travel destination?`, a: `Safety varies by region. Please check your government's travel advisory before visiting.` },
    ],
  };
}

export async function generateStaticParams() {
  const countries = allCountries;
  return countries.map((country) => ({
    slug: country.slug || country.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const country = allCountries.find((c) => (c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) === slug);

  if (!country) {
    return { title: "Country Not Found" };
  }

  const content = COUNTRY_CONTENT[slug] || generateFallbackContent(country);

  return {
    title: {
      absolute: `${country.name} - Country Profile, Facts & Travel Guide`,
    },
    description: `Discover ${country.name}: capital ${country.capital}, population ${country.population}, currency ${country.currency}. Learn about its geography, culture, and travel tips.`,
    alternates: {
      canonical: `/country/${slug}`,
    },
    openGraph: {
      title: `${country.name} - Country Profile & Travel Guide`,
      description: `Explore ${country.name}: ${country.capital} • ${country.population} • ${country.currency}`,
      url: `https://randomcountry.ziamuhammad.com/country/${slug}`,
      type: "article",
      locale: "en_US",
      siteName: "Random Country Explorer",
      images: [country.flagUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${country.name} - Country Profile`,
      description: `Explore ${country.name}: ${country.capital} • ${country.population} people`,
      images: [country.flagUrl],
    },
    keywords: [
      country.name,
      country.capital,
      `${country.name} country`,
      `${country.name} facts`,
      `${country.name} travel`,
      `${country.name} geography`,
      `${country.capital} capital`,
    ],
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = allCountries.find((c) => (c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) === slug);

  if (!country) {
    notFound();
  }

  const content = COUNTRY_CONTENT[slug] || generateFallbackContent(country);

  // Find neighbors
  const neighbors = (country.borders || [])
    .map((code: string) => allCountries.find((c) => c.code === code.toLowerCase()))
    .filter(Boolean);

  // Same region countries
  const related = allCountries
    .filter((c) => c.code !== country.code && c.region === country.region)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${country.name} - Country Profile & Travel Guide`,
    description: content.about.substring(0, 200),
    author: { "@type": "Organization", name: "Random Country Explorer" },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    image: country.flagUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://randomcountry.ziamuhammad.com/country/${slug}`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq: any) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://randomcountry.ziamuhammad.com/" },
      { "@type": "ListItem", position: 2, name: "Countries", item: "https://randomcountry.ziamuhammad.com/countries" },
      { "@type": "ListItem", position: 3, name: country.name },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbBar
          items={[
            { label: "Home", href: "/" },
            { label: "Countries", href: "/countries" },
            { label: country.region, href: `/continent/${country.region.toLowerCase()}` },
            { label: country.name },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={country.flagUrl} alt={`Flag of ${country.name}`} className="w-24 h-16 rounded-lg shadow-md" />
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                  {country.code.toUpperCase()} • {country.region}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
                {country.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">{country.officialName || country.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                <span className="text-xs text-gray-500 uppercase">Population</span>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{country.population}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <MapPin className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                <span className="text-xs text-gray-500 uppercase">Capital</span>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{country.capital}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <Coins className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                <span className="text-xs text-gray-500 uppercase">Currency</span>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{country.currency.split('(')[0].trim()}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <Languages className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                <span className="text-xs text-gray-500 uppercase">Language</span>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{country.language}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="ad-placeholder min-h-[90px]">📢 Ad Space — Below Hero</div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About {country.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{content.about}</p>
            </section>

            {/* Geography */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Geography & Location</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{content.geography}</p>
              <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <CountryMapWrapper countryName={country.name} coordinates={country.coordinates} />
              </div>
            </section>

            {/* Economy */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Economy</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{content.economy}</p>
            </section>

            {/* Culture */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Culture</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{content.culture}</p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Religion</h3>
              <p className="text-gray-600 dark:text-gray-300">{content.religion}</p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Famous Food</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {content.food.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-700 dark:text-gray-300">
                    <span className="text-lg">🍽️</span> {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Tourism */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Best Places to Visit</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {content.attractions.map((attr: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/30 dark:to-gray-700/10 rounded-lg border">
                    <span>📍</span>
                    <span>{attr}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Travel */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Travel Guide</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">⏰ Best Time to Visit</h3>
                  <p className="text-gray-700 dark:text-gray-300">{content.bestTime}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">💰 Estimated Daily Cost</h3>
                  <p className="text-gray-700 dark:text-gray-300">{content.costEstimate}</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2">🎓 Education</h3>
              <p className="text-gray-600 dark:text-gray-300">{content.education}</p>
            </section>

            {/* Fun Facts */}
            <section className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-amber-500" />
                Fun Facts & Interesting Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {content.funFacts.map((fact: string, i: number) => (
                  <div key={i} className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                    <span className="text-lg mr-2">{i < EMOJIS.length ? EMOJIS[i] : "📌"}</span>
                    <span className="text-gray-800 dark:text-gray-200">{fact}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {content.faqs.map((faq: any, i: number) => (
                  <details key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{faq.q}</span>
                      <span className="ml-4 text-gray-400 transition-transform group-open:rotate-90">→</span>
                    </summary>
                    <p className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">{faq.a}</p>
                  </details>
                ))}
              </div>
              <div className="ad-placeholder mt-6 min-h-[100px]">📢 Ad Space — Mid Article</div>
            </section>

            {/* Related Countries */}
            {related.length > 0 && (
              <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Globe2 className="w-6 h-6" /> Countries in {country.region}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {related.map((c: any) => (
                    <Link key={c.code} href={`/country/${c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:-translate-y-0.5 transition-all group">
                      <img src={c.flagUrl} alt={c.name} className="w-8 h-5 rounded shadow-sm" loading="lazy" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{c.name}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400 ml-auto group-hover:text-blue-500" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Neighbors */}
            {neighbors.length > 0 && (
              <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Neighboring Countries</h2>
                <div className="flex flex-wrap gap-2">
                  {neighbors.map((n: any) => (
                    <Link key={n.code} href={`/country/${n.slug || n.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl hover:shadow-md transition-all text-sm font-medium">
                      <img src={n.flagUrl} alt={n.name} className="w-5 h-3.5 rounded-sm" loading="lazy" />
                      {n.name}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Share</h3>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#1DA1F2] text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Twitter
                </button>
                <button className="flex-1 bg-[#4267B2] text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Facebook
                </button>
                <button className="flex-1 bg-gray-800 dark:bg-gray-700 text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Copy
                </button>
              </div>
            </div>
            <div className="ad-placeholder min-h-[600px] hidden lg:block">📢 Ad Space — Sidebar</div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Related Links</h3>
              <ul className="space-y-2">
                <li><Link href="/continent/asia" className="text-sm text-blue-600 hover:underline">All Asian Countries</Link></li>
                <li><Link href="/quiz" className="text-sm text-blue-600 hover:underline">Geography Quiz</Link></li>
                <li><Link href="/compare" className="text-sm text-blue-600 hover:underline">Compare Countries</Link></li>
                <li><Link href="/random" className="text-sm text-blue-600 hover:underline">Random Country Generator</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}