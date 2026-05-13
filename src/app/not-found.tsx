import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested country, tool, guide, or list page could not be found.",
};

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="hero compact">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page may have moved, the country slug may be different, or the URL may contain a typo.</p>
      </section>
      <section className="panel">
        <h2>Go somewhere useful</h2>
        <div className="link-grid">
          <Link className="link-card" href="/random-country-generator"><h3>Random Country Generator</h3><p>Generate a country instantly.</p></Link>
          <Link className="link-card" href="/countries"><h3>Countries Directory</h3><p>Browse every country profile.</p></Link>
          <Link className="link-card" href="/sitemap"><h3>HTML Sitemap</h3><p>Find tools, guides, lists, maps, and trust pages.</p></Link>
        </div>
      </section>
    </main>
  );
}
