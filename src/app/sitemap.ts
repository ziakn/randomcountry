import { MetadataRoute } from "next";
import { getAllCountries } from "@/utils/getRandomCountry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://randomcountry.ziamuhammad.com";
  const now = new Date();

  const countryUrls = getAllCountries().map((country) => ({
    url: `${baseUrl}/country/${country.code}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogUrls = [
    "/blog/most-beautiful-countries-in-europe",
    "/blog/cheapest-countries-to-travel",
    "/blog/safest-countries-in-asia",
    "/blog/largest-countries",
    "/blog/richest-countries",
    "/blog/best-countries-to-study",
  ];

  const staticUrls = [
    { url: baseUrl, priority: 1, changeFrequency: "daily" },
    { url: `${baseUrl}/random-country-generator`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/compare`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/quiz`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/blog`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${baseUrl}/countries`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/continents`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/rankings`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/about`, priority: 0.5, changeFrequency: "yearly" },
    { url: `${baseUrl}/contact`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${baseUrl}/disclaimer`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${baseUrl}/cookie-policy`, priority: 0.3, changeFrequency: "yearly" },
  ];

  return [
    ...staticUrls.map((u) => ({
      url: u.url,
      lastModified: now,
      changeFrequency: u.changeFrequency,
      priority: u.priority,
    })),
    ...blogUrls.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...countryUrls,
  ];
}