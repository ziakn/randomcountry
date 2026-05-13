import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { learnPages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learn Geography",
  description: "Educational geography guides about countries, continents, currencies, languages, time zones, and country counts.",
  alternates: { canonical: "/learn" },
};

export default function LearnHub() {
  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ label: "Learn" }]} />
      <section className="hero compact">
        <p className="eyebrow">Learning hub</p>
        <h1>Learn About Countries</h1>
        <p>People-first guides that explain country concepts, continents, populations, currencies, languages, and time zones.</p>
      </section>
      <section className="panel">
        <div className="link-grid">
          {learnPages.map(([slug, title, description]) => (
            <Link className="link-card" href={`/learn/${slug}`} key={slug}>
              <h2>{title}</h2>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
