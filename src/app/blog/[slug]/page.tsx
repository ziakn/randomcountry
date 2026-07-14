import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { blogPages } from "@/lib/site";
import { absoluteUrl, lastUpdated, siteAuthor, siteName } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = blogPages.find((item) => item.slug === slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/blog/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: `/blog/${page.slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const page = blogPages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: page.title,
            description: page.description,
            datePublished: page.datePublished,
            dateModified: page.dateModified ?? page.datePublished,
            author: {
              "@type": "Organization",
              name: siteAuthor.name,
              url: absoluteUrl("/about"),
            },
            publisher: {
              "@type": "Organization",
              name: siteName,
              url: absoluteUrl("/"),
            },
            mainEntityOfPage: absoluteUrl(`/blog/${page.slug}`),
          },
          ...(page.faq
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: page.faq.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: item.answer,
                    },
                  })),
                },
              ]
            : []),
        ]}
      />
      <Breadcrumbs items={[{ href: "/blog", label: "Blog" }, { label: page.title }]} />
      <article>
        <section className="hero compact">
          <p className="eyebrow">Country guide</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </section>

        <section className="author-box" aria-label="Article information">
          <div>
            <strong>{siteAuthor.name}</strong>
            <p>{siteAuthor.bio}</p>
          </div>
          <span>Last updated {lastUpdated}</span>
        </section>

        <section className="content-grid">
          {page.sections.map((section) => (
            <article className="panel" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>

        {page.faq ? (
          <section className="panel">
            <h2>FAQ</h2>
            <div className="faq-list">
              {page.faq.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </article>

      <section className="panel">
        <h2>Related pages</h2>
        <div className="link-grid">
          <Link className="link-card" href="/random-country-generator"><h3>Random Country Generator</h3><p>Generate a country and explore its facts.</p></Link>
          <Link className="link-card" href="/tools"><h3>Country Tools</h3><p>Browse all generators and quizzes.</p></Link>
          <Link className="link-card" href="/learn"><h3>Learn Geography</h3><p>Read educational guides about countries.</p></Link>
        </div>
      </section>
    </main>
  );
}
