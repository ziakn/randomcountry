import type { MetadataRoute } from "next";
import { continents, getIndexableCountries } from "@/lib/countries";
import { getPublishedPosts, POSTS_PER_PAGE } from "@/lib/posts";
import { siteUrl } from "@/lib/seo";
import { learnPages, listPages, mapPages, quizPages, rootPages, travelPages } from "@/lib/site";

// Rebuilt hourly so a newly published post enters the sitemap on its publish date.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Published only. Listing the future queue would hand Google 3,000 URLs that 404.
  const posts = getPublishedPosts();
  const blogPageCount = Math.ceil(posts.length / POSTS_PER_PAGE);
  // Unreviewed country profiles are noindex, so listing them here would only point Google
  // at pages it is being told not to index.
  const countries = getIndexableCountries();
  const paths = [
    "",
    "countries",
    "tools",
    "blog",
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
    ...learnPages.map(([slug]) => `learn/${slug}`),
    ...posts.map((post) => `blog/${post.slug}`),
    ...Array.from({ length: Math.max(0, blogPageCount - 1) }, (_, index) => `blog/page/${index + 2}`),
    ...mapPages.map(([slug]) => `maps/${slug}`),
    ...quizPages.map(([slug]) => `quiz/${slug}`),
    ...travelPages.map(([slug]) => `travel/${slug}`),
    "compare/pakistan-vs-india",
    "compare/qatar-vs-uae",
    "compare/italy-vs-france",
    "compare/japan-vs-south-korea",
  ];

  return Array.from(new Set(paths)).map((path) => ({
    // Match the self-referencing canonical exactly: no trailing slash on the homepage.
    url: path === "" ? siteUrl : `${siteUrl}/${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
