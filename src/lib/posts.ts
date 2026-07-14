import { getDb } from "./countries";

export type PostSection = { heading: string; body: string };
export type PostFaq = { question: string; answer: string };

export type SearchIntent = "informational" | "commercial" | "navigational" | "transactional";
export type PostSchemaType = "BlogPosting" | "HowTo" | "FAQPage";

export type Post = {
  slug: string;
  /** On-page H1. */
  title: string;
  /** On-page standfirst. */
  description: string;
  /** SERP title. Falls back to title. Aim for 50–60 chars. */
  metaTitle: string;
  /** SERP snippet. Falls back to description. Aim for 140–160 chars. */
  metaDescription: string;
  /** The single query this post is built to win. Unique across all posts. */
  focusKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  schemaType: PostSchemaType;
  /** Topic cluster, for internal linking between related posts. */
  cluster: string;
  /** UTC date (YYYY-MM-DD). A post is invisible until this date arrives. */
  publishAt: string;
  updatedAt: string;
  /** Editorial gate. A queued post with status "draft" never publishes, even once its date passes. */
  status: "draft" | "scheduled";
  author: string;
  tags: string[];
  sections: PostSection[];
  faq: PostFaq[];
};

type PostRow = {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string;
  searchIntent: string;
  schemaType: string;
  cluster: string;
  publishAt: string;
  updatedAt: string;
  status: string;
  author: string;
  tags: string;
  sections: string;
  faq: string;
};

export const POSTS_PER_PAGE = 12;

function parseJson<T>(value: string, fallback: T): T {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

const SCHEMA_TYPES: PostSchemaType[] = ["BlogPosting", "HowTo", "FAQPage"];
const INTENTS: SearchIntent[] = ["informational", "commercial", "navigational", "transactional"];

function rowToPost(row: PostRow): Post {
  return {
    ...row,
    status: row.status === "draft" ? "draft" : "scheduled",
    // Meta fields fall back to on-page copy so a post is never shipped with an empty <title>.
    metaTitle: row.metaTitle || row.title,
    metaDescription: row.metaDescription || row.description,
    searchIntent: INTENTS.includes(row.searchIntent as SearchIntent)
      ? (row.searchIntent as SearchIntent)
      : "informational",
    schemaType: SCHEMA_TYPES.includes(row.schemaType as PostSchemaType)
      ? (row.schemaType as PostSchemaType)
      : "BlogPosting",
    secondaryKeywords: parseJson<string[]>(row.secondaryKeywords, []),
    tags: parseJson<string[]>(row.tags, []),
    sections: parseJson<PostSection[]>(row.sections, []),
    faq: parseJson<PostFaq[]>(row.faq, []),
  };
}

export function wordCount(post: Post): number {
  const text = [
    post.description,
    ...post.sections.flatMap((section) => [section.heading, section.body]),
    ...post.faq.flatMap((item) => [item.question, item.answer]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** UTC so the drip flips at a predictable moment regardless of server region. */
export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * A post is live only when its publish date has arrived AND it has real content.
 * The body check stops an empty queued stub from publishing itself on schedule.
 */
const LIVE_CLAUSE = `
  status = 'scheduled'
  AND publishAt <= ?
  AND length(trim(title)) > 0
  AND json_array_length(sections) > 0
`;

export function getPublishedPosts(): Post[] {
  return getDb()
    .prepare(`SELECT * FROM posts WHERE ${LIVE_CLAUSE} ORDER BY publishAt DESC, slug`)
    .all(today())
    .map((row) => rowToPost(row as PostRow));
}

export function getPublishedPost(slug: string): Post | undefined {
  const row = getDb()
    .prepare(`SELECT * FROM posts WHERE slug = ? AND ${LIVE_CLAUSE} LIMIT 1`)
    .get(slug, today()) as PostRow | undefined;
  return row ? rowToPost(row) : undefined;
}

export function getPublishedPostPage(page: number) {
  const posts = getPublishedPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    posts: posts.slice((current - 1) * POSTS_PER_PAGE, current * POSTS_PER_PAGE),
    page: current,
    totalPages,
    total: posts.length,
  };
}

/** Adjacent live posts, for prev/next links. Never leaks a future post. */
export function getPostNeighbors(post: Post) {
  const posts = getPublishedPosts();
  const index = posts.findIndex((item) => item.slug === post.slug);
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

/**
 * Related posts, same cluster first, then shared tags. Internal links are how a 300-post
 * archive passes authority around instead of leaving every post an orphan.
 */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const others = getPublishedPosts().filter((item) => item.slug !== post.slug);
  const score = (candidate: Post) => {
    let points = 0;
    if (post.cluster && candidate.cluster === post.cluster) points += 10;
    points += candidate.tags.filter((tag) => post.tags.includes(tag)).length;
    return points;
  };
  return others
    .map((candidate) => ({ candidate, points: score(candidate) }))
    .filter((entry) => entry.points > 0)
    .sort((a, b) => b.points - a.points || b.candidate.publishAt.localeCompare(a.candidate.publishAt))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function getQueueStats() {
  const row = getDb()
    .prepare(
      `SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'scheduled' AND publishAt <= ? THEN 1 ELSE 0 END) AS live,
        SUM(CASE WHEN status = 'scheduled' AND publishAt > ? THEN 1 ELSE 0 END) AS queued,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) AS drafts,
        MAX(publishAt) AS lastDate
      FROM posts`
    )
    .get(today(), today()) as Record<string, number | string>;

  return {
    total: Number(row.total ?? 0),
    live: Number(row.live ?? 0),
    queued: Number(row.queued ?? 0),
    drafts: Number(row.drafts ?? 0),
    lastDate: String(row.lastDate ?? ""),
  };
}
