import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CountryTable from "@/components/CountryTable";
import { Country, getCountries, groupCountries } from "@/lib/countries";
import { lastUpdated } from "@/lib/seo";
import { listPages } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

type ListView =
  | { mode: "table"; countries: Country[] }
  | { mode: "groups"; groups: { label: string; items: Country[] }[]; groupNoun: string };

export function generateStaticParams() {
  return listPages.map(([slug]) => ({ slug }));
}

/**
 * Each list slug gets its own sort, filter, or grouping. Anything that falls through to the
 * default would render the same alphabetical table as every other list page.
 */
function buildView(slug: string, countries: Country[]): ListView | undefined {
  const byArea = (order: "asc" | "desc") =>
    [...countries].sort((a, b) => (order === "asc" ? a.area - b.area : b.area - a.area));
  const inContinent = (continent: string) => countries.filter((country) => country.continent === continent);

  switch (slug) {
    case "all-countries":
      return { mode: "table", countries };
    case "countries-by-population":
      return { mode: "table", countries: [...countries].sort((a, b) => b.populationNumber - a.populationNumber) };
    case "countries-by-area":
      return { mode: "table", countries: byArea("desc") };
    case "largest-countries":
      return { mode: "table", countries: byArea("desc").slice(0, 50) };
    case "smallest-countries":
      return { mode: "table", countries: byArea("asc").slice(0, 50) };
    case "countries-by-capital":
      return { mode: "table", countries: [...countries].sort((a, b) => a.capital.localeCompare(b.capital)) };
    case "countries-by-continent":
      return { mode: "groups", groupNoun: "continent", groups: groupCountries(countries, (country) => country.continent) };
    case "countries-by-currency":
      return { mode: "groups", groupNoun: "currency", groups: groupCountries(countries, (country) => country.currency) };
    case "countries-by-language":
      return { mode: "groups", groupNoun: "language", groups: groupCountries(countries, (country) => country.language) };
    case "island-countries":
      return { mode: "table", countries: countries.filter((country) => country.island) };
    case "landlocked-countries":
      return { mode: "table", countries: countries.filter((country) => country.landlocked) };
    case "countries-in-europe":
      return { mode: "table", countries: inContinent("Europe") };
    case "countries-in-asia":
      return { mode: "table", countries: inContinent("Asia") };
    case "countries-in-africa":
      return { mode: "table", countries: inContinent("Africa") };
    case "countries-in-oceania":
      return { mode: "table", countries: inContinent("Oceania") };
    case "countries-in-south-america":
      return { mode: "table", countries: inContinent("South America") };
    case "countries-in-north-america":
      return { mode: "table", countries: inContinent("North America") };
    default:
      return undefined;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = listPages.find(([itemSlug]) => itemSlug === slug);
  if (!page) return {};
  return {
    title: page[1],
    description: page[2],
    alternates: { canonical: `/lists/${slug}` },
  };
}

export default async function ListPage({ params }: Props) {
  const { slug } = await params;
  const page = listPages.find(([itemSlug]) => itemSlug === slug);
  if (!page) notFound();

  const countries = getCountries();
  const view = buildView(slug, countries);
  if (!view) notFound();

  const [, title, description] = page;

  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ href: "/lists", label: "Lists" }, { label: title }]} />
      <section className="hero compact">
        <p className="eyebrow">Last updated: {lastUpdated}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>

      {view.mode === "table" ? (
        <section className="panel">
          <p className="list-summary">
            Showing {view.countries.length} records from the {countries.length} countries and territories in the database.
          </p>
          <CountryTable countries={view.countries} />
        </section>
      ) : (
        <>
          <section className="panel">
            <p className="list-summary">
              {countries.length} countries and territories grouped into {view.groups.length} {view.groupNoun} groups, largest
              group first. A country appears in more than one group when it lists more than one {view.groupNoun}.
            </p>
            <div className="actions">
              {view.groups.slice(0, 24).map((group) => (
                <a className="button secondary" href={`#${encodeURIComponent(group.label)}`} key={group.label}>
                  {group.label} ({group.items.length})
                </a>
              ))}
            </div>
          </section>
          {view.groups.map((group) => (
            <section className="panel" id={encodeURIComponent(group.label)} key={group.label}>
              <h2>
                {group.label} <span className="group-count">{group.items.length} countries</span>
              </h2>
              <CountryTable countries={group.items} />
            </section>
          ))}
        </>
      )}

      <section className="panel">
        <h2>FAQ</h2>
        <div className="faq-list">
          <article>
            <h3>How is this list sorted?</h3>
            <p>
              {view.mode === "groups"
                ? `Countries are grouped by ${view.groupNoun} and the largest groups are listed first.`
                : "This page sorts and filters the current SQLite country records to match the page topic."}
            </p>
          </article>
          <article>
            <h3>Is this a complete world list?</h3>
            <p>
              The database holds {countries.length} country and territory records imported from REST Countries. That count is
              larger than the number of sovereign states because it includes dependencies and territories.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
