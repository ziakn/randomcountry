import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { listPages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Country Lists",
  description: "Browse country lists by continent, population, area, capital, currency, language, island countries, and landlocked countries.",
  alternates: { canonical: "/lists" },
};

export default function ListsHub() {
  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ label: "Lists" }]} />
      <section className="hero compact">
        <p className="eyebrow">Country lists</p>
        <h1>Country Lists</h1>
        <p>Browse useful country tables with intro text, internal links, FAQs, and last-updated notes.</p>
      </section>
      <section className="panel">
        <div className="link-grid">
          {listPages.map(([slug, title, description]) => (
            <Link className="link-card" href={`/lists/${slug}`} key={slug}>
              <h2>{title}</h2>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
