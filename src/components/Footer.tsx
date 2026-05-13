import Link from "next/link";

const groups = [
  {
    title: "Tools",
    links: [
      ["/tools", "All Tools"],
      ["/random-country-generator", "Random Country Generator"],
      ["/random-flag-generator", "Random Flag Generator"],
      ["/random-country-capital-generator", "Random Capital Generator"],
      ["/random-country-quiz", "Random Country Quiz"],
      ["/compare-countries", "Country Comparison"],
    ],
  },
  {
    title: "Countries",
    links: [
      ["/countries", "All Countries"],
      ["/lists/countries-by-continent", "Countries by Continent"],
      ["/lists/countries-by-population", "Countries by Population"],
      ["/lists/countries-by-area", "Countries by Area"],
      ["/lists/countries-by-language", "Countries by Language"],
      ["/lists/countries-by-currency", "Countries by Currency"],
    ],
  },
  {
    title: "Continents",
    links: [
      ["/continent/asia/random-country", "Asia"],
      ["/continent/europe/random-country", "Europe"],
      ["/continent/africa/random-country", "Africa"],
      ["/continent/north-america/random-country", "North America"],
      ["/continent/south-america/random-country", "South America"],
      ["/continent/oceania/random-country", "Oceania"],
    ],
  },
  {
    title: "Company",
    links: [
      ["/about", "About"],
      ["/contact", "Contact"],
      ["/privacy-policy", "Privacy Policy"],
      ["/terms-and-conditions", "Terms"],
      ["/disclaimer", "Disclaimer"],
      ["/cookie-policy", "Cookie Policy"],
      ["/editorial-policy", "Editorial Policy"],
      ["/data-sources", "Data Sources"],
      ["/sitemap", "HTML Sitemap"],
      ["/blog", "Blog"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {groups.map((group) => (
          <section key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="footer-note">Country data changes over time. Review important facts with official sources.</p>
    </footer>
  );
}
