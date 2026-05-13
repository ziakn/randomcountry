import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { travelPages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Travel Inspiration by Country",
  description: "Country-based travel inspiration pages with reminders to keep safety, cost, and entry information current.",
  alternates: { canonical: "/travel" },
};

export default function TravelHub() {
  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ label: "Travel" }]} />
      <section className="hero compact">
        <p className="eyebrow">Travel inspiration</p>
        <h1>Travel Inspiration</h1>
        <p>Use these pages for broad country inspiration. Safety, cost, and entry details must be reviewed regularly before publication.</p>
      </section>
      <section className="panel">
        <div className="link-grid">
          {travelPages.map(([slug, title, description]) => (
            <Link className="link-card" href={`/travel/${slug}`} key={slug}>
              <h2>{title}</h2>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
