import countries from '../data/countries.json';

export type Country = {
  name: string;
  capital: string;
  population: string;
  region: string;
  flagUrl: string;
  code: string;
  currency: string;
  language: string;
  coordinates: [number, number];
};

export const getRandomCountry = (): Country => {
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex] as Country;
};
