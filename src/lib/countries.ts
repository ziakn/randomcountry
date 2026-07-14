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
  /** Set once a country profile has been rewritten with original, human-reviewed copy. */
  reviewed: boolean;
  reviewedAt: string;
};

type CountryRow = Omit<Country, "neighbors" | "funFacts" | "famousPlaces" | "travelFacts" | "unMember" | "island" | "landlocked" | "reviewed"> & {
  neighbors: string;
  funFacts: string;
  famousPlaces: string;
  travelFacts: string;
  unMember: number;
  island: number;
  landlocked: number;
  reviewed: number;
  reviewedAt: string;
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
    reviewed: Boolean(row.reviewed),
  };
}

export function getDb() {
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

  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      publishAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'scheduled',
      author TEXT NOT NULL DEFAULT '',
      tags TEXT NOT NULL DEFAULT '[]',
      sections TEXT NOT NULL DEFAULT '[]',
      faq TEXT NOT NULL DEFAULT '[]'
    );
    CREATE INDEX IF NOT EXISTS posts_publish_idx ON posts (status, publishAt);
  `);

  const postColumns = db.prepare("PRAGMA table_info(posts);").all() as { name: string }[];
  const hasPostColumn = (name: string) => postColumns.some((column) => column.name === name);
  // SEO fields. metaTitle/metaDescription are what ship in <head>; title/description are the
  // on-page copy. They differ because a good SERP title is not always a good H1.
  if (!hasPostColumn("metaTitle")) db.exec("ALTER TABLE posts ADD COLUMN metaTitle TEXT NOT NULL DEFAULT '';");
  if (!hasPostColumn("metaDescription")) db.exec("ALTER TABLE posts ADD COLUMN metaDescription TEXT NOT NULL DEFAULT '';");
  if (!hasPostColumn("focusKeyword")) db.exec("ALTER TABLE posts ADD COLUMN focusKeyword TEXT NOT NULL DEFAULT '';");
  if (!hasPostColumn("secondaryKeywords")) db.exec("ALTER TABLE posts ADD COLUMN secondaryKeywords TEXT NOT NULL DEFAULT '[]';");
  if (!hasPostColumn("searchIntent")) db.exec("ALTER TABLE posts ADD COLUMN searchIntent TEXT NOT NULL DEFAULT 'informational';");
  if (!hasPostColumn("schemaType")) db.exec("ALTER TABLE posts ADD COLUMN schemaType TEXT NOT NULL DEFAULT 'BlogPosting';");
  if (!hasPostColumn("cluster")) db.exec("ALTER TABLE posts ADD COLUMN cluster TEXT NOT NULL DEFAULT '';");
  // One focus keyword may be claimed by exactly one post. This is the cannibalization guard.
  db.exec("CREATE UNIQUE INDEX IF NOT EXISTS posts_focus_keyword_idx ON posts (focusKeyword) WHERE focusKeyword != '';");

  const columns = db.prepare("PRAGMA table_info(countries);").all() as { name: string }[];
  const hasColumn = (name: string) => columns.some((column) => column.name === name);
  if (!hasColumn("reviewed")) db.exec("ALTER TABLE countries ADD COLUMN reviewed INTEGER NOT NULL DEFAULT 0;");
  if (!hasColumn("reviewedAt")) db.exec("ALTER TABLE countries ADD COLUMN reviewedAt TEXT NOT NULL DEFAULT '';");

  return db;
}

export function getCountries(): Country[] {
  return getDb()
    .prepare("SELECT * FROM countries ORDER BY name COLLATE NOCASE")
    .all()
    .map((row) => rowToCountry(row as CountryRow));
}

/**
 * Only reviewed countries are indexable. Templated import copy is identical across
 * records apart from the country name, which Google treats as scaled content abuse.
 */
export function getIndexableCountries(): Country[] {
  return getCountries().filter((country) => country.reviewed);
}

export function getCountryStats() {
  const row = getDb()
    .prepare(
      `SELECT
        COUNT(*) AS total,
        SUM(unMember) AS unMembers,
        SUM(island) AS islands,
        SUM(landlocked) AS landlocked,
        SUM(reviewed) AS reviewed
      FROM countries`
    )
    .get() as Record<string, number>;

  return {
    total: row.total ?? 0,
    unMembers: row.unMembers ?? 0,
    islands: row.islands ?? 0,
    landlocked: row.landlocked ?? 0,
    reviewed: row.reviewed ?? 0,
  };
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

/**
 * Picks a stable country from a seed string so each prerendered page ships different
 * HTML instead of every tool page rendering countries[0].
 */
export function pickSeededCountry(countries: Country[], seed: string): Country | undefined {
  if (countries.length === 0) return undefined;
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return countries[Math.abs(hash) % countries.length];
}

export function groupCountries(countries: Country[], key: (country: Country) => string) {
  const groups = new Map<string, Country[]>();
  for (const country of countries) {
    for (const label of key(country).split(",").map((value) => value.trim()).filter(Boolean)) {
      const existing = groups.get(label);
      if (existing) existing.push(country);
      else groups.set(label, [country]);
    }
  }
  return Array.from(groups.entries())
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([label, items]) => ({ label, items }));
}
