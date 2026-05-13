import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import RandomCountryTool from "@/components/RandomCountryTool";
import { getCountries } from "@/lib/countries";
import { travelPages } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return travelPages.map(([slug]) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = travelPages.find(([itemSlug]) => itemSlug === slug);
  if (!page) return {};
  return {
    title: page[1],
    description: page[2],
    alternates: { canonical: `/travel/${slug}` },
  };
}

export default async function TravelPage({ params }: Props) {
  const { slug } = await params;
  const page = travelPages.find(([itemSlug]) => itemSlug === slug);
  if (!page) notFound();
  const [, title, description] = page;
  const countries = getCountries();

  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ href: "/travel", label: "Travel" }, { label: title }]} />
      <section className="hero compact">
        <p className="eyebrow">Review before publishing</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <RandomCountryTool countries={countries} title={title} />
      <section className="panel">
        <h2>Important travel note</h2>
        <p>Travel conditions, entry rules, prices, and safety information can change quickly. Add official sources and update dates before treating travel content as advice.</p>
      </section>
    </main>
  );
}
