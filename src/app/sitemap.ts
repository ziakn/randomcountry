import { MetadataRoute } from 'next';
import { getAllCountries } from '../utils/getRandomCountry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://randomcountry.ziamuhammad.com';
  const countries = getAllCountries();

  const countryUrls = countries.map((country) => ({
    url: `${baseUrl}/country/${country.code}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...countryUrls,
  ];
}