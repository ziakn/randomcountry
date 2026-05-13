import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import CountryTable from "@/components/CountryTable";
import { getCountries } from "@/lib/countries";
import { absoluteUrl, lastUpdated, siteAuthor, siteName } from "@/lib/seo";
import { learnPages } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return learnPages.map(([slug]) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = learnPages.find(([itemSlug]) => itemSlug === slug);
  if (!page) return {};
  return {
    title: page[1],
    description: page[2],
    alternates: { canonical: `/learn/${slug}` },
  };
}

export default async function LearnPage({ params }: Props) {
  const { slug } = await params;
  const page = learnPages.find(([itemSlug]) => itemSlug === slug);
  if (!page) notFound();
  const [, title, description] = page;
  const countries = getCountries();

  return (
    <main className="page-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          dateModified: "2026-05-13",
          author: {
            "@type": "Organization",
            name: siteAuthor.name,
          },
          publisher: {
            "@type": "Organization",
            name: siteName,
            url: absoluteUrl("/"),
          },
          mainEntityOfPage: absoluteUrl(`/learn/${slug}`),
        }}
      />
      <Breadcrumbs items={[{ href: "/learn", label: "Learn" }, { label: title }]} />
      <section className="hero compact">
        <p className="eyebrow">Educational guide</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <section className="author-box" aria-label="Article information">
        <div>
          <strong>{siteAuthor.name}</strong>
          <p>{siteAuthor.bio}</p>
        </div>
        <span>Last updated {lastUpdated}</span>
      </section>
      <section className="content-grid">
        <article className="panel"><h2>Overview</h2><p>{description} This guide is written for students, teachers, and general readers who want practical geography explanations.</p></article>
        <article className="panel"><h2>Why it matters</h2><p>Country data affects maps, quizzes, school reports, travel planning, international comparisons, and how people understand the world.</p></article>
        <article className="panel"><h2>Keep facts current</h2><p>Population, borders, names, currencies, and travel details can change. Important claims should be checked before publication.</p></article>
      </section>
      <section className="panel">
        <h2>Related country records</h2>
        <CountryTable countries={countries.slice(0, 8)} />
      </section>
      <section className="panel">
        <h2>Next steps</h2>
        <div className="link-grid">
          <Link className="link-card" href="/random-country-generator"><h3>Generate a country</h3><p>Use the main country generator.</p></Link>
          <Link className="link-card" href="/lists/all-countries"><h3>All countries list</h3><p>Browse the country table.</p></Link>
          <Link className="link-card" href="/quizzes"><h3>Country quizzes</h3><p>Practice what you learned.</p></Link>
        </div>
      </section>
    </main>
  );
}
