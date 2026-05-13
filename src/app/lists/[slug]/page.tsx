import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CountryTable from "@/components/CountryTable";
import { getCountries } from "@/lib/countries";
import { listPages } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...listPages.map(([slug]) => ({ slug })),
    ..."abcdefghijklmnopqrstuvwxyz".split("").map((letter) => ({ slug: `countries-starting-with-${letter}` })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = listPages.find(([itemSlug]) => itemSlug === slug);
  const title = found?.[1] ?? `Countries Starting With ${slug.at(-1)?.toUpperCase()}`;
  return {
    title,
    description: found?.[2] ?? `Countries starting with ${slug.at(-1)?.toUpperCase()}, with capitals, continents, population, area, and currency.`,
    alternates: { canonical: `/lists/${slug}` },
  };
}

export default async function ListPage({ params }: Props) {
  const { slug } = await params;
  const found = listPages.find(([itemSlug]) => itemSlug === slug);
  const countries = getCountries();
  let list = countries;
  let title = found?.[1] ?? "";
  let description = found?.[2] ?? "";

  if (slug.startsWith("countries-starting-with-")) {
    const letter = slug.replace("countries-starting-with-", "");
    list = countries.filter((country) => country.name.toLowerCase().startsWith(letter));
    title = `Countries Starting With ${letter.toUpperCase()}`;
    description = `Countries starting with ${letter.toUpperCase()} from the imported SQLite country database.`;
  } else if (!found) {
    notFound();
  }

  if (slug.includes("population")) list = [...countries].sort((a, b) => b.populationNumber - a.populationNumber);
  if (slug.includes("area") || slug.includes("largest")) list = [...countries].sort((a, b) => b.area - a.area);
  if (slug.includes("smallest")) list = [...countries].sort((a, b) => a.area - b.area);
  if (slug.includes("island")) list = countries.filter((country) => country.island);
  if (slug.includes("landlocked")) list = countries.filter((country) => country.landlocked);
  if (slug.includes("europe")) list = countries.filter((country) => country.continent === "Europe");
  if (slug.includes("asia")) list = countries.filter((country) => country.continent === "Asia");
  if (slug.includes("africa")) list = countries.filter((country) => country.continent === "Africa");
  if (slug.includes("oceania")) list = countries.filter((country) => country.continent === "Oceania");
  if (slug.includes("south-america")) list = countries.filter((country) => country.continent === "South America");
  if (slug.includes("north-america")) list = countries.filter((country) => country.continent === "North America");

  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ href: "/lists", label: "Lists" }, { label: title }]} />
      <section className="hero compact">
        <p className="eyebrow">Last updated: May 13, 2026</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <section className="panel">
        <CountryTable countries={list} />
      </section>
      <section className="panel">
        <h2>FAQ</h2>
        <div className="faq-list">
          <article><h3>How is this list sorted?</h3><p>List pages use the current SQLite country records and sort or filter by the page topic.</p></article>
          <article><h3>Is this a complete world list?</h3><p>The database now includes 250 country and territory records imported from REST Countries, including 195 independent records.</p></article>
        </div>
      </section>
    </main>
  );
}
