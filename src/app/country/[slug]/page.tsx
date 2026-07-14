import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { formatArea, getCountries, getCountry, getFlagUrl } from "@/lib/countries";
import { absoluteUrl, dataSource, siteAuthor, siteName } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCountries().map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  return {
    title: `${country.name}: Capital, Flag, Map, Population, Currency and Facts`,
    description: `Learn about ${country.name}, including its capital, flag, map, population, currency, languages, geography, culture, travel facts, and FAQs.`,
    alternates: { canonical: `/country/${country.slug}` },
    // Profiles still on generated import copy stay out of the index until rewritten.
    robots: country.reviewed ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${country.name} Country Facts`,
      description: `Capital, flag, map, population, currency, language, geography and travel facts for ${country.name}.`,
      images: [getFlagUrl(country)],
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  const facts = [
    ["Capital", country.capital],
    ["Continent", country.continent],
    ["Region", country.region],
    ["Population", country.population],
    ["Area", formatArea(country.area)],
    ["Currency", `${country.currency} (${country.currencyCode})`],
    ["Official language", country.language],
    ["Calling code", country.callingCode],
    ["Internet TLD", country.tld],
    ["Time zone", country.timeZone],
  ];
  const faqs = [
    [`What is the capital of ${country.name}?`, `The capital of ${country.name} is ${country.capital}.`],
    [`What continent is ${country.name} in?`, `${country.name} is in ${country.continent}.`],
    [`What currency does ${country.name} use?`, `${country.name} uses the ${country.currency}.`],
    [`What language is spoken in ${country.name}?`, `${country.language} is listed for ${country.name} in this database.`],
  ];

  return (
    <main className="page-shell country-page">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Country",
            "@id": absoluteUrl(`/country/${country.slug}#country`),
            name: country.name,
            alternateName: country.officialName,
            capital: country.capital,
            image: getFlagUrl(country),
            url: absoluteUrl(`/country/${country.slug}`),
            geo: {
              "@type": "GeoCoordinates",
              latitude: country.latitude,
              longitude: country.longitude,
            },
          },
          // Provenance: AI answer engines preferentially cite sources with an explicit
          // author, revision date, and upstream citation.
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": absoluteUrl(`/country/${country.slug}`),
            name: `${country.name} country profile`,
            about: { "@id": absoluteUrl(`/country/${country.slug}#country`) },
            url: absoluteUrl(`/country/${country.slug}`),
            dateModified: country.reviewedAt || undefined,
            isPartOf: { "@type": "WebSite", name: siteName, url: absoluteUrl("/") },
            author: { "@type": "Organization", name: siteAuthor.name, url: absoluteUrl("/about") },
            publisher: { "@type": "Organization", name: siteName, url: absoluteUrl("/") },
            citation: {
              "@type": "Dataset",
              name: dataSource.name,
              url: dataSource.url,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(([question, answer]) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: {
                "@type": "Answer",
                text: answer,
              },
            })),
          },
        ]}
      />
      <Breadcrumbs items={[{ href: "/countries", label: "Countries" }, { label: country.name }]} />
      <section className="hero compact">
        <p className="eyebrow">{country.continent}</p>
        <h1>{country.name}</h1>
        <p>{country.name} is a country in {country.region}. Learn its capital, flag, population, area, currency, language, geography, culture, food, famous places, travel facts, and FAQs.</p>
        <p className="provenance">
          Source data: <a href={dataSource.url} rel="nofollow noopener" target="_blank">{dataSource.name}</a>
          {country.reviewedAt ? ` · Reviewed ${country.reviewedAt}` : " · Awaiting editorial review"}
          {" · "}
          <Link href="/data-sources">How we source country data</Link>
        </p>
      </section>

      <section className="panel flag-map-grid">
        <Image src={getFlagUrl(country)} alt={`Flag of ${country.name}`} width={640} height={427} sizes="(max-width: 880px) 100vw, 360px" priority />
        <div>
          <h2>Quick Facts</h2>
          <dl className="fact-list">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="map-preview">
            <span>{country.name} map preview: {country.latitude.toFixed(2)}, {country.longitude.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel"><h2>Geography</h2><p>{country.geography}</p><p><strong>Neighboring countries:</strong> {country.neighbors.length ? country.neighbors.join(", ") : "No land borders."}</p></article>
        <article className="panel"><h2>People and Culture</h2><p>{country.culture}</p><p><strong>Food:</strong> {country.food}</p></article>
        <article className="panel"><h2>Short History</h2><p>{country.history}</p></article>
      </section>

      <section className="panel">
        <h2>Famous Places and Travel Facts</h2>
        <div className="link-grid">
          <article className="link-card"><h3>Famous places</h3><ul>{country.famousPlaces.map((place) => <li key={place}>{place}</li>)}</ul></article>
          <article className="link-card"><h3>Travel facts</h3><ul>{country.travelFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul></article>
          <article className="link-card"><h3>Fun facts</h3><ul>{country.funFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul></article>
        </div>
      </section>

      <section className="panel">
        <h2>FAQs about {country.name}</h2>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Related pages</h2>
        <div className="link-grid">
          <Link className="link-card" href={`/continent/${country.continent.toLowerCase().replace(/\s+/g, "-")}/random-country`}><h3>{country.continent} random country</h3><p>Generate countries from the same continent.</p></Link>
          <Link className="link-card" href="/random-country-generator"><h3>Random country generator</h3><p>Generate another country.</p></Link>
          <Link className="link-card" href="/quiz/guess-the-flag"><h3>Guess the flag</h3><p>Practice flags with quiz pages.</p></Link>
        </div>
      </section>
    </main>
  );
}
