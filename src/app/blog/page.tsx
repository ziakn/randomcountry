import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { blogPages } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Country Learning Blog",
  description: "Practical geography articles about random country tools, flags, capitals, maps, school projects, and country comparisons.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="page-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Country Learning Blog",
          itemListElement: blogPages.map((page, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: page.title,
            url: absoluteUrl(`/blog/${page.slug}`),
          })),
        }}
      />
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <section className="hero compact">
        <p className="eyebrow">Blog</p>
        <h1>Country Learning Blog</h1>
        <p>Original guides that support the generator with practical geography lessons, study methods, classroom ideas, and country research tips.</p>
      </section>

      <section className="panel">
        <div className="link-grid">
          {blogPages.map((page) => (
            <Link className="link-card" href={`/blog/${page.slug}`} key={page.slug}>
              <h2>{page.title}</h2>
              <p>{page.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
