import type { Post } from "./posts";
import { absoluteUrl, dataSource, parentSite, siteAuthor, siteName, siteUrl, socialProfiles } from "./seo";

// A single connected @graph beats several disjointed JSON-LD blocks: the nodes reference each
// other by @id, so a crawler resolves Organization -> WebSite -> WebPage -> Article as one unit
// instead of four unrelated islands.

const ORG_ID = `${siteUrl}/#organization`;
const SITE_ID = `${siteUrl}/#website`;
const LOGO_ID = `${siteUrl}/#logo`;

type Node = Record<string, unknown>;

export function organizationNode(): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteName,
    url: absoluteUrl("/"),
    description: "A geography reference and random country generator for students, teachers, and quiz players.",
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: absoluteUrl("/icon.svg"),
      caption: `${siteName} logo`,
    },
    image: { "@id": LOGO_ID },
    // Ties the subdomain tool to its umbrella brand + root domain for entity consolidation.
    parentOrganization: { "@type": "Organization", name: parentSite.brand, url: parentSite.url },
    // parentSite is a verifiable, owned domain; extra social profiles slot in as they exist.
    sameAs: [parentSite.url, ...socialProfiles],
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: absoluteUrl("/"),
    name: siteName,
    description: "Generate random countries, browse country facts, compare countries, and practice geography quizzes.",
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function webApplicationNode(): Node {
  return {
    "@type": "WebApplication",
    "@id": `${siteUrl}/#webapp`,
    url: absoluteUrl("/"),
    name: siteName,
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    browserRequirements: "Requires HTML5",
    description:
      "An interactive tool to instantly generate a random country for travel inspiration, education, games, and trivia.",
    // Connected to the sitewide graph by @id rather than redefining Organization/WebSite.
    isPartOf: { "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
    creator: { "@type": "Person", name: parentSite.name, url: parentSite.url },
    // It is genuinely free; a zero-price Offer is an honest eligibility signal.
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  };
}

export function faqPageNode(items: { question: string; answer: string }[]): Node {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function webPageNode({
  path,
  name,
  description,
  dateModified,
}: {
  path: string;
  name: string;
  description: string;
  dateModified?: string;
}): Node {
  const url = absoluteUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": SITE_ID },
    ...(dateModified ? { dateModified } : {}),
  };
}

export function breadcrumbNode(path: string, crumbs: { href?: string; label: string }[]): Node {
  const url = absoluteUrl(path);
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [{ href: "/", label: "Home" }, ...crumbs].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
    })),
  };
}

/** Wraps nodes into the single graph that ships in <head>. */
export function graph(...nodes: Node[]): Node {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode(), ...nodes],
  };
}

export function postGraph(post: Post, wordCount: number): Node {
  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const nodes: Node[] = [
    webPageNode({
      path,
      name: post.metaTitle,
      description: post.metaDescription,
      dateModified: post.updatedAt,
    }),
    breadcrumbNode(path, [{ href: "/blog", label: "Blog" }, { label: post.title }]),
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      isPartOf: { "@id": `${url}#webpage` },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      headline: post.metaTitle.slice(0, 110),
      alternativeHeadline: post.title,
      description: post.metaDescription,
      image: absoluteUrl(`${path}/opengraph-image`),
      datePublished: post.publishAt,
      dateModified: post.updatedAt,
      inLanguage: "en",
      wordCount,
      keywords: [post.focusKeyword, ...post.secondaryKeywords].filter(Boolean).join(", "),
      articleSection: post.cluster || undefined,
      author: {
        "@type": "Organization",
        name: post.author || siteAuthor.name,
        url: absoluteUrl("/about"),
      },
      publisher: { "@id": ORG_ID },
      citation: {
        "@type": "Dataset",
        name: dataSource.name,
        url: dataSource.url,
      },
    },
  ];

  if (post.schemaType === "HowTo") {
    nodes.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: post.title,
      description: post.metaDescription,
      step: post.sections.map((section, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: section.heading,
        text: section.body,
        url: `${url}#step-${index + 1}`,
      })),
    });
  }

  if (post.faq.length) {
    nodes.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return graph(...nodes);
}
