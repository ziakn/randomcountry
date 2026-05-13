import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CountryTable from "@/components/CountryTable";
import { continents, getCountries } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Countries Directory A-Z",
  description: "Search and browse countries by continent, language, currency, population, and A-Z country list.",
  alternates: { canonical: "/countries" },
};

export default function CountriesPage() {
  const countries = getCountries();
  const letters = Array.from(new Set(countries.map((country) => country.name[0].toUpperCase()))).sort();

  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ label: "Countries" }]} />
      <section className="hero compact">
        <p className="eyebrow">Country directory</p>
        <h1>Countries A-Z</h1>
        <p>Browse countries by letter, continent, language, currency, population, and area.</p>
      </section>

      <section className="panel">
        <h2>Filters and browsing</h2>
        <div className="link-grid">
          {continents.filter((continent) => continent !== "Antarctica").map((continent) => (
            <Link className="link-card" href={`/continent/${continent.toLowerCase().replace(/\s+/g, "-")}/random-country`} key={continent}>
              <h3>{continent}</h3>
              <p>Generate and browse countries in {continent}.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>A-Z country list</h2>
        <div className="actions">
          {letters.map((letter) => (
            <Link className="button secondary" href={`/countries/${letter.toLowerCase()}`} key={letter}>
              {letter}
            </Link>
          ))}
        </div>
        <CountryTable countries={countries} />
      </section>
    </main>
  );
}
