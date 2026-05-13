import Breadcrumbs from "@/components/Breadcrumbs";
import CountryTable from "@/components/CountryTable";
import JsonLd from "@/components/JsonLd";
import RandomCountryTool from "@/components/RandomCountryTool";
import { Country } from "@/lib/countries";
import type { RootPage } from "@/lib/site";

export default function ToolPage({ page, countries }: { page: RootPage; countries: Country[] }) {
  return (
    <main className="page-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: page.title,
          description: page.description,
          applicationCategory: "EducationalApplication",
        }}
      />
      <Breadcrumbs items={[{ label: page.title }]} />
      <section className="hero compact">
        <p className="eyebrow">Generator tool</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </section>
      <RandomCountryTool countries={countries} title={page.title} />
      <section className="content-grid">
        {page.sections.map((section) => (
          <article className="panel" key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>
      {page.faq && (
        <section className="panel">
          <h2>FAQ</h2>
          <div className="faq-list">
            {page.faq.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="panel">
        <h2>Explore countries</h2>
        <CountryTable countries={countries.slice(0, 8)} />
      </section>
    </main>
  );
}
