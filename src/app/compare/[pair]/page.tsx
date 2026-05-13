import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { formatArea, getCountry, getFlagUrl } from "@/lib/countries";

type Props = {
  params: Promise<{ pair: string }>;
};

export function generateStaticParams() {
  return [
    { pair: "pakistan-vs-india" },
    { pair: "qatar-vs-uae" },
    { pair: "italy-vs-france" },
    { pair: "japan-vs-south-korea" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const [left, right] = pair.split("-vs-");
  const a = getCountry(left);
  const b = getCountry(right);
  if (!a || !b) return {};
  return {
    title: `${a.name} vs ${b.name}`,
    description: `Compare ${a.name} and ${b.name} by population, area, capital, currency, language, region, time zone, flags, and FAQs.`,
    alternates: { canonical: `/compare/${pair}` },
  };
}

export default async function ComparePage({ params }: Props) {
  const { pair } = await params;
  const [left, right] = pair.split("-vs-");
  const a = getCountry(left);
  const b = getCountry(right);
  if (!a || !b) notFound();

  const rows = [
    ["Capital", a.capital, b.capital],
    ["Population", a.population, b.population],
    ["Area", formatArea(a.area), formatArea(b.area)],
    ["Currency", a.currency, b.currency],
    ["Language", a.language, b.language],
    ["Region", a.region, b.region],
    ["Time zone", a.timeZone, b.timeZone],
  ];

  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ href: "/compare-countries", label: "Compare Countries" }, { label: `${a.name} vs ${b.name}` }]} />
      <section className="hero compact">
        <p className="eyebrow">Country comparison</p>
        <h1>{a.name} vs {b.name}</h1>
        <p>Compare population, area, capital, currency, language, region, time zone, flags, and map basics.</p>
      </section>
      <section className="panel">
        <div className="link-grid">
          {[a, b].map((country) => (
            <Link className="link-card" href={`/country/${country.slug}`} key={country.slug}>
              <Image src={getFlagUrl(country)} alt={`Flag of ${country.name}`} width={640} height={427} sizes="(max-width: 880px) 100vw, 33vw" />
              <h2>{country.name}</h2>
              <p>{country.capital}, {country.continent}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="panel">
        <h2>Comparison table</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Field</th><th>{a.name}</th><th>{b.name}</th></tr></thead>
            <tbody>{rows.map(([label, leftValue, rightValue]) => <tr key={label}><td>{label}</td><td>{leftValue}</td><td>{rightValue}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
