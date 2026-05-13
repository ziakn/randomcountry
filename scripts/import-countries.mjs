import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const baseEndpoint = "https://restcountries.com/v3.1/all";
const fieldGroups = [
  "name,cca2,cca3,capital,region,subregion,continents,population,area,currencies",
  "cca3,languages,timezones,idd,tld,latlng,borders,unMember,independent,landlocked",
];
const dbPath = join(process.cwd(), "data", "app.sqlite");

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const formatPopulation = (value) => {
  if (value >= 1_000_000_000) return `${Number((value / 1_000_000_000).toFixed(2))} billion`;
  if (value >= 1_000_000) return `${Number((value / 1_000_000).toFixed(1))} million`;
  if (value >= 1_000) return `${Number((value / 1_000).toFixed(1))} thousand`;
  return String(value);
};

const asList = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);

const getCurrency = (currencies = {}) => {
  const entries = Object.entries(currencies);
  if (entries.length === 0) return { currency: "Not listed", currencyCode: "" };
  const [code, detail] = entries[0];
  return { currency: detail?.name || code, currencyCode: code };
};

const getCallingCode = (idd = {}) => {
  const root = idd.root || "";
  const suffix = Array.isArray(idd.suffixes) && idd.suffixes.length ? idd.suffixes[0] : "";
  return root || suffix ? `${root}${suffix}` : "Not listed";
};

const makeCountryText = (country, neighbors) => {
  const name = country.name.common;
  const continent = country.continents?.[0] || country.region || "the world";
  const region = country.subregion || country.region || continent;
  const capital = country.capital?.[0] || "No official capital listed";
  const languageNames = Object.values(country.languages || {});
  const languages = languageNames.length ? languageNames.join(", ") : "Not listed";
  const timezones = asList(country.timezones).join(", ") || "Not listed";
  const neighborText = neighbors.length ? neighbors.join(", ") : "no listed land-border neighbors";

  return {
    history: `${name} is listed in the country database with official and common names, regional classification, population, area, and international identifiers. Add a reviewed historical summary before publishing this page as a final encyclopedia-style profile.`,
    geography: `${name} is in ${region}, ${continent}. Its listed coordinates are ${country.latlng?.[0] ?? 0}, ${country.latlng?.[1] ?? 0}; it has ${neighborText}.`,
    culture: `${name} uses ${languages} in this dataset. Culture, traditions, education, sport, arts, and daily life vary by region and should be expanded with reviewed local sources.`,
    food: `Food culture in ${name} should be expanded with reviewed culinary sources. This starter record keeps the page factual and avoids inventing dishes that were not present in the source dataset.`,
    famousPlaces: [capital, `${region} landmarks`, "Museums, historic sites, and natural areas to verify"],
    travelFacts: [`Capital or main administrative city: ${capital}`, `Time zone data: ${timezones}`, "Check official sources for entry, safety, and transport information."],
    funFacts: [
      `${name} is grouped under ${continent}.`,
      `${name} has a listed area of ${Math.round(country.area || 0).toLocaleString()} km².`,
      country.unMember ? `${name} is listed as a UN member.` : `${name} is not listed as a UN member in the source data.`,
    ],
  };
};

async function main() {
  const merged = new Map();
  for (const fields of fieldGroups) {
    const endpoint = `${baseEndpoint}?fields=${fields}`;
    console.log(`Fetching country data from ${endpoint}`);
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
    }
    const batch = await response.json();
    for (const country of batch) {
      merged.set(country.cca3, { ...(merged.get(country.cca3) || {}), ...country });
    }
  }

  const rawCountries = Array.from(merged.values());
  const codeToName = new Map(rawCountries.map((country) => [country.cca3, country.name.common]));

  const countries = rawCountries
    .filter((country) => country?.name?.common && country?.cca2)
    .map((country) => {
      const neighbors = asList(country.borders).map((code) => codeToName.get(code) || code).sort();
      const { currency, currencyCode } = getCurrency(country.currencies);
      const language = Object.values(country.languages || {}).join(", ") || "Not listed";
      const continent = country.continents?.[0] || country.region || "Other";
      const capital = country.capital?.[0] || "No official capital listed";
      const text = makeCountryText(country, neighbors);

      return {
        slug: slugify(country.name.common),
        name: country.name.common,
        officialName: country.name.official || country.name.common,
        capital,
        continent,
        region: country.subregion || country.region || continent,
        population: formatPopulation(country.population || 0),
        populationNumber: country.population || 0,
        area: Math.round(country.area || 0),
        currency,
        currencyCode,
        language,
        timeZone: asList(country.timezones).join(", ") || "Not listed",
        callingCode: getCallingCode(country.idd),
        tld: asList(country.tld)[0] || "",
        flagCode: country.cca2.toLowerCase(),
        latitude: country.latlng?.[0] || 0,
        longitude: country.latlng?.[1] || 0,
        neighbors,
        unMember: Boolean(country.unMember),
        island: !country.landlocked && neighbors.length === 0,
        landlocked: Boolean(country.landlocked),
        ...text,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  mkdirSync(dirname(dbPath), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec("PRAGMA busy_timeout = 10000;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS countries (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      officialName TEXT NOT NULL,
      capital TEXT NOT NULL,
      continent TEXT NOT NULL,
      region TEXT NOT NULL,
      population TEXT NOT NULL,
      populationNumber INTEGER NOT NULL,
      area INTEGER NOT NULL,
      currency TEXT NOT NULL,
      currencyCode TEXT NOT NULL,
      language TEXT NOT NULL,
      timeZone TEXT NOT NULL,
      callingCode TEXT NOT NULL,
      tld TEXT NOT NULL,
      flagCode TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      neighbors TEXT NOT NULL,
      funFacts TEXT NOT NULL,
      history TEXT NOT NULL,
      geography TEXT NOT NULL,
      culture TEXT NOT NULL,
      food TEXT NOT NULL,
      famousPlaces TEXT NOT NULL,
      travelFacts TEXT NOT NULL,
      unMember INTEGER NOT NULL,
      island INTEGER NOT NULL,
      landlocked INTEGER NOT NULL
    );
  `);

  const insert = db.prepare(`
    INSERT OR REPLACE INTO countries (
      slug, name, officialName, capital, continent, region, population, populationNumber, area,
      currency, currencyCode, language, timeZone, callingCode, tld, flagCode, latitude, longitude,
      neighbors, funFacts, history, geography, culture, food, famousPlaces, travelFacts,
      unMember, island, landlocked
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  db.exec("BEGIN IMMEDIATE TRANSACTION;");
  try {
    db.exec("DELETE FROM countries;");
    for (const country of countries) {
      insert.run(
        country.slug,
        country.name,
        country.officialName,
        country.capital,
        country.continent,
        country.region,
        country.population,
        country.populationNumber,
        country.area,
        country.currency,
        country.currencyCode,
        country.language,
        country.timeZone,
        country.callingCode,
        country.tld,
        country.flagCode,
        country.latitude,
        country.longitude,
        JSON.stringify(country.neighbors),
        JSON.stringify(country.funFacts),
        country.history,
        country.geography,
        country.culture,
        country.food,
        JSON.stringify(country.famousPlaces),
        JSON.stringify(country.travelFacts),
        country.unMember ? 1 : 0,
        country.island ? 1 : 0,
        country.landlocked ? 1 : 0
      );
    }
    db.exec("COMMIT;");
  } catch (error) {
    db.exec("ROLLBACK;");
    throw error;
  }

  console.log(`Imported ${countries.length} country records into ${dbPath}`);
  console.log(`UN members: ${countries.filter((country) => country.unMember).length}`);
  console.log(`Independent records: ${rawCountries.filter((country) => country.independent).length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
