import Link from "next/link";

const blogPosts = [
  {
    slug: "most-beautiful-countries-in-europe",
    title: "Most Beautiful Countries in Europe",
    description: "Discover Europe's most stunning destinations, from Norway's fjords to Greece's islands.",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Travel",
    image: "🏔️",
  },
  {
    slug: "cheapest-countries-to-travel",
    title: "Cheapest Countries to Travel in 2025",
    description: "Explore budget-friendly destinations where your money goes further without sacrificing experiences.",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Travel",
    image: "💰",
  },
  {
    slug: "safest-countries-in-asia",
    title: "Safest Countries in Asia for Travelers",
    description: "Your comprehensive guide to secure and welcoming Asian destinations for every type of traveler.",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Travel",
    image: "🛡️",
  },
  {
    slug: "largest-countries-in-the-world",
    title: "Largest Countries in the World by Area",
    description: "From Russia to Vatican City, explore the world's biggest and smallest nations by land area.",
    date: "2024-02-01",
    readTime: "5 min read",
    category: "Geography",
    image: "🌍",
  },
  {
    slug: "richest-countries-in-the-world",
    title: "Richest Countries in the World by GDP",
    description: "Which nations have the strongest economies? Explore global wealth rankings and economic powerhouses.",
    date: "2024-02-15",
    readTime: "6 min read",
    category: "Rankings",
    image: "💎",
  },
  {
    slug: "best-countries-to-study",
    title: "Best Countries for International Students in 2025",
    description: "Top destinations for quality education, affordable tuition, and student-friendly environments.",
    date: "2024-03-01",
    readTime: "9 min read",
    category: "Education",
    image: "🎓",
  },
];

export const metadata = {
  title: "Blog - Random Country Generator",
  description: "Discover travel guides, country rankings, geography insights, and educational resources.",
  openGraph: {
    title: "Blog - Random Country Generator",
    description: "Travel guides, country rankings, and geography insights for curious explorers.",
  },
};

export default function BlogIndex() {
  const categories = ["All", "Travel", "Geography", "Rankings", "Education"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 text-center animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          📝 Travel &amp; Geography Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Expert travel guides, in-depth country profiles, fascinating geography facts, and rankings to fuel your wanderlust.
        </p>
      </header>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap animate-fade-in" style={{ animationDelay: "0.2s" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
              <div className={`h-44 flex items-center justify-center text-6xl bg-gradient-to-br ${
                post.category === "Travel" ? "from-blue-500 to-blue-600" :
                post.category === "Geography" ? "from-green-500 to-emerald-600" :
                post.category === "Rankings" ? "from-purple-500 to-purple-600" :
                post.category === "Education" ? "from-yellow-500 to-orange-500" :
                "from-gray-500 to-gray-600"
              } group-hover:from-blue-600 group-hover:to-blue-700 transition-colors`}>
                <span>{post.image}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{post.description}</p>
                <time className="text-xs text-gray-400 mt-3 block">{new Date(post.date).toLocaleDateString("en-US", { long: "numeric", year: "numeric" })}</time>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No blog posts in this category yet.</p>
        </div>
      )}
    </main>
  );
}

// Keep default export for the page
export default BlogIndex;