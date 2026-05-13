import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CountryTable from "@/components/CountryTable";
import JsonLd from "@/components/JsonLd";
import ToolPage from "@/components/ToolPage";
import { getCountries } from "@/lib/countries";
import { absoluteUrl } from "@/lib/seo";
import { blogPages, learnPages, legalPages, listPages, mapPages, quizPages, rootPages, toolPages, travelPages } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return rootPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = rootPages.find((item) => item.slug === slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function RootContentPage({ params }: Props) {
  const { slug } = await params;
  const page = rootPages.find((item) => item.slug === slug);
  if (!page) notFound();

  const countries = getCountries();
  const isTool = toolPages.some((item) => item.slug === page.slug);

  if (isTool) {
    return <ToolPage page={page} countries={countries} />;
  }

  const sitemapGroups = [
    ["Tools", [["/tools", "All Tools"], ...toolPages.map((item) => ["/" + item.slug, item.title])]],
    ["Countries", [["/countries", "All Countries"], ...countries.map((country) => [`/country/${country.slug}`, country.name])]],
    ["Lists", [["/lists", "Lists Hub"], ...listPages.map(([itemSlug, title]) => [`/lists/${itemSlug}`, title])]],
    ["Quizzes", [["/quizzes", "Quiz Hub"], ...quizPages.map(([itemSlug, title]) => [`/quiz/${itemSlug}`, title])]],
    ["Maps", [["/maps", "Map Hub"], ...mapPages.map(([itemSlug, title]) => [`/maps/${itemSlug}`, title])]],
    ["Learn", [["/learn", "Learn Hub"], ...learnPages.map(([itemSlug, title]) => [`/learn/${itemSlug}`, title])]],
    ["Blog", [["/blog", "Blog Hub"], ...blogPages.map((item) => [`/blog/${item.slug}`, item.title])]],
    ["Travel", [["/travel", "Travel Hub"], ...travelPages.map(([itemSlug, title]) => [`/travel/${itemSlug}`, title])]],
    ["Trust", legalPages.map((item) => ["/" + item.slug, item.title])],
  ] as const;

  return (
    <main className="page-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.title,
          description: page.description,
          url: absoluteUrl(`/${page.slug}`),
        }}
      />
      <Breadcrumbs items={[{ label: page.title }]} />
      <section className="hero compact">
        <p className="eyebrow">{page.kind}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </section>

      <section className="content-grid">
        {page.sections.map((section) => (
          <article className="panel" key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      {page.slug === "sitemap" ? (
        <section className="panel">
          <h2>Browse the website</h2>
          <div className="link-grid">
            {sitemapGroups.map(([group, links]) => (
              <article className="link-card" key={group}>
                <h3>{group}</h3>
                <ul>
                  {links.slice(0, 12).map(([href, label]) => (
                    <li key={href}>
                      <Link href={href}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="panel">
          <h2>Useful next pages</h2>
          <div className="link-grid">
            <Link className="link-card" href="/random-country-generator"><h3>Random Country Generator</h3><p>Open the main tool.</p></Link>
            <Link className="link-card" href="/countries"><h3>Countries Directory</h3><p>Browse A-Z country pages.</p></Link>
            <Link className="link-card" href="/data-sources"><h3>Data Sources</h3><p>See how country data should be maintained.</p></Link>
          </div>
        </section>
      )}

      <section className="panel">
        <h2>Country data preview</h2>
        <CountryTable countries={countries.slice(0, 8)} />
      </section>
    </main>
  );
}
