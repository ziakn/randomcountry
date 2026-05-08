import { Mail, MapPin, Phone } from "lucide-react";
import BreadcrumbBar from "@/components/BreadcrumbBar";

export const metadata = {
  title: "About Us - Random Country Generator",
  description: "Learn about the team behind Random Country Generator. Our mission to make geography fun and accessible for everyone.",
  openGraph: {
    title: "About Us",
    description: "Meet the team and learn about our mission to make exploring the world fun for everyone.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

      <article className="animate-fade-in-down">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">About Us</h1>
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-1 w-24 rounded-full mx-auto mb-6" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're passionate about geography and making the world more accessible to everyone.
          </p>
        </header>

        <section className="prose lg:prose-lg max-w-none dark:prose-invert mb-12">
          <h2>Our Mission</h2>
          <p>
            Random Country Generator was created with a simple idea: make learning about the world fun,
            accessible, and engaging for everyone. Whether you're a student researching for a project,
            a traveler looking for your next destination, or just curious about the world, our tool is
            designed to spark curiosity and inspire exploration.
          </p>
          <p>
            We believe that understanding the world's diverse cultures, geographies, and histories is
            essential for building empathy and global awareness. Our platform brings together data from
            across the globe into an easy-to-use, interactive experience.
          </p>

          <h2>What We Offer</h2>
          <ul>
            <li><strong>Random Country Generator</strong> — Discover a new country with every click</li>
            <li><strong>Country Profiles</strong> — Detailed information about 195+ countries including geography, economy, culture, and travel guides</li>
            <li><strong>Comparison Tools</strong> — Side-by-side country comparisons for research and curiosity</li>
            <li><strong>Geography Quizzes</strong> — Test your knowledge and learn through interactive challenges</li>
            <li><strong>Travel Blog</strong> — In-depth guides and articles about destinations around the world</li>
          </ul>

          <h2>Our Team</h2>
          <p>
            We are a small team of geography enthusiasts, developers, and content creators who are passionate
            about making the world more accessible. Our backgrounds span software engineering, education,
            and travel writing.
          </p>
          <p>
            We started this project because we believe that geographic literacy is more important than ever
            in our interconnected world. From understanding global events to planning your next adventure,
            knowing about different countries and cultures enriches our lives in countless ways.
          </p>

          <h2>Our Data</h2>
          <p>
            We source our country data from reputable international databases and update it regularly to ensure
            accuracy. Our database includes 195+ recognized countries and territories, covering key topics
            such as population, geography, culture, economy, and more.
          </p>

          <h2>Contact Us</h2>
          <p>We'd love to hear from you! Whether you have feedback, suggestions, or just want to say hello, reach out anytime.</p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">hello@randomcountry.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <MapPin className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Based In</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Remote — Worldwide</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-2xl p-6 mt-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Our Commitment</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>✅ Providing accurate, up-to-date country information</li>
            <li>✅ Making geography education accessible and engaging</li>
            <li>✅ Respecting user privacy and data security</li>
            <li>✅ Building an inclusive platform for all ages</li>
            <li>✅ Continuously improving based on community feedback</li>
          </ul>
        </section>
      </article>
    </main>
  );
}