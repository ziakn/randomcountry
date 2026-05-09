export const metadata = {
  title: "Blog - Random Country Generator",
  description: "Discover travel guides, country rankings, geography insights, and educational resources.",
  openGraph: {
    title: "Blog - Random Country Generator",
    description: "Travel guides, country rankings, and geography insights for curious explorers.",
  },
};

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

import Link from "next/link";
import BlogClient from "./BlogClient";

export default function Blog() {
  return <BlogClient blogPosts={blogPosts} />;
}