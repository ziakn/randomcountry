import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getPostNeighbors, getPublishedPost, getPublishedPosts, getRelatedPosts, wordCount } from "@/lib/posts";
import { absoluteUrl, siteAuthor, siteName } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

// Re-checked hourly so the day's post appears without a redeploy. Posts whose date has not
// arrived are not prerendered and 404 on request, so a queued post can never leak early.
export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [post.focusKeyword, ...post.secondaryKeywords].filter(Boolean),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.publishAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) notFound();

  const { newer, older } = getPostNeighbors(post);
  const related = getRelatedPosts(post);
  const url = absoluteUrl(`/blog/${post.slug}`);

  // BlogPosting always. HowTo is added for procedural posts because, unlike FAQPage, it is
  // still a live rich-result type for ordinary sites.
  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      headline: post.metaTitle.slice(0, 110),
      alternativeHeadline: post.title,
      description: post.metaDescription,
      datePublished: post.publishAt,
      dateModified: post.updatedAt,
      inLanguage: "en",
      wordCount: wordCount(post),
      keywords: [post.focusKeyword, ...post.secondaryKeywords].filter(Boolean).join(", "),
      articleSection: post.cluster || undefined,
      author: {
        "@type": "Organization",
        name: post.author || siteAuthor.name,
        url: absoluteUrl("/about"),
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: absoluteUrl("/"),
      },
      mainEntityOfPage: url,
    },
  ];

  if (post.schemaType === "HowTo") {
    schema.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: post.title,
      description: post.metaDescription,
      step: post.sections.map((section, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: section.heading,
        text: section.body,
        url: `${url}#step-${index + 1}`,
      })),
    });
  }

  if (post.faq.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return (
    <main className="page-shell">
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ href: "/blog", label: "Blog" }, { label: post.title }]} />
      <article>
        <section className="hero compact">
          <p className="eyebrow">Country guide</p>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </section>

        <section className="author-box" aria-label="Article information">
          <div>
            <strong>{post.author || siteAuthor.name}</strong>
            <p>{siteAuthor.bio}</p>
          </div>
          <span>
            <time dateTime={post.publishAt}>Published {post.publishAt}</time>
            {post.updatedAt !== post.publishAt && <> · Updated {post.updatedAt}</>}
          </span>
        </section>

        <section className="content-grid">
          {post.sections.map((section, index) => (
            <article className="panel" id={`step-${index + 1}`} key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>

        {post.faq.length > 0 && (
          <section className="panel">
            <h2>FAQ</h2>
            <div className="faq-list">
              {post.faq.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>

      {(newer || older) && (
        <nav className="post-nav" aria-label="More posts">
          {older ? (
            <Link className="link-card" href={`/blog/${older.slug}`}>
              <p className="eyebrow">Previous</p>
              <h3>{older.title}</h3>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link className="link-card" href={`/blog/${newer.slug}`}>
              <p className="eyebrow">Next</p>
              <h3>{newer.title}</h3>
            </Link>
          )}
        </nav>
      )}

      {related.length > 0 && (
        <section className="panel">
          <h2>More on {post.cluster ? post.cluster.replace(/-/g, " ") : "this topic"}</h2>
          <div className="link-grid">
            {related.map((item) => (
              <Link className="link-card" href={`/blog/${item.slug}`} key={item.slug}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="panel">
        <h2>Related pages</h2>
        <div className="link-grid">
          <Link className="link-card" href="/random-country-generator"><h3>Random Country Generator</h3><p>Generate a country and explore its facts.</p></Link>
          <Link className="link-card" href="/tools"><h3>Country Tools</h3><p>Browse all generators and quizzes.</p></Link>
          <Link className="link-card" href="/learn"><h3>Learn Geography</h3><p>Read educational guides about countries.</p></Link>
        </div>
      </section>
    </main>
  );
}
