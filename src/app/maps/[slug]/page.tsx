import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CountryTable from "@/components/CountryTable";
import RandomCountryTool from "@/components/RandomCountryTool";
import { getCountries } from "@/lib/countries";
import { mapPages } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return mapPages.map(([slug]) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = mapPages.find(([itemSlug]) => itemSlug === slug);
  if (!page) return {};
  return {
    title: page[1],
    description: page[2],
    alternates: { canonical: `/maps/${slug}` },
  };
}

export default async function MapPage({ params }: Props) {
  const { slug } = await params;
  const page = mapPages.find(([itemSlug]) => itemSlug === slug);
  if (!page) notFound();
  const [, title, description] = page;
  const countries = getCountries();

  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ href: "/maps", label: "Maps" }, { label: title }]} />
      <section className="hero compact">
        <p className="eyebrow">Map learning</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <RandomCountryTool countries={countries} title={title} />
      <section className="panel">
        <h2>Map data table</h2>
        <CountryTable countries={countries} />
      </section>
    </main>
  );
}
