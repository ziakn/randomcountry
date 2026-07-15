import type { Metadata } from "next";
import Link from "next/link";
import CountryTable from "@/components/CountryTable";
import JsonLd from "@/components/JsonLd";
import RandomCountryTool from "@/components/RandomCountryTool";
import { getCountries } from "@/lib/countries";
import { faqPageNode, webApplicationNode } from "@/lib/schema";
import { siteName } from "@/lib/seo";
import { getDailyCountry } from "@/lib/site";

export const metadata: Metadata = {
  // `absolute` bypasses the layout title template so it isn't appended twice.
  title: { absolute: "Random Country Generator | Quick Online Country Picker" },
  description:
    "Generate a completely random country instantly. The perfect online tool for travel inspiration, geography trivia, classroom games, and study guides.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    // A page-level openGraph replaces the layout's wholesale, so siteName must be restated
    // here or og:site_name would be dropped. og:image still comes from opengraph-image.tsx.
    siteName,
    title: "Random Country Generator | Quick Online Country Picker",
    description:
      "Generate a completely random country instantly — travel inspiration, geography trivia, classroom games, and study guides.",
  },
  twitter: {
    title: "Random Country Generator | Quick Online Country Picker",
    description: "Generate a completely random country instantly.",
  },
};

// Rotate the prerendered spotlight country once a day.
export const revalidate = 86400;

export default function Home() {
  const countries = getCountries();
  const daily = getDailyCountry(countries);

  return (
    <main className="page-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          // One connected graph. WebApplication + FAQ reference the sitewide
          // Organization/WebSite (emitted by layout.tsx) via @id instead of redefining them.
          "@graph": [
            webApplicationNode(),
            faqPageNode([
              {
                question: "Is this random country picker accurate?",
                answer: "The tool uses country records imported into SQLite from REST Countries and normalized for this website.",
              },
              {
                question: "Can I use it for school?",
                answer: "Yes. The result card and country pages are designed for school projects, quizzes, and geography practice.",
              },
              {
                question: "Does the site include country pages?",
                answer: "Yes. Each country in the database has a profile page with flag, map, facts, geography, culture, travel notes, and FAQs.",
              },
            ]),
          ],
        }}
      />
      <RandomCountryTool countries={countries} title="Random Country Generator" headingLevel="h1" initialSlug={daily?.slug} />

      {/* SEO intro — H2-led so the tool's H1 stays the single page H1. */}
      <section className="panel seo-copy" aria-labelledby="what-heading">
        <h2 id="what-heading">Random country generator and picker</h2>
        <p>
          Press generate to pull a real, sovereign country from a database of 250 nations and see its flag,
          capital, continent, population, area, currency, official language, and map location at once. No sign-up,
          no install — it runs client-side and works the same on a phone or a classroom projector.
        </p>

        <h2>What people use it for</h2>
        <ul className="use-cases">
          <li><strong>Classroom assignments:</strong> hand every student a different country for a flag, history, or geography report without picking favorites.</li>
          <li><strong>Trivia and study drills:</strong> hide the capital or flag on the result card and quiz yourself, then open the full profile to check.</li>
          <li><strong>Travel shortlists:</strong> surface a country you&apos;d never have searched for, then jump to its facts before you read further.</li>
          <li><strong>Writing prompts:</strong> get a concrete setting — real currency, language, and neighbors — instead of inventing one.</li>
        </ul>

        <h2>How the generator picks a country</h2>
        <p>
          Each click selects one record with equal probability across every country in the database, so no region
          is favored. Every result links to a full profile with geography, culture, food, famous places, and travel
          notes — and you can narrow the pool <Link href="/random-country-by-continent">by continent</Link> or{" "}
          <Link href="/random-country-by-letter">by starting letter</Link>.
        </p>
      </section>

      <section className="panel">
        <h2>Generator options</h2>
        <p>
          Generate a real random country instantly, or use one of these focused generator pages for continent,
          flag, capital, map, quiz, school, and travel use cases.
        </p>
        <div className="link-grid">
          <Link className="link-card" href="/random-country-by-continent"><h3>Generate by continent</h3><p>Filter random countries by region.</p></Link>
          <Link className="link-card" href="/lists/countries-by-population"><h3>Generate by population size</h3><p>Browse larger and smaller countries.</p></Link>
          <Link className="link-card" href="/learn/island-countries"><h3>Island countries</h3><p>Learn about countries made of islands.</p></Link>
          <Link className="link-card" href="/random-country-by-letter"><h3>Starting with A-Z</h3><p>Use countries by letter pages.</p></Link>
          <Link className="link-card" href="/learn/un-member-countries"><h3>UN member countries</h3><p>Understand common country counts.</p></Link>
          <Link className="link-card" href="/random-flag-generator"><h3>Random flag generator</h3><p>Practice country flags.</p></Link>
        </div>
      </section>

      <section className="panel">
        <h2>Quick navigation</h2>
        <div className="actions">
          <Link className="button secondary" href="/tools">All tools</Link>
          <Link className="button secondary" href="/countries">Browse countries</Link>
          <Link className="button secondary" href="/quizzes">Try quizzes</Link>
          <Link className="button secondary" href="/learn">Learn geography</Link>
          <Link className="button secondary" href="/blog">Read guides</Link>
        </div>
      </section>

      <section className="panel">
        <h2>Country directory preview</h2>
        <CountryTable countries={countries.slice(0, 10)} />
      </section>

      <section className="panel">
        <h2>FAQ</h2>
        <div className="faq-list">
          <article>
            <h3>Is this random country picker accurate?</h3>
            <p>The tool uses country records imported into SQLite from REST Countries and normalized for this website.</p>
          </article>
          <article>
            <h3>Can I use it for school?</h3>
            <p>Yes. The result card and country pages are designed for school projects, quizzes, and geography practice.</p>
          </article>
          <article>
            <h3>Does the site include country pages?</h3>
            <p>Yes. Each country in the database has a profile page with flag, map, facts, geography, culture, travel notes, and FAQs.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
