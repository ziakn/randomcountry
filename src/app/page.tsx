import type { Metadata } from "next";
import Link from "next/link";
import CountryTable from "@/components/CountryTable";
import JsonLd from "@/components/JsonLd";
import RandomCountryTool from "@/components/RandomCountryTool";
import { getCountries } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Random Country Generator",
  description: "Generate a random country instantly and learn its flag, capital, continent, population, area, currency, language, map, and facts.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const countries = getCountries();

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Random Country Generator",
            applicationCategory: "EducationalApplication",
            description: "Generate a random country and learn facts about flags, capitals, continents, population, area, currency, language, and maps.",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this random country picker accurate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The tool uses country records imported into SQLite from REST Countries and normalized for this website.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use it for school?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The result card and country pages are designed for school projects, quizzes, and geography practice.",
                },
              },
              {
                "@type": "Question",
                name: "Does the site include country pages?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Each country in the database has a profile page with flag, map, facts, geography, culture, travel notes, and FAQs.",
                },
              },
            ],
          },
        ]}
      />
      <RandomCountryTool countries={countries} title="Random Country Generator" headingLevel="h1" />

      <section className="content-grid">
        <article className="panel">
          <h2>What is a random country generator?</h2>
          <p>
            It is a tool that picks a real country from a country database and shows useful facts for learning,
            games, classroom activities, writing prompts, and travel inspiration.
          </p>
        </article>
        <article className="panel">
          <h2>How to use this tool</h2>
          <p>
            Click generate, read the result card, then open the full profile to learn about geography, culture,
            food, famous places, travel facts, fun facts, and FAQs.
          </p>
        </article>
        <article className="panel">
          <h2>Why use this tool?</h2>
          <p>
            It helps students, teachers, quiz hosts, geography fans, and curious travelers find country ideas
            without scrolling through long lists.
          </p>
        </article>
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
