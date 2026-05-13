import type { MetadataRoute } from "next";
import { continents, getCountries } from "@/lib/countries";
import { learnPages, listPages, mapPages, quizPages, rootPages, travelPages } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const countries = getCountries();
  const staticPaths = [
    "",
    "countries",
    "lists",
    "learn",
    "maps",
    "quizzes",
    "travel",
    ...rootPages.map((page) => page.slug),
    ...countries.map((country) => `country/${country.slug}`),
    ..."abcdefghijklmnopqrstuvwxyz".split("").map((letter) => `countries/${letter}`),
    ...continents.map((continent) => `continent/${continent.toLowerCase().replace(/\s+/g, "-")}/random-country`),
    ...listPages.map(([slug]) => `lists/${slug}`),
    ..."abcdefghijklmnopqrstuvwxyz".split("").map((letter) => `lists/countries-starting-with-${letter}`),
    ...learnPages.map(([slug]) => `learn/${slug}`),
    ...mapPages.map(([slug]) => `maps/${slug}`),
    ...quizPages.map(([slug]) => `quiz/${slug}`),
    ...travelPages.map(([slug]) => `travel/${slug}`),
    "compare/pakistan-vs-india",
    "compare/qatar-vs-uae",
    "compare/italy-vs-france",
    "compare/japan-vs-south-korea",
  ];

  return staticPaths.map((path) => ({
    url: `${siteUrl}/${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
