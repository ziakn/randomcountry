import BreadcrumbBar from "@/components/BreadcrumbBar";

export const metadata = {
  title: "Cookie Policy - Random Country Generator",
  description: "Our cookie policy explains how we use cookies to improve your experience on our website.",
  openGraph: {
    title: "Cookie Policy",
    description: "Learn about the cookies we use to improve your experience on our website.",
  },
  alternates: {
    canonical: "/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Cookie Policy" },
        ]}
      />

      <article className="animate-fade-in-down">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Cookie Policy
          </h1>
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-1 w-24 rounded-full mx-auto mb-6" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </header>

        <div className="prose lg:prose-lg max-w-none dark:prose-invert">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit a website. They help
            websites remember information about your visit, such as your preferences, login status, and
            other settings.
          </p>

          <h2>Types of Cookies We Use</h2>

          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the Service to function properly. They enable basic functions like
            page navigation and access to secure areas of the website. The Service cannot function properly
            without these cookies.
          </p>

          <h3>Preference Cookies</h3>
          <p>
            These cookies allow the Service to remember choices you make, such as your language preference,
            dark mode setting, and other customizable aspects of the Service.
          </p>

          <h3>Local Storage Data</h3>
          <p>
            We use your browser's local storage to save your favorite countries and browsing history. This
            data is stored locally on your device and is not transmitted to our servers. You can clear this
            data at any time through your browser settings.
          </p>

          <h3>Analytics Cookies</h3>
          <p>
            If analytics or tracking tools are used on our Service, these cookies help us understand how
            visitors interact with our pages. This information is used to improve user experience and
            optimize our content.
          </p>

          <h2>Managing Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are already
            on your computer, and you can set most browsers to prevent them from being placed. If you do
            this, however, you may have to manually adjust some preferences every time you visit our Service.
          </p>
          <ul>
            <li>Most browsers accept cookies automatically, but you can usually modify your browser settings to decline cookies.</li>
            <li>You can clear cookies from your browser history at any time.</li>
            <li>Local storage data can be cleared through your browser's developer tools or settings.</li>
          </ul>

          <h2>Third-Party Cookies</h2>
          <p>
            Our Service may use third-party services that place their own cookies. These third-party cookies
            are subject to the respective third party's cookie policy. We have no control over these cookies.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting
            the new Cookie Policy on this page.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at hello@randomcountry.com.
          </p>
        </div>
      </article>
    </main>
  );
}