import BreadcrumbBar from "@/components/BreadcrumbBar";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us - Random Country Generator",
  description: "Get in touch with the Random Country Generator team. We'd love to hear your feedback, questions, and suggestions.",
  openGraph: {
    title: "Contact Us",
    description: "Reach out to us for feedback, support, or just to say hello.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      <article className="animate-fade-in-down">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-1 w-24 rounded-full mx-auto mb-6" />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                📧 Email Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">For general inquiries:</p>
              <a href="mailto:hello@randomcountry.com" className="text-blue-600 dark:text-blue-400 font-medium">hello@randomcountry.com</a>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                💬 Social Media
              </h3>
              <div className="flex gap-3 mt-2">
                <a href="#" className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Twitter</a>
                <a href="#" className="px-4 py-2 bg-[#4267B2] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Facebook</a>
                <a href="#" className="px-4 py-2 bg-[#E4405F] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Instagram</a>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                🤝 Partnership
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Interested in partnering with us? Whether you're a travel company, educational institution,
                or content creator, we'd love to explore collaboration opportunities.
              </p>
              <a href="mailto:partners@randomcountry.com" className="inline-block mt-3 text-blue-600 dark:text-blue-400 font-medium">partners@randomcountry.com</a>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                ⭐ Contribute
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Love our project? You can support us by sharing with friends, leaving feedback, or
                contributing translations and content. Every bit helps us grow!
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}