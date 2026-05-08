import countries from '../data/countries.json';

export type Country = {
  name: string;
  officialName: string;
  capital: string;
  population: string;
  populationRaw: number;
  region: string;
  subregion: string;
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
  continent: string;
};

export const getAllCountries = (): Country[] => {
  return countries as Country[];
};

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find((c: Country) => c.code === code.toLowerCase());
};

export const getRandomCountry = (excludeCode?: string): Country => {
  let randomIndex = Math.floor(Math.random() * countries.length);
  let country = countries[randomIndex] as Country;
  while (excludeCode && country.code === excludeCode.toLowerCase()) {
    randomIndex = Math.floor(Math.random() * countries.length);
    country = countries[randomIndex] as Country;
  }
  return country;
};

export const getCountriesByRegion = (region: string): Country[] => {
  return countries.filter((c: Country) => c.region.toLowerCase() === region.toLowerCase()) as Country[];
};

export const getCountriesByContinent = (continent: string): Country[] => {
  return countries.filter((c: Country) => c.continent.toLowerCase() === continent.toLowerCase()) as Country[];
};

export const searchCountries = (query: string): Country[] => {
  const q = query.toLowerCase();
  return (countries as Country[]).filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.currency.toLowerCase().includes(q) ||
      c.language.toLowerCase().includes(q)
  );
};

export const getTrendingCountries = (): Country[] => {
  const trendingCodes = ['fr', 'jp', 'it', 'us', 'es', 'de', 'cn', 'br', 'in', 'mx', 'th', 'kr', 'au', 'ca', 'uk'];
  return trendingCodes.map(code => getCountryByCode(code)).filter(Boolean) as Country[];
};

export const getRegionOptions = (): string[] => {
  const regions = new Set<string>();
  (countries as Country[]).forEach(c => regions.add(c.region));
  return Array.from(regions).sort();
};
