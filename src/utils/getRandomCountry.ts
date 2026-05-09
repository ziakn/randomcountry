import countries from "../data/countries.json";

export type Country = {
  id: string;
  slug: string;
  name: string;
  officialName: string;
  capital: string;
  continent: string | null;
  region: string;
  subregion: string;
  population: string;
  populationRaw: number;
  flagUrl: string;
  flagIcon: string;
  code: string;
  iso3: string;
  currency: string;
  currencyCode: string;
  language: string;
  coordinates: [number, number];
  area: number;
  borders: string[];
  timezones: string[];
  callingCode?: string;
};

export const getAllCountries = (): Country[] => {
  // Enrich data with slugs if not present
  return (countries as Country[]).map((c) => ({
    ...c,
    slug: c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    id: c.code,
    continent: c.continent || null,
    officialName: c.officialName || c.name,
  }));
};

export const getCountryBySlug = (slug: string): Country | undefined => {
  const normalized = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return getAllCountries().find((c) => c.slug === normalized);
};

export const getCountryByCode = (code: string): Country | undefined => {
  return getAllCountries().find((c) => c.code === code.toLowerCase());
};

export const getCountinentBySlug = (slug: string): Country | undefined => {
  return getAllCountries().find((c) => c.slug === slug);
};

export const getRandomCountry = (excludeCode?: string): Country => {
  const all = getAllCountries();
  let randomIndex = Math.floor(Math.random() * all.length);
  let country = all[randomIndex];
  while (excludeCode && country.code === excludeCode.toLowerCase()) {
    randomIndex = Math.floor(Math.random() * all.length);
    country = all[randomIndex];
  }
  // Ensure slug is set
  return {
    ...country,
    slug: country.slug || country.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  };
};

export const getCountriesByRegion = (region: string): Country[] => {
  return getAllCountries().filter((c) => c.region.toLowerCase() === region.toLowerCase());
};

export const getCountriesByContinent = (continent: string): Country[] => {
  const lower = continent.toLowerCase();
  return getAllCountries().filter(
    (c) =>
      (c.continent && c.continent.toLowerCase() === lower) ||
      c.region.toLowerCase() === lower
  );
};

export const searchCountries = (query: string): Country[] => {
  const q = query.toLowerCase();
  return getAllCountries().filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.currency.toLowerCase().includes(q) ||
      c.language.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q)
  );
};

export const getTrendingCountries = (): Country[] => {
  const trendingCodes = [
    "fr", "jp", "it", "us", "es", "de", "cn", "br", "in", "mx",
    "th", "kr", "au", "ca", "uk", "nl", "se", "no", "dk", "fi",
  ];
  return trendingCodes
    .map((code) => getCountryByCode(code))
    .filter(Boolean) as Country[];
};

export const getRegionOptions = (): string[] => {
  const regions = new Set<string>();
  getAllCountries().forEach((c) => regions.add(c.region));
  return Array.from(regions).sort();
};

export const getAllSlugs = (): string[] => {
  return getAllCountries().map((c) => c.slug);
};