"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Country } from "@/lib/countries";

type Props = {
  countries: Country[];
  title?: string;
  initialSlug?: string;
  headingLevel?: "h1" | "h2";
};

export default function RandomCountryTool({ countries, title = "Generate Random Country", initialSlug, headingLevel = "h2" }: Props) {
  const Heading = headingLevel;
  const initial = useMemo(() => {
    if (initialSlug) {
      const match = countries.find((country) => country.slug === initialSlug);
      if (match) return match;
    }
    return countries[0];
  }, [countries, initialSlug]);
  const [country, setCountry] = useState(initial);

  const generate = () => {
    if (countries.length === 0) return;
    const pool = countries.length > 1 ? countries.filter((item) => item.slug !== country.slug) : countries;
    setCountry(pool[Math.floor(Math.random() * pool.length)]);
  };

  if (!country) {
    return (
      <section className="tool-card">
        <h2>No country records found</h2>
        <p>Add countries to the SQLite database to use this generator.</p>
      </section>
    );
  }

  return (
    <section className="generator-console" aria-labelledby="generator-title">
      <div className="generator-command">
        <p className="eyebrow">Instant generator</p>
        <Heading id="generator-title">{title}</Heading>
        <p>
          Press generate and get a real country with its flag, capital, continent, population, area,
          currency, language, time zone, map coordinates, neighbors, and a quick fact.
        </p>
        <button className="generator-button" type="button" onClick={generate}>
          Generate Random Country
        </button>
        <div className="generator-mini-stats" aria-label="Generator summary">
          <span><strong>{countries.length}</strong> countries</span>
          <span><strong>{country.continent}</strong> current region</span>
        </div>
      </div>

      <article className="generator-spotlight">
        <div className="generator-flag">
          <img src={`https://flagcdn.com/w640/${country.flagCode}.png`} alt={`Flag of ${country.name}`} />
          <span>{country.continent}</span>
        </div>
        <div className="generator-country">
          <p className="eyebrow">Current result</p>
          <h3>{country.name}</h3>
          <p>{country.officialName}</p>
          <div className="generator-highlights">
            <span><small>Capital</small>{country.capital}</span>
            <span><small>Population</small>{country.population}</span>
            <span><small>Area</small>{country.area.toLocaleString()} km²</span>
          </div>
          <div className="actions">
            <Link className="button" href={`/country/${country.slug}`}>
              View Full Country Profile
            </Link>
            <button
              className="button secondary"
              type="button"
              onClick={() => navigator.clipboard.writeText(`${country.name} - ${window.location.origin}/country/${country.slug}`)}
            >
              Share Result
            </button>
          </div>
        </div>
      </article>

      <aside className="generator-facts" aria-label={`${country.name} quick facts`}>
        <h3>Quick facts</h3>
        <dl>
          <div><dt>Region</dt><dd>{country.region}</dd></div>
          <div><dt>Currency</dt><dd>{country.currency}</dd></div>
          <div><dt>Language</dt><dd>{country.language}</dd></div>
          <div><dt>Time zone</dt><dd>{country.timeZone}</dd></div>
          <div><dt>Calling code</dt><dd>{country.callingCode}</dd></div>
          <div><dt>Neighbors</dt><dd>{country.neighbors.length ? country.neighbors.join(", ") : "Island or no land borders"}</dd></div>
        </dl>
        <div className="generator-map" aria-label={`${country.name} map preview`}>
          <span>{country.latitude.toFixed(2)}, {country.longitude.toFixed(2)}</span>
        </div>
        <p className="fun-fact">{country.funFacts[0]}</p>
      </aside>
    </section>
  );
}
