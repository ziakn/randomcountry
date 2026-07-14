import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Pagination, PostList } from "@/components/PostList";
import { getPublishedPostPage, getPublishedPosts, POSTS_PER_PAGE } from "@/lib/posts";

type Props = {
  params: Promise<{ page: string }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  const totalPages = Math.ceil(getPublishedPosts().length / POSTS_PER_PAGE);
  // Page 1 lives at /blog, so it is not duplicated here.
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Country Learning Blog: Page ${page}`,
    description: `Page ${page} of country guides, geography explainers, and classroom activity ideas.`,
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPaginationPage({ params }: Props) {
  const { page } = await params;
  const requested = Number(page);
  if (!Number.isInteger(requested) || requested < 1) notFound();
  // Keep a single canonical home for page 1.
  if (requested === 1) redirect("/blog");

  const result = getPublishedPostPage(requested);
  if (requested > result.totalPages) notFound();

  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ href: "/blog", label: "Blog" }, { label: `Page ${result.page}` }]} />
      <section className="hero compact">
        <p className="eyebrow">Country guides</p>
        <h1>Country Learning Blog</h1>
        <p>
          Page {result.page} of {result.totalPages}, showing {result.total} published articles.
        </p>
      </section>
      <section className="panel">
        <PostList posts={result.posts} />
        <Pagination page={result.page} totalPages={result.totalPages} />
      </section>
    </main>
  );
}
