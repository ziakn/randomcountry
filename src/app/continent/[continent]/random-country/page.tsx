import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CountryTable from "@/components/CountryTable";
import RandomCountryTool from "@/components/RandomCountryTool";
import { continents, getCountriesByContinent } from "@/lib/countries";

type Props = {
  params: Promise<{ continent: string }>;
};

export function generateStaticParams() {
  return continents.map((continent) => ({ continent: continent.toLowerCase().replace(/\s+/g, "-") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { continent } = await params;
  const label = continent.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  return {
    title: `Random Country in ${label}`,
    description: `Generate a random country in ${label}, browse countries in the continent, and learn quick facts.`,
    alternates: { canonical: `/continent/${continent}/random-country` },
  };
}

export default async function ContinentRandomCountryPage({ params }: Props) {
  const { continent } = await params;
  const label = continent.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  const countries = getCountriesByContinent(continent);

  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ href: "/countries", label: "Countries" }, { label }]} />
      <section className="hero compact">
        <p className="eyebrow">Continent generator</p>
        <h1>Random Country in {label}</h1>
        <p>Generate a random country filtered by {label}, browse the available country list, and open full country profiles.</p>
      </section>

      {countries.length ? (
        <>
          <RandomCountryTool countries={countries} title={`Generate a random country in ${label}`} />
          <section className="panel">
            <h2>Countries in {label}</h2>
            <CountryTable countries={countries} />
          </section>
        </>
      ) : (
        <section className="panel">
          <h2>No sovereign country records</h2>
          <p>{label} has no matching country records in the imported SQLite database.</p>
        </section>
      )}

      <section className="panel">
        <h2>FAQ</h2>
        <div className="faq-list">
          <article><h3>Can I generate only countries from {label}?</h3><p>Yes, this page filters the generator to country records assigned to {label}.</p></article>
          <article><h3>Where can I see all countries?</h3><p>Use the <Link href="/countries">countries directory</Link> for the full A-Z list.</p></article>
        </div>
      </section>
    </main>
  );
}
