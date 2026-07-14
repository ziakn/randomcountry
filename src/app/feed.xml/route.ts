import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";

// Latest 20 published posts. Future-dated posts are excluded by getPublishedPosts, so the
// queue never leaks through the feed. Regenerated hourly, in step with the drip.
export const revalidate = 3600;

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const rfc822 = (date: string) => new Date(`${date}T09:00:00Z`).toUTCString();

export async function GET() {
  const posts = getPublishedPosts().slice(0, 20);
  const latest = posts[0]?.publishAt ?? new Date().toISOString().slice(0, 10);

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.publishAt)}</pubDate>
      <description>${escape(post.metaDescription || post.description)}</description>
      ${post.cluster ? `<category>${escape(post.cluster)}</category>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(siteName)}</title>
    <link>${siteUrl}</link>
    <description>Practical geography guides: countries, capitals, flags, maps, and classroom activities.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(latest)}</lastBuildDate>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
