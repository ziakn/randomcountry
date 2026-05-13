import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { mapPages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Country Maps",
  description: "Browse world map, regional map, and random country map learning pages.",
  alternates: { canonical: "/maps" },
};

export default function MapsHub() {
  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ label: "Maps" }]} />
      <section className="hero compact">
        <p className="eyebrow">Map hub</p>
        <h1>Country Maps</h1>
        <p>Map pages help users connect country names with locations, regions, neighbors, and continents.</p>
      </section>
      <section className="panel">
        <div className="link-grid">
          {mapPages.map(([slug, title, description]) => (
            <Link className="link-card" href={`/maps/${slug}`} key={slug}>
              <h2>{title}</h2>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
