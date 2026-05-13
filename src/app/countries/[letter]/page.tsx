import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CountryTable from "@/components/CountryTable";
import { getCountriesByLetter } from "@/lib/countries";

type Props = {
  params: Promise<{ letter: string }>;
};

export function generateStaticParams() {
  return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => ({ letter }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { letter } = await params;
  const upper = letter.toUpperCase();
  return {
    title: `Countries Starting With ${upper}`,
    description: `Browse countries starting with ${upper}, including capitals, continents, population, area, currency, and language.`,
    alternates: { canonical: `/countries/${letter}` },
  };
}

export default async function CountriesByLetterPage({ params }: Props) {
  const { letter } = await params;
  if (!/^[a-z]$/.test(letter)) notFound();
  const countries = getCountriesByLetter(letter);
  const upper = letter.toUpperCase();

  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ href: "/countries", label: "Countries" }, { label: `Starting with ${upper}` }]} />
      <section className="hero compact">
        <p className="eyebrow">A-Z countries</p>
        <h1>Countries Starting With {upper}</h1>
        <p>Use this page for alphabet games, classroom prompts, and quick country lookup.</p>
      </section>
      <section className="panel">
        {countries.length ? <CountryTable countries={countries} /> : <p>No country records starting with {upper} are currently in the SQLite database.</p>}
      </section>
    </main>
  );
}
