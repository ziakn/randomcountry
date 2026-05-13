import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";

export type Country = {
  slug: string;
  name: string;
  officialName: string;
  capital: string;
  continent: string;
  region: string;
  population: string;
  populationNumber: number;
  area: number;
  currency: string;
  currencyCode: string;
  language: string;
  timeZone: string;
  callingCode: string;
  tld: string;
  flagCode: string;
  latitude: number;
  longitude: number;
  neighbors: string[];
  funFacts: string[];
  history: string;
  geography: string;
  culture: string;
  food: string;
  famousPlaces: string[];
  travelFacts: string[];
  unMember: boolean;
  island: boolean;
  landlocked: boolean;
};

type CountryRow = Omit<Country, "neighbors" | "funFacts" | "famousPlaces" | "travelFacts" | "unMember" | "island" | "landlocked"> & {
  neighbors: string;
  funFacts: string;
  famousPlaces: string;
  travelFacts: string;
  unMember: number;
  island: number;
  landlocked: number;
};

let db: DatabaseSync | null = null;

function parseList(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function rowToCountry(row: CountryRow): Country {
  return {
    ...row,
    neighbors: parseList(row.neighbors),
    funFacts: parseList(row.funFacts),
    famousPlaces: parseList(row.famousPlaces),
    travelFacts: parseList(row.travelFacts),
    unMember: Boolean(row.unMember),
    island: Boolean(row.island),
    landlocked: Boolean(row.landlocked),
  };
}

function getDb() {
  if (db) return db;

  const dbPath = join(process.cwd(), "data", "app.sqlite");
  mkdirSync(dirname(dbPath), { recursive: true });
  db = new DatabaseSync(dbPath);
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

  return db;
}

export function getCountries(): Country[] {
  return getDb()
    .prepare("SELECT * FROM countries ORDER BY name COLLATE NOCASE")
    .all()
    .map((row) => rowToCountry(row as CountryRow));
}

export function getCountry(slug: string): Country | undefined {
  const aliases: Record<string, string> = {
    uae: "united-arab-emirates",
    usa: "united-states",
    us: "united-states",
    uk: "united-kingdom",
  };
  const normalizedSlug = aliases[slug] ?? slug;
  const row = getDb()
    .prepare("SELECT * FROM countries WHERE slug = ? OR lower(name) = ? LIMIT 1")
    .get(normalizedSlug, normalizedSlug.replace(/-/g, " ")) as CountryRow | undefined;
  return row ? rowToCountry(row) : undefined;
}

export function getCountriesByContinent(continent: string): Country[] {
  const normalized = continent.replace(/-/g, " ").toLowerCase();
  return getCountries().filter((country) => country.continent.toLowerCase() === normalized);
}

export function getCountriesByLetter(letter: string): Country[] {
  const first = letter.slice(0, 1).toLowerCase();
  return getCountries().filter((country) => country.name.toLowerCase().startsWith(first));
}

export function getFlagUrl(country: Pick<Country, "flagCode">) {
  return `https://flagcdn.com/w640/${country.flagCode}.png`;
}

export function formatArea(area: number) {
  return `${area.toLocaleString()} km²`;
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const continents = ["Asia", "Europe", "Africa", "North America", "South America", "Oceania", "Antarctica"];
