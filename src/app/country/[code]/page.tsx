import { notFound } from 'next/navigation';
import { getCountryByCode, getAllCountries } from '../../../utils/getRandomCountry';
import CountryCard from '../../../components/CountryCard';
import Link from 'next/link';

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateStaticParams() {
  const countries = getAllCountries();
  return countries.map((country) => ({
    code: country.code,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { code } = await params;
  const country = getCountryByCode(code);
  
  if (!country) {
    return {
      title: 'Country Not Found',
    };
  }

  return {
    title: `${country.name} - Geography, Facts, and Travel Guide`,
    description: `Discover ${country.name}: capital ${country.capital}, population ${country.population}, currency ${country.currency}. Learn about its geography, culture, and best places to visit.`,
    alternates: {
      canonical: `/country/${country.code}`,
    },
    openGraph: {
      title: `${country.name} - Country Profile`,
      description: `Explore ${country.name}: ${country.capital} • ${country.population} people`,
      url: `https://randomcountry.ziamuhammad.com/country/${country.code}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${country.name} - Country Profile`,
      description: `Explore ${country.name}: ${country.capital} • ${country.population} people`,
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { code } = await params;
  const country = getCountryByCode(code);

  if (!country) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${country.name} - Country Profile`,
    description: `Discover ${country.name}: capital ${country.capital}, population ${country.population}`,
    author: {
      '@type': 'Organization',
      name: 'Random Country Generator',
    },
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Home
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{country.name}</h1>
          <p className="text-xl text-gray-600">{country.region}</p>
        </header>

        <div className="mb-12">
          <CountryCard country={country} />
        </div>

        <section className="prose lg:prose-xl max-w-none">
          <h2>About {country.name}</h2>
          <p>
            {country.name} is a country located in {country.region}. Its capital city is {country.capital},
            with a population of approximately {country.population} people. The official currency is {country.currency}
            and the primary languages spoken are {country.language}.
          </p>

          <h2>Geography</h2>
          <p>
            Situated at coordinates {country.coordinates[0]}°N, {country.coordinates[1]}°E, {country.name}
            offers diverse landscapes and rich natural heritage.
          </p>

          <h2>Quick Facts</h2>
          <ul>
            <li><strong>Capital:</strong> {country.capital}</li>
            <li><strong>Population:</strong> {country.population}</li>
            <li><strong>Currency:</strong> {country.currency}</li>
            <li><strong>Languages:</strong> {country.language}</li>
            <li><strong>Region:</strong> {country.region}</li>
          </ul>

          <h2>Best Places to Visit</h2>
          <p>
            {country.name} offers numerous attractions for travelers. From historic sites to natural wonders,
            there's something for everyone.
          </p>
        </section>
      </article>
    </main>
  );
}