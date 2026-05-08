import Link from 'next/link';

const blogPosts = [
  {
    slug: 'most-beautiful-countries-in-europe',
    title: 'Most Beautiful Countries in Europe',
    description: 'Discover Europe\'s most stunning destinations, from Norway\'s fjords to Greece\'s islands.',
    date: '2024-01-15',
  },
  {
    slug: 'cheapest-countries-to-travel',
    title: 'Cheapest Countries to Travel in 2024',
    description: 'Explore budget-friendly destinations where your money goes further.',
    date: '2024-01-10',
  },
  {
    slug: 'safest-countries-in-asia',
    title: 'Safest Countries in Asia for Travelers',
    description: 'Your guide to secure and welcoming Asian destinations.',
    date: '2024-01-05',
  },
];

export const metadata = {
  title: 'Blog - Random Country Generator',
  description: 'Discover travel guides, country rankings, and geography insights.',
};

export default function BlogIndex() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel & Geography Blog</h1>
        <p className="text-gray-600">Insights, guides, and rankings for curious travelers</p>
      </header>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-8">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 mb-2">{post.description}</p>
            <time className="text-sm text-gray-500">{post.date}</time>
          </article>
        ))}
      </div>
    </main>
  );
}