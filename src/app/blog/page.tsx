import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { Pagination, PostList } from "@/components/PostList";
import { getPublishedPostPage } from "@/lib/posts";
import { absoluteUrl, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Country Learning Blog",
  description: "Practical geography articles about random country tools, flags, capitals, maps, school projects, and country comparisons.",
  alternates: { canonical: "/blog" },
};

// Picks up the day's scheduled post without a redeploy.
export const revalidate = 3600;

export default function BlogPage() {
  const { posts, page, totalPages, total } = getPublishedPostPage(1);

  return (
    <main className="page-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${siteName} Blog`,
          url: absoluteUrl("/blog"),
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishAt,
            url: absoluteUrl(`/blog/${post.slug}`),
          })),
        }}
      />
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <section className="hero compact">
        <p className="eyebrow">Country guides</p>
        <h1>Country Learning Blog</h1>
        <p>
          Practical geography guides for students, teachers, quiz hosts, and travelers. {total} article
          {total === 1 ? "" : "s"} published so far.
        </p>
      </section>
      <section className="panel">
        <PostList posts={posts} />
        <Pagination page={page} totalPages={totalPages} />
      </section>
    </main>
  );
}
