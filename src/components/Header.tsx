import Link from "next/link";

const nav = [
  ["/random-country-generator", "Random Country"],
  ["/tools", "Tools"],
  ["/countries", "Countries"],
  ["/quizzes", "Quizzes"],
  ["/learn", "Learn"],
  ["/blog", "Blog"],
];

export default function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">RC</span>
        <span>Random Country</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {nav.map(([href, label]) => (
          <Link href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
