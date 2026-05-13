import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { quizPages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Country Quizzes",
  description: "Practice geography with country, flag, capital, map, continent, currency, and language quizzes.",
  alternates: { canonical: "/quizzes" },
};

export default function QuizzesHub() {
  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ label: "Quizzes" }]} />
      <section className="hero compact">
        <p className="eyebrow">Quiz hub</p>
        <h1>Country Quizzes</h1>
        <p>Choose a quiz mode and practice countries, flags, capitals, currencies, languages, and continents.</p>
      </section>
      <section className="panel">
        <div className="link-grid">
          {quizPages.map(([slug, title, description]) => (
            <Link className="link-card" href={`/quiz/${slug}`} key={slug}>
              <h2>{title}</h2>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
