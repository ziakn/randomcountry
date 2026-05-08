import { MetadataRoute } from "next";
import { getAllCountries } from "@/utils/getRandomCountry";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://randomcountry.ziamuhammad.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/internal"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}