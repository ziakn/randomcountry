import Image from "next/image";
import Link from "next/link";
import { Country, formatArea, getFlagUrl } from "@/lib/countries";

export default function CountryTable({ countries }: { countries: Country[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Capital</th>
            <th>Continent</th>
            <th>Population</th>
            <th>Area</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.slug}>
              <td>
                <Link className="country-link" href={`/country/${country.slug}`}>
                  <Image src={getFlagUrl(country)} alt={`Flag of ${country.name}`} width={34} height={23} sizes="34px" />
                  {country.name}
                </Link>
              </td>
              <td>{country.capital}</td>
              <td>{country.continent}</td>
              <td>{country.population}</td>
              <td>{formatArea(country.area)}</td>
              <td>{country.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
