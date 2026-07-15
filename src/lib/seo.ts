export const siteName = "Random Country Generator";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://randomcountry.ziamuhammad.com").replace(/\/+$/, "");
export const lastUpdated = "May 13, 2026";

export const siteAuthor = {
  name: "Random Country Editorial Team",
  bio: "Country and geography content is reviewed for clarity, usefulness, and maintainability before it is added to the site.",
};

export const dataSource = {
  name: "REST Countries",
  url: "https://restcountries.com",
};

/** Public profiles for the Organization entity. Add real ones as they exist. */
export const socialProfiles: string[] = [];

/** The root domain this tool lives under. Used for cross-domain authority signals. */
export const parentSite = {
  /** The person: used as the WebApplication creator and the footer byline. */
  name: "Zia Muhammad",
  /** The umbrella brand: used as the parentOrganization over this and sibling tools. */
  brand: "Zia Muhammad Tools",
  url: "https://www.ziamuhammad.com",
};

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
