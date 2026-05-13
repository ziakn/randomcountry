import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { toolPages } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Country Tools",
  description: "Browse random country tools, flag generators, capital generators, quizzes, map tools, and country comparison pages.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <main className="page-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Country Tools",
          itemListElement: toolPages.map((page, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: page.title,
            url: absoluteUrl(`/${page.slug}`),
          })),
        }}
      />
      <Breadcrumbs items={[{ label: "Tools" }]} />
      <section className="hero compact">
        <p className="eyebrow">Tools directory</p>
        <h1>Country Tools</h1>
        <p>Fast, mobile-friendly geography tools for random country picking, flags, capitals, maps, quizzes, travel prompts, school projects, and comparisons.</p>
      </section>

      <section className="panel">
        <h2>Featured tools</h2>
        <div className="link-grid">
          {toolPages.slice(0, 6).map((page) => (
            <Link className="link-card" href={`/${page.slug}`} key={page.slug}>
              <h3>{page.title}</h3>
              <p>{page.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>All country tools</h2>
        <div className="link-grid">
          {toolPages.map((page) => (
            <Link className="link-card" href={`/${page.slug}`} key={page.slug}>
              <h3>{page.title}</h3>
              <p>{page.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h2>Useful first</h2>
          <p>Each tool starts with the working generator or comparison task, then adds explanations, FAQs, and related links below the main action.</p>
        </article>
        <article className="panel">
          <h2>Clear navigation</h2>
          <p>Tools link to country profiles, lists, quizzes, data notes, and learning pages so visitors can continue researching without dead ends.</p>
        </article>
        <article className="panel">
          <h2>No thin pages</h2>
          <p>Tool pages should include a practical task, original explanations, limitations, examples, FAQs, and internal links before AdSense review.</p>
        </article>
      </section>
    </main>
  );
}
