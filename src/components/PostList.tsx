import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p>No posts have been published yet. Check back soon.</p>;
  }

  return (
    <div className="link-grid">
      {posts.map((post) => (
        <Link className="link-card" href={`/blog/${post.slug}`} key={post.slug}>
          <p className="eyebrow">
            <time dateTime={post.publishAt}>{post.publishAt}</time>
          </p>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </Link>
      ))}
    </div>
  );
}

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;

  const href = (target: number) => (target === 1 ? "/blog" : `/blog/page/${target}`);
  const window = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (item) => item === 1 || item === totalPages || Math.abs(item - page) <= 2
  );

  return (
    <nav className="pagination" aria-label="Blog pagination">
      {page > 1 && (
        <Link className="button secondary" href={href(page - 1)} rel="prev">
          Previous
        </Link>
      )}
      {window.map((item, index) => (
        <span key={item}>
          {index > 0 && item - window[index - 1] > 1 && <span className="pagination-gap">…</span>}
          {item === page ? (
            <span className="button" aria-current="page">
              {item}
            </span>
          ) : (
            <Link className="button secondary" href={href(item)}>
              {item}
            </Link>
          )}
        </span>
      ))}
      {page < totalPages && (
        <Link className="button secondary" href={href(page + 1)} rel="next">
          Next
        </Link>
      )}
    </nav>
  );
}
