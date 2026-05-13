import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RandomCountryTool from "@/components/RandomCountryTool";
import { getCountries } from "@/lib/countries";
import { quizPages } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return quizPages.map(([slug]) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = quizPages.find(([itemSlug]) => itemSlug === slug);
  if (!page) return {};
  return {
    title: page[1],
    description: page[2],
    alternates: { canonical: `/quiz/${slug}` },
  };
}

export default async function QuizPage({ params }: Props) {
  const { slug } = await params;
  const page = quizPages.find(([itemSlug]) => itemSlug === slug);
  if (!page) notFound();
  const [, title, description] = page;
  const countries = getCountries();

  return (
    <main className="page-shell">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: title, description }} />
      <Breadcrumbs items={[{ href: "/quizzes", label: "Quizzes" }, { label: title }]} />
      <section className="hero compact">
        <p className="eyebrow">Quiz mode</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <RandomCountryTool countries={countries} title={title} />
      <section className="panel">
        <h2>How to play</h2>
        <p>Generate a country, cover part of the result, and ask the player to guess the missing flag, capital, currency, language, continent, or location clue.</p>
        <div className="actions">
          <Link className="button" href="/random-flag-generator">Practice flags</Link>
          <Link className="button secondary" href="/learn/countries-and-capitals">Study capitals</Link>
        </div>
      </section>
    </main>
  );
}
