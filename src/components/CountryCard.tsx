import Image from "next/image";
import Link from "next/link";
import { Country, formatArea, getFlagUrl } from "@/lib/countries";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <article className="country-card">
      <Image src={getFlagUrl(country)} alt={`Flag of ${country.name}`} width={640} height={427} sizes="(max-width: 880px) 100vw, 240px" />
      <div>
        <p className="eyebrow">{country.continent}</p>
        <h2>{country.name}</h2>
        <dl className="fact-list compact">
          <div>
            <dt>Capital</dt>
            <dd>{country.capital}</dd>
          </div>
          <div>
            <dt>Population</dt>
            <dd>{country.population}</dd>
          </div>
          <div>
            <dt>Area</dt>
            <dd>{formatArea(country.area)}</dd>
          </div>
          <div>
            <dt>Currency</dt>
            <dd>{country.currency}</dd>
          </div>
        </dl>
        <Link className="button" href={`/country/${country.slug}`}>
          Learn more
        </Link>
      </div>
    </article>
  );
}
