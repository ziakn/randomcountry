import type { Country } from "./countries";

export type RootPage = {
  slug: string;
  title: string;
  description: string;
  kind: "tool" | "legal" | "hub" | "travel";
  sections: { heading: string; body: string }[];
  faq?: { question: string; answer: string }[];
};

export const toolPages: RootPage[] = [
  {
    slug: "random-country-generator",
    title: "Random Country Generator",
    description: "Generate a real random country and explore its flag, capital, continent, population, currency, language, and map preview.",
    kind: "tool",
    sections: [
      { heading: "What is a random country generator?", body: "A random country generator is a simple tool that picks a real country from a country database and shows useful facts so you can learn, teach, quiz, or plan ideas quickly." },
      { heading: "How to use this tool", body: "Click generate, review the country card, then open the full country profile for deeper geography, culture, travel, and FAQ sections." },
      { heading: "Why use it?", body: "It is useful for classrooms, trivia practice, writing prompts, geography learning, travel inspiration, and comparing countries." },
    ],
    faq: [
      { question: "Does this generate real countries?", answer: "Yes. It picks from real country records in the site database." },
      { question: "Can I generate by continent?", answer: "Yes. Use the continent generator pages to filter by Asia, Europe, Africa, the Americas, or Oceania." },
    ],
  },
  {
    slug: "random-country-picker",
    title: "Random Country Picker",
    description: "Pick a random country for games, classroom tasks, travel ideas, or geography practice.",
    kind: "tool",
    sections: [
      { heading: "A quick country picker", body: "This page focuses on fast country selection. It is ideal when you only need a fair random country and a compact fact card." },
      { heading: "Useful for groups", body: "Teachers, quiz hosts, and study groups can use the picker to assign countries or start discussion rounds." },
    ],
  },
  {
    slug: "random-country-wheel",
    title: "Random Country Wheel",
    description: "A wheel-style country picker concept with instant random country results.",
    kind: "tool",
    sections: [
      { heading: "Wheel-style picking", body: "Use this page when you want a game-like random selection experience. The result still uses real country facts from the database." },
      { heading: "Fair random results", body: "Each click selects from the available country records, so it works for quizzes, challenges, and classroom turns." },
    ],
  },
  {
    slug: "random-country-by-continent",
    title: "Random Country by Continent",
    description: "Generate a random country from a selected continent and learn regional facts.",
    kind: "tool",
    sections: [
      { heading: "Filtered country generation", body: "Choose a continent first, then generate a random country from that region. This makes the tool more useful for regional lessons." },
    ],
  },
  {
    slug: "random-country-by-letter",
    title: "Random Country by Letter",
    description: "Generate countries starting with A, B, C, and other letters for alphabet games and study tasks.",
    kind: "tool",
    sections: [
      { heading: "Alphabet learning", body: "Letter-based country generation is useful for vocabulary games, geography warmups, and A-to-Z country challenges." },
    ],
  },
  {
    slug: "random-capital-generator",
    title: "Random Capital Generator",
    description: "Generate a random country and see its capital city for geography practice.",
    kind: "tool",
    sections: [
      { heading: "Capital practice", body: "Use this page to quickly practice country and capital pairs using real country records." },
    ],
  },
  {
    slug: "random-country-capital-generator",
    title: "Random Country and Capital Generator",
    description: "Generate a random country and immediately see its capital city.",
    kind: "tool",
    sections: [
      { heading: "Practice capitals", body: "This page emphasizes country-capital pairs, helping users build memory for geography quizzes." },
    ],
  },
  {
    slug: "random-flag-generator",
    title: "Random Flag Generator",
    description: "Generate a random country flag and use it for guessing games or flag study.",
    kind: "tool",
    sections: [
      { heading: "Flag practice", body: "The flag generator shows a flag with country facts, making it useful for recognition practice and classroom activities." },
    ],
  },
  {
    slug: "random-country-map-generator",
    title: "Random Country Map Generator",
    description: "Generate a country and view a simple map-location preview with coordinates and neighboring countries.",
    kind: "tool",
    sections: [
      { heading: "Map-based learning", body: "The result card includes a location preview and neighboring country details to help connect names with geography." },
    ],
  },
  {
    slug: "random-country-quiz",
    title: "Random Country Quiz",
    description: "Use random country facts for quiz practice with flags, capitals, continents, currencies, and languages.",
    kind: "tool",
    sections: [
      { heading: "Quiz with real facts", body: "Generate a country, hide parts of the result, and ask learners to guess the capital, flag, currency, or continent." },
    ],
  },
  {
    slug: "country-of-the-day",
    title: "Country of the Day",
    description: "Discover one featured country each day with quick facts and links to learn more.",
    kind: "tool",
    sections: [
      { heading: "Daily learning habit", body: "A daily country page gives returning users a reason to learn a little geography every day." },
    ],
  },
  {
    slug: "random-travel-destination",
    title: "Random Travel Destination",
    description: "Generate a real country as travel inspiration, with practical facts and links to deeper country guides.",
    kind: "travel",
    sections: [
      { heading: "Travel inspiration, not travel advice", body: "This page suggests countries for inspiration. Always check official travel guidance before booking or visiting." },
    ],
  },
  {
    slug: "random-country-for-school-project",
    title: "Random Country for School Project",
    description: "Pick a country for reports, classroom research, presentations, and geography assignments.",
    kind: "tool",
    sections: [
      { heading: "Student-friendly country prompts", body: "Each generated country includes enough facts to start a school project and links to a fuller profile." },
    ],
  },
  {
    slug: "random-country-name-generator",
    title: "Random Country Name Generator",
    description: "Generate the name of a real country, not a fictional country, with accurate basic facts.",
    kind: "tool",
    sections: [
      { heading: "Real country names", body: "This tool selects real country names from the database. It does not invent fictional countries or fake facts." },
    ],
  },
  {
    slug: "compare-countries",
    title: "Compare Countries",
    description: "Compare countries side by side by population, area, capital, currency, language, region, and time zone.",
    kind: "tool",
    sections: [
      { heading: "Country comparison tool", body: "Use comparison pages to understand how countries differ in size, population, region, language, currency, and basic geography." },
    ],
  },
];

export const legalPages: RootPage[] = [
  {
    slug: "about",
    title: "About Random Country Generator",
    description: "Learn what this website does, why it exists, and how country data is handled.",
    kind: "legal",
    sections: [
      { heading: "What this website does", body: "Random Country Generator helps people discover real countries through tools, country profiles, lists, maps, quizzes, and educational guides." },
      { heading: "Why it exists", body: "The site is designed for students, teachers, quiz players, writers, and curious travelers who want a practical geography reference." },
      { heading: "Data approach", body: "Country records are stored locally in SQLite and can be expanded or corrected as new data is reviewed." },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Contact the Random Country Generator team with questions, corrections, or feedback.",
    kind: "legal",
    sections: [
      { heading: "Contact method", body: "Use the form on this page to reach the editorial team. Messages go straight to a monitored inbox, so there is no email address to copy and no account to create." },
      { heading: "Response expectation", body: "Messages about corrections, accessibility issues, data problems, and partnership requests are reviewed within a few business days." },
      { heading: "Corrections", body: "If you spot outdated country data, include the country name, the field that needs correction, the date you checked it, and a reliable source. Corrections with a source are actioned fastest." },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "Privacy policy for Random Country Generator, including cookies, analytics, and advertising disclosures.",
    kind: "legal",
    sections: [
      { heading: "Information we collect", body: "This site does not require user accounts. If analytics, ads, or contact forms are added, they may process standard technical data such as pages visited and browser information." },
      { heading: "Google advertising cookies", body: "If Google AdSense is enabled, third-party vendors, including Google, may use cookies to serve ads based on a user's prior visits to this website or other websites." },
      { heading: "Personalized ads and opt out", body: "Google's use of advertising cookies enables Google and its partners to serve personalized ads. Users can opt out of personalized advertising through Google Ads Settings, industry opt-out tools, browser settings, and any consent controls added before launch." },
      { heading: "Analytics and consent", body: "If analytics, advertising, or consent tools are added, this policy should be updated with provider names, data purposes, retention notes, and regional consent requirements." },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    description: "Rules and limitations for using the Random Country Generator website.",
    kind: "legal",
    sections: [
      { heading: "Use of the site", body: "Use this website for learning, research, quizzes, and general reference. Do not misuse the site or attempt to disrupt its service." },
      { heading: "No guarantee", body: "Country information may change. The site aims to be useful and accurate but cannot guarantee that every detail is always current." },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    description: "Important disclaimer about country data, maps, borders, and travel information.",
    kind: "legal",
    sections: [
      { heading: "Country data changes", body: "Population, government details, travel rules, and other country data can change. Review important information with official sources." },
      { heading: "Maps and borders", body: "Map previews may be simplified and are not official legal or diplomatic statements about boundaries." },
      { heading: "Travel information", body: "Travel inspiration pages are not safety advisories. Always check official travel advice before making plans." },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description: "Cookie policy for analytics, ads, and optional user preferences.",
    kind: "legal",
    sections: [
      { heading: "How cookies may be used", body: "Cookies may be used for analytics, ads, consent preferences, and remembering simple site settings." },
      { heading: "Managing cookies", body: "You can manage or block cookies in your browser. Some optional features may work differently if cookies are disabled." },
    ],
  },
  {
    slug: "editorial-policy",
    title: "Editorial Policy",
    description: "How the site collects, reviews, updates, and corrects country information.",
    kind: "legal",
    sections: [
      { heading: "Data review", body: "Country facts should be checked against reliable sources before publication and reviewed regularly, especially population, names, currencies, travel notes, and political status wording." },
      { heading: "Original content", body: "Country and learning pages should explain facts in original language, avoid copied descriptions, and add practical value through examples, tables, FAQs, and internal links." },
      { heading: "Corrections", body: "Corrections should be logged with the date, field changed, source used, and a short note explaining why the update was made." },
    ],
  },
  {
    slug: "data-sources",
    title: "Data Sources",
    description: "Country data, flags, maps, population, and update notes for this website.",
    kind: "legal",
    sections: [
      { heading: "Country data", body: "Country records are imported into SQLite from the REST Countries API and normalized for the generator, directory, country pages, lists, maps, and quizzes." },
      { heading: "Flags", body: "Flag images are loaded from FlagCDN using ISO country codes. Add attribution or replace with your preferred flag source if needed." },
      { heading: "Update frequency", body: "Population, travel, safety, and cost pages should include visible review dates and be updated regularly before AdSense or public promotion." },
    ],
  },
  {
    slug: "sitemap",
    title: "HTML Sitemap",
    description: "Browse the main pages and sections of the Random Country Generator website.",
    kind: "hub",
    sections: [
      { heading: "Main sections", body: "Use this page to find tools, countries, continent pages, list pages, learning articles, quiz pages, map pages, and trust pages." },
    ],
  },
  {
    slug: "quizzes",
    title: "Country Quizzes",
    description: "Practice geography with flag, capital, map, continent, currency, and language quizzes.",
    kind: "hub",
    sections: [
      { heading: "Quiz hub", body: "Choose a quiz mode to practice country recognition, capitals, flags, currencies, languages, or continent knowledge." },
    ],
  },
  {
    slug: "travel",
    title: "Travel Inspiration",
    description: "Explore country-based travel inspiration pages with careful, general information.",
    kind: "travel",
    sections: [
      { heading: "Travel pages", body: "These pages are for inspiration only. Safety, cost, and entry information must be updated and checked before relying on it." },
    ],
  },
];

export const rootPages = [...toolPages, ...legalPages];

export const quizPages = [
  ["guess-the-country", "Guess the Country", "Use clues like capital, continent, and flag to guess the country."],
  ["guess-the-flag", "Guess the Flag", "Study random flags and identify the matching country."],
  ["guess-the-capital", "Guess the Capital", "Match countries with their capital cities."],
  ["country-map-quiz", "Country Map Quiz", "Practice recognizing countries by location and map clues."],
  ["continent-quiz", "Continent Quiz", "Guess which continent a country belongs to."],
  ["currency-quiz", "Currency Quiz", "Match countries with their currencies."],
  ["language-quiz", "Language Quiz", "Practice official and widely used languages by country."],
  ["world-countries-hard", "World Countries Hard Quiz", "A harder quiz mode for geography fans."],
  ["world-countries-easy", "World Countries Easy Quiz", "An easier quiz mode for beginners and classrooms."],
] as const;

export const learnPages = [
  ["what-is-a-country", "What Is a Country?", "A country is usually understood as a political territory with people, institutions, borders, and some form of recognized sovereignty."],
  ["how-many-countries-are-there", "How Many Countries Are There?", "Counts vary depending on whether you include UN members, observer states, disputed territories, and dependencies."],
  ["continents-of-the-world", "Continents of the World", "Learn the common continent model and how countries are grouped by region."],
  ["countries-by-population", "Countries by Population", "Compare countries by population size and learn why population figures change over time."],
  ["countries-by-area", "Countries by Area", "Explore the largest and smallest countries by land area."],
  ["landlocked-countries", "Landlocked Countries", "Landlocked countries have no direct coastline and often rely on neighboring transit routes."],
  ["island-countries", "Island Countries", "Island countries are made up entirely or primarily of islands."],
  ["countries-with-multiple-capitals", "Countries With Multiple Capitals", "Some countries divide government functions among more than one city."],
  ["countries-and-currencies", "Countries and Currencies", "Learn how currencies are used across countries and regions."],
  ["countries-and-languages", "Countries and Languages", "Many countries have more than one official or widely used language."],
  ["countries-by-time-zone", "Countries by Time Zone", "Large countries can span several time zones, while smaller countries often use one."],
  ["un-member-countries", "UN Member Countries", "UN membership is one common way to count sovereign states."],
  ["non-un-countries", "Non-UN Countries and Territories", "Non-member entities should be explained carefully and neutrally."],
  ["countries-and-capitals", "Countries and Capitals", "A guide to capital cities and why some countries have special capital arrangements."],
] as const;

export const listPages = [
  ["all-countries", "All Countries", "A complete list of countries currently available in this database."],
  ["countries-by-continent", "Countries by Continent", "Countries grouped by continent for faster regional browsing."],
  ["countries-by-population", "Countries by Population", "Countries sorted by estimated population."],
  ["countries-by-area", "Countries by Area", "Countries sorted by total area."],
  ["countries-by-capital", "Countries by Capital", "Country and capital city reference table."],
  ["countries-by-currency", "Countries by Currency", "Countries grouped by their currencies."],
  ["countries-by-language", "Countries by Language", "Countries grouped by major official or widely used languages."],
  ["smallest-countries", "Smallest Countries", "A list page focused on smaller countries by area."],
  ["largest-countries", "Largest Countries", "A list page focused on larger countries by area."],
  ["island-countries", "Island Countries", "Countries in this database that are island countries."],
  ["landlocked-countries", "Landlocked Countries", "Countries in this database without a coastline."],
  ["countries-in-europe", "Countries in Europe", "European countries in the database."],
  ["countries-in-asia", "Countries in Asia", "Asian countries in the database."],
  ["countries-in-africa", "Countries in Africa", "African countries in the database."],
  ["countries-in-oceania", "Countries in Oceania", "Oceania countries in the database."],
  ["countries-in-south-america", "Countries in South America", "South American countries in the database."],
  ["countries-in-north-america", "Countries in North America", "North American countries in the database."],
] as const;

export const mapPages = [
  ["world-map", "World Map", "Browse countries with a simple world map learning page."],
  ["countries-of-asia", "Countries of Asia Map", "A regional map page for Asian countries."],
  ["countries-of-europe", "Countries of Europe Map", "A regional map page for European countries."],
  ["countries-of-africa", "Countries of Africa Map", "A regional map page for African countries."],
  ["countries-of-north-america", "Countries of North America Map", "A regional map page for North American countries."],
  ["countries-of-south-america", "Countries of South America Map", "A regional map page for South American countries."],
  ["countries-of-oceania", "Countries of Oceania Map", "A regional map page for Oceania countries."],
  ["random-country-map", "Random Country Map", "Generate a country and view its map-location facts."],
] as const;

export const travelPages = [
  ["random-travel-destination", "Random Travel Destination", "Generate a country for travel inspiration."],
  ["best-countries-to-visit", "Best Countries to Visit", "A maintainable travel inspiration page that should be reviewed regularly."],
  ["safe-countries-to-visit", "Safe Countries to Visit", "Safety can change quickly, so this page should stay general and direct readers to official travel advisories."],
  ["cheap-countries-to-visit", "Cheap Countries to Visit", "Cost pages need regular review because prices and exchange rates change."],
  ["countries-with-beaches", "Countries With Beaches", "Country inspiration for coastline and beach interests."],
  ["countries-with-mountains", "Countries With Mountains", "Country inspiration for mountain landscapes."],
  ["countries-for-history-lovers", "Countries for History Lovers", "Country inspiration for museums, ruins, and historic cities."],
  ["countries-for-food-lovers", "Countries for Food Lovers", "Country inspiration for food culture and regional dishes."],
] as const;

export function getDailyCountry(countries: Country[]) {
  const now = new Date();
  const daySeed = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 86400000;
  return countries[Math.abs(Math.floor(daySeed)) % countries.length];
}
