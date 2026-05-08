import { notFound } from "next/navigation";
import { getCountryByCode, getAllCountries } from "@/utils/getRandomCountry";
import CountryCard from "@/components/CountryCard";
import GoogleMap from "@/components/GoogleMap";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import Link from "next/link";

type Props = {
  params: Promise<{ code: string }>;
};

// Static facts for country pages - extended dataset
const COUNTRY_CONTENT: Record<string, {
  about: string;
  geography: string;
  economy: string;
  culture: string;
  religion: string;
  food: string[];
  attractions: string[];
  bestTime: string;
  costEstimate: string;
  funFacts: string[];
  education: string;
  faqs: { q: string; a: string }[];
}> = {
  af: {
    about: "Afghanistan, officially the Islamic Emirate of Afghanistan, is a landlocked country located at the crossroads of Central and South Asia. Known for its rugged mountain terrain, including the Hindu Kush range, Afghanistan has a rich history spanning thousands of years, serving as a crucial crossroads for trade and cultural exchange along the ancient Silk Road.",
    geography: "Afghanistan is a landlocked country dominated by the Hindu Kush mountain range that runs from northeast to southwest. The country features diverse terrain including fertile valleys, expansive deserts, and high mountain peaks reaching over 7,000 meters. Major rivers include the Helmand and Amu Darya. The climate varies from arid to semi-arid, with cold winters and hot summers.",
    economy: "Afghanistan's economy is largely based on agriculture, with opium production being historically significant despite international efforts to curb it. The country possesses significant mineral resources including lithium, copper, and rare earth elements. Remittances from the diaspora contribute substantially to the economy. Agriculture employs the majority of the workforce.",
    culture: "Afghan culture is deeply rooted in Islamic traditions and tribal customs. Poetry, music, and carpet weaving are central cultural traditions. The traditional sport of Buzkashi, involving horseback riders competing for a goat carcass, is considered the national sport. Afghan cuisine features dishes like Kabuli Pulao and Mantu.",
    religion: "Islam is the predominant religion, with Sunni Muslims comprising approximately 80% of the population and Shia Muslims making up about 19%. Religious practices deeply influence daily life, law, and governance in Afghanistan.",
    food: ["Kabuli Pulao - the national rice dish with lamb and carrots", "Mantu - steamed dumplings with spiced meat", "Ashak - leek-filled dumplings with garlic yogurt", "Bolani - stuffed flatbread", "Kofta - spiced meatballs"],
    attractions: ["Bamiyan Valley (remnants of the giant Buddha statues)", "Band-e Amir National Park (stunning blue lakes)", "Minaret of Jam (12th-century UNESCO site)", "Herat Citadel (ancient fortress)", "Khyber Pass (historic mountain pass)"],
    bestTime: "April to June and September to October offer the most pleasant weather conditions",
    costEstimate: "$20-40/day for budget travelers",
    funFacts: ["Afghanistan is home to the stunning Band-e Amir lakes, the country's first national park", "The ancient city of Balkh was once known as the 'Mother of Cities'", "Afghan lapis lazuli has been mined for over 6,000 years and was used in Tutankhamun's death mask", "Kabul is one of the highest capital cities in the world at 1,790 meters elevation"],
    education: "Education faces challenges due to decades of conflict, but the country has several universities including Kabul University. Literacy rates have been improving, particularly in urban areas.",
    faqs: [
      { q: "Is it safe to visit Afghanistan?", a: "Most governments advise against all travel to Afghanistan due to security concerns. The security situation remains unstable in many regions." },
      { q: "What is the capital of Afghanistan?", a: "Kabul is the capital and largest city of Afghanistan." },
      { q: "What currency does Afghanistan use?", a: "The Afghan afghani (AFN) is the official currency." },
      { q: "What languages are spoken?", a: "Dari and Pashto are the official languages, with numerous other languages spoken across the country." },
    ],
  },
  al: {
    about: "Albania, officially the Republic of Albania, is a small but fascinating country in Southeastern Europe. Bordered by Montenegro, Kosovo, North Macedonia, and Greece, with coastlines on the Adriatic and Ionian Seas, Albania is known for its stunning beaches, ancient ruins, and mountainous interior. The country has undergone significant transformation since emerging from decades of communist isolation in the early 1990s.",
    geography: "Albania features diverse geography including 362 km of coastline along the Adriatic and Ionian Seas, the Albanian Alps (Accursed Mountains) in the north, and fertile plains in the west. The country has over 152 rivers and lakes, including Lake Shkodër (one of the largest in Southern Europe). Mount Korab at 2,764 meters is the highest point.",
    economy: "Albania has transitioned from a centrally planned economy to a market-oriented one. Key sectors include tourism, agriculture (olives, citrus, tobacco), hydropower, and textiles. The country is increasingly attracting foreign investment and is a candidate for European Union membership.",
    culture: "Albanian culture blends ancient Illyrian, Greek, Roman, and Ottoman influences. The Kanun, an ancient code of honor, still influences customs in northern regions. Folk music (iso-polyphony) is recognized by UNESCO. The country celebrates numerous festivals, and hospitality is a cornerstone of social life.",
    religion: "Albania is known for religious tolerance. Islam (particularly Sunni) is practiced by about 57% of the population, Christianity (Orthodox and Catholic) by about 17%, with a significant irreligious population of about 25%.",
    food: ["Tavë Kosi - baked lamb with yogurt and rice", "Byrek - savory filled pastry", "Fërgesë - peppers, tomatoes, and cottage cheese", "Qofte - Albanian meatballs", "Baklava - sweet pastry with nuts and honey"],
    attractions: ["Butrint National Park (UNESCO World Heritage Site)", "Berat - the 'City of a Thousand Windows'", "Gjirokastër (UNESCO World Heritage city)", "Blue Eye Spring (Syri i Kaltër)", "Albanian Riviera coastline", "Krujë Castle and Skanderbeg Museum"],
    bestTime: "April to June and September to October are ideal, with pleasant temperatures and fewer crowds",
    costEstimate: "$30-60/day for budget to mid-range travelers",
    funFacts: ["Albania has over 750,000 concrete bunkers built during the communist era", "The country is one of only two in Europe where you nod 'no' and shake your head 'yes'", "Albania has four UNESCO World Heritage Sites for its small size", "The Albanian Riviera is considered Europe's last undiscovered coastline"],
    education: "Public education is free and compulsory for 9 years. The University of Tirana (founded 1957) is the oldest and largest university. Education has seen significant improvements since the 1990s.",
    faqs: [
      { q: "Is Albania safe for tourists?", a: "Yes, Albania is generally very safe for tourists. Violent crime against visitors is rare. Standard precautions apply in crowded areas." },
      { q: "Is Albania expensive?", a: "Albania is one of Europe's most affordable destinations. A meal costs $3-8, and accommodation is very reasonably priced." },
      { q: "Do I need a visa?", a: "Citizens of most EU countries, the US, Canada, and many others can enter Albania visa-free for up to 90 days." },
      { q: "What is Albania famous for?", a: "Albania is famous for its stunning coastline, ancient history, Ottoman architecture, and remarkable hospitality." },
    ],
  },
};

// Generic content generator for countries without specific entries
function generateContent(country: any) {
  return {
    about: `${country.name} (${country.officialName}) is located in ${country.region}${country.subregion !== 'N/A' ? `, in the ${country.subregion}` : ''}. Its capital city is ${country.capital}, serving as the political and administrative center. With a population of ${country.population} people spread across ${country.area > 0 ? country.area.toLocaleString() : 'thousands of'} square kilometers, ${country.name} is a significant part of the global community.`,
    geography: `${country.name} is located at coordinates ${country.coordinates[0]}°N, ${country.coordinates[1]}°E in ${country.region}.${country.area > 0 ? ` The country covers an area of ${country.area.toLocaleString()} square kilometers.` : ''}${country.borders.length > 0 ? ` It shares land borders with ${country.borders.join(', ')}.` : ''}${country.timezones.length > 0 ? ` The country spans timezones including ${country.timezones.slice(0, 2).join(' and ')}.` : ''}`,
    economy: `${country.name}'s economy is influenced by its geographic location, natural resources, and population of ${country.population}. The official currency is ${country.currency}. The country's economy contributes to the broader ${country.region} economic landscape.`,
    culture: `The culture of ${country.name} reflects its diverse population and rich heritage. The primary languages spoken are ${country.language}. With traditions shaped by centuries of history, ${country.name} offers a unique cultural experience including distinctive cuisine, art, music, and festivals.`,
    religion: `${country.name} is home to diverse religious communities. ${country.region === 'Asia' ? 'Buddhism, Islam, Hinduism, Christianity, and various indigenous religions are practiced.' : country.region === 'Europe' ? 'Christianity is historically dominant, though many countries have growing secular populations and religious diversity.' : country.region === 'Africa' ? 'Islam and Christianity are widely practiced alongside traditional African religions.' : country.region === 'North America' ? 'Christianity is the predominant religion, with significant religious diversity including growing secular populations.' : 'Various religious traditions are practiced across the region.'}`,
    food: ["Traditional local cuisine featuring regional ingredients", "Street food specialties popular with locals", "Fresh seafood and locally sourced produce", "Traditional bread and pastries", "Regional specialties unique to the area"],
    attractions: [`${country.capital} - the vibrant capital city`, `${country.name} National Museum`, `Historic old town and markets`, `Natural landscapes and scenic viewpoints`, `Cultural heritage sites and monuments`],
    bestTime: "Spring and autumn generally offer the best weather for visiting, with mild temperatures and lower rainfall.",
    costEstimate: "$30-80/day depending on travel style and location within the country.",
    funFacts: [
      `${country.name} has a population of ${country.population} people.`,
      `The capital, ${country.capital}, is the largest city in the country.`,
      `${country.name} uses the currency ${country.currency}.`,
      `Languages spoken include ${country.language}.`,
      `${country.name} covers an area of ${country.area > 0 ? country.area.toLocaleString() + ' km²' : 'varied terrain'}.`,
      `The country is located in the ${country.region} region.`,
      `${country.name} borders ${country.borders.length} country${country.borders.length !== 1 ? 's' : ''}: ${country.borders.join(', ') || 'none (island nation)'}.`,
    ],
    education: `${country.name} has an established education system that serves its population of ${country.population}. Education policies and institutions reflect the country's cultural values and development priorities.`,
    faqs: [
      { q: `What is the capital of ${country.name}?`, a: `The capital of ${country.name} is ${country.capital}.` },
      { q: `What is the population of ${country.name}?`, a: `The population of ${country.name} is approximately ${country.population} people.` },
      { q: `What currency is used in ${country.name}?`, a: `The official currency is ${country.currency}.` },
      { q: `What languages are spoken in ${country.name}?`, a: `The primary languages are ${country.language}.` },
      { q: `Where is ${country.name} located?`, a: `${country.name} is in ${country.region}${country.subregion !== 'N/A' ? `, specifically in the ${country.subregion}` : ''}.` },
      { q: `What is the area of ${country.name}?`, a: `${country.name} covers an area of ${country.area > 0 ? country.area.toLocaleString() + ' km²' : 'varied terrain'}.` },
      { q: `What are the time zones in ${country.name}?`, a: `${country.timezones.length > 0 ? country.timezones.join(', ') : 'UTC+0'}` },
      { q: `Is ${country.name} a safe travel destination?`, a: `Safety varies by region. We recommend checking your government's travel advisory for up-to-date information on ${country.name} before planning your trip.` },
    ],
  };
}

function getRelatedCountries(country: any, allCountries: any[]): { country: any; reason: string }[] {
  const related = allCountries
    .filter((c) => c.code !== country.code && c.region === country.region)
    .sort((a, b) => {
      const popDiffA = Math.abs((a.populationRaw || 0) - (country.populationRaw || 0));
      const popDiffB = Math.abs((b.populationRaw || 0) - (country.populationRaw || 0));
      return popDiffA - popDiffB;
    })
    .slice(0, 6);

  return related.map((c) => ({
    country: c,
    reason: `Same region: ${country.region}`,
  }));
}

function getFunFacts(country: any): { text: string; emoji?: string }[] {
  const facts: { text: string; emoji?: string }[] = [];
  const content = COUNTRY_CONTENT[country.code];

  if (content) {
    return content.funFacts.map((f) => ({ text: f }));
  }

  facts.push({ text: `${country.name} has a population of approximately ${country.population}`, emoji: "👥" });
  if (country.area > 0) {
    facts.push({ text: `Covering an area of ${country.area.toLocaleString()} km²`, emoji: "📐" });
  }
  facts.push({ text: `Capital: ${country.capital}`, emoji: "🏛️" });
  facts.push({ text: `Currency: ${country.currency}`, emoji: "💰" });
  facts.push({ text: `Languages: ${country.language}`, emoji: "🗣️" });
  if (country.borders.length > 0) {
    facts.push({ text: `Borders ${country.borders.length} countries`, emoji: "🗺️" });
  }
  if (country.timezones.length > 0) {
    facts.push({ text: `Timezone(s): ${country.timezones.slice(0, 3).join(", ")}`, emoji: "🕐" });
  }
  facts.push({ text: `Region: ${country.region}${country.subregion !== "N/A" ? ` / ${country.subregion}` : ""}`, emoji: "🌍" });

  return facts;
}

export async function generateStaticParams() {
  const countries = getAllCountries();
  return countries.map((country) => ({
    code: country.code,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { code } = await params;
  const country = getCountryByCode(code);

  if (!country) {
    return { title: "Country Not Found" };
  }

  const content = COUNTRY_CONTENT[code] || generateContent(country);
  const firstFact = content.funFacts?.[0] || content.food?.[0] || "";
  const description = `Discover ${country.name}: capital ${country.capital}, population ${country.population}, currency ${country.currency}. Learn about its geography, culture, ${firstFact.toLowerCase()}.`;

  return {
    title: {
      absolute: `${country.name} - Country Profile, Facts & Travel Guide`,
    },
    description: description,
    alternates: {
      canonical: `/country/${country.code}`,
    },
    openGraph: {
      title: `${country.name} - Country Profile & Travel Guide`,
      description: `Explore ${country.name}: ${country.capital} • ${country.population} • ${country.currency}`,
      url: `https://randomcountry.ziamuhammad.com/country/${country.code}`,
      type: "article",
      locale: "en_US",
      siteName: "Random Country Generator",
      images: [
        {
          url: country.flagUrl,
          width: 800,
          height: 400,
          alt: `Flag of ${country.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${country.name} - Country Profile`,
      description: description.slice(0, 200),
      images: [country.flagUrl],
    },
    keywords: [
      country.name,
      country.capital,
      `${country.name} country`,
      `${country.name} facts`,
      `${country.name} travel`,
      `${country.name} geography`,
      `${country.name} population`,
      `${country.code} country code`,
      `${country.region} countries`,
    ],
  };
}

export default async function CountryPage({ params }: Props) {
  const { code } = await params;
  const country = getCountryByCode(code);

  if (!country) {
    notFound();
  }

  const allCountries = getAllCountries();
  const related = getRelatedCountries(country, allCountries);
  const content = COUNTRY_CONTENT[code] || generateContent(country);
  const funFacts = getFunFacts(country);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${country.name} - Country Profile & Travel Guide`,
    description: `Discover ${country.name}: capital ${country.capital}, population ${country.population}`,
    author: {
      "@type": "Organization",
      name: "Random Country Generator",
    },
    publisher: {
      "@type": "Organization",
      name: "Random Country Generator",
      logo: {
        "@type": "ImageObject",
        url: "https://randomcountry.ziamuhammad.com/logo.png",
      },
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    image: country.flagUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://randomcountry.ziamuhammad.com/country/${country.code}`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://randomcountry.ziamuhammad.com/" },
      { "@type": "ListItem", position: 2, name: "Countries", item: "https://randomcountry.ziamuhammad.com/countries" },
      { "@type": "ListItem", position: 3, name: country.name, item: `https://randomcountry.ziamuhammad.com/country/${country.code}` },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <BreadcrumbBar
          items={[
            { label: "Home", href: "/" },
            { label: "Countries", href: "/countries" },
            { label: country.region, href: `/continent/${country.region.toLowerCase()}` },
            { label: country.name },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={country.flagUrl}
                  alt={`Flag of ${country.name}`}
                  className="w-24 h-16 rounded-lg shadow-md"
                />
                <div>
                  <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {country.code.toUpperCase()}
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
                {country.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {country.officialName}
              </p>
              {country.region !== "N/A" && (
                <span className="inline-block mt-3 px-3 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-semibold rounded-full">
                  {country.region}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <QuickStat icon="🏛️" label="Capital" value={country.capital} />
              <QuickStat icon="👥" label="Population" value={country.population} />
              <QuickStat icon="💰" label="Currency" value={country.currency.split("(")[0].trim()} />
              <QuickStat icon="🗣️" label="Language" value={country.language} />
              <QuickStat icon="🗺️" label="Region" value={country.region} />
              {country.area > 0 && (
                <QuickStat icon="📐" label="Area" value={`${country.area.toLocaleString()} km²`} />
              )}
            </div>
          </div>
        </div>

        {/* Ad placement - after hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="ad-placeholder">
            📢 Ad Space - Header/Below Hero
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-10">
            {/* About Country */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About {country.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{content.about}</p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{content.geography}</p>
            </section>

            {/* Economy */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Economy</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{content.economy}</p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Currency: <strong>{content.food ? content.food[4] : country.currency}</strong></p>
            </section>

            {/* Culture */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Culture</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{content.culture}</p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Religion Overview</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{content.religion}</p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Famous Food</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {content.food.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-700 dark:text-gray-300">
                    <span className="text-lg">🍽️</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Tourist Attractions */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Best Places to Visit</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {content.attractions.map((attr, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/30 dark:to-gray-700/10 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="text-xl">📍</span>
                    <span className="text-gray-700 dark:text-gray-300">{attr}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Travel Guide */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Travel Guide</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    🗓️ Best Time to Visit
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{content.bestTime}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    💰 Cost Estimate
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{content.costEstimate}</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2">Education System</h3>
              <p className="text-gray-600 dark:text-gray-300">{content.education}</p>
            </section>

            {/* Map */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe2 className="w-6 h-6" /> Location Map
              </h2>
              <GoogleMap countryName={country.name} coordinates={country.coordinates} />
            </section>

            {/* Fun Facts */}
            <section className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" /> Fun Facts &amp; Interesting Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {funFacts.map((fact, i) => (
                  <div key={i} className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                    <span className="text-xl mr-2">{fact.emoji || "📌"}</span>
                    <span className="text-gray-800 dark:text-gray-200">{fact.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ - Ad placement mid article */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {content.faqs.map((faq, i) => (
                  <details key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{faq.q}</span>
                      <span className="ml-4 text-gray-400 transition-transform group-open:rotate-90">→</span>
                    </summary>
                    <p className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Share Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Share This</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const url = `https://twitter.com/intent/tweet?text=Discover ${country.name}!&url=${typeof window !== "undefined" ? window.location.href : ""}`;
                    window.open(url, "_blank");
                  }}
                  className="flex-1 bg-[#1DA1F2] text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Twitter
                </button>
                <button
                  onClick={() => {
                    const url = `https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`;
                    window.open(url, "_blank");
                  }}
                  className="flex-1 bg-[#4267B2] text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </button>
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "");
                    }
                  }}
                  className="flex-1 bg-gray-800 dark:bg-gray-700 text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  Copy Link
                </button>
              </div>
            </div>

            {/* Sidebar Ad */}
            <div className="ad-placeholder min-h-[280px]">
              📢 Ad Space - Sidebar
            </div>

            {/* Related Countries */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Related Countries</h3>
              <div className="space-y-3">
                {related.map((rel) => (
                  <Link
                    key={rel.country.code}
                    href={`/country/${rel.country.code}`}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                  >
                    <img src={rel.country.flagUrl} alt={rel.country.name} className="w-10 h-7 rounded shadow-sm" loading="lazy" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rel.country.name}</span>
                    <span className="ml-auto text-xs text-gray-400">{rel.reason}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Side Banner Ad */}
            <div className="ad-placeholder min-h-[280px]">
              📢 Ad Space - Native
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="ad-placeholder">
          📢 Ad Space - In-Feed
        </div>
      </div>
    </main>
  );
}

function QuickStat({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
      <span className="text-xl mb-1">{icon}</span>
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-gray-900 dark:text-white mt-1 truncate">{value}</p>
    </div>
  );
}