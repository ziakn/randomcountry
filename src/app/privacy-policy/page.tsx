import BreadcrumbBar from "@/components/BreadcrumbBar";

export const metadata = {
  title: "Privacy Policy - Random Country Generator",
  description: "Our privacy policy explains how we collect, use, and protect your personal information when you use our country generator website.",
  openGraph: {
    title: "Privacy Policy",
    description: "Learn how we handle your data and privacy at Random Country Generator.",
  },
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <article className="animate-fade-in-down">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-1 w-24 rounded-full mx-auto mb-6" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </header>

        <div className="prose lg:prose-lg max-w-none dark:prose-invert">
          <p>
            Random Country Generator ("we," "us," or "our") operates the Random Country Generator website
            (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure
            of personal data when you use our Service.
          </p>

          <h2>1. Information Collection and Use</h2>
          <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>

          <h3>Types of Data Collected</h3>
          <h4>Personal Data</h4>
          <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
          <ul>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Usage data</li>
          </ul>

          <h4>Usage Data</h4>
          <p>Usage Data is collected automatically when using the Service. Usage Data may include information such as:</p>
          <ul>
            <li>Your computer's Internet Protocol address (e.g., IP address)</li>
            <li>Browser type, browser version, the pages of our Service that you visit</li>
            <li>The time and date of your visit, the time spent on those pages</li>
            <li>Unique device identifiers and other diagnostic data</li>
          </ul>

          <h4>Local Storage Data</h4>
          <p>Our Service may store data locally on your device, such as your favorite countries and browsing history. This data is stored using your browser's local storage and is not transmitted to our servers.</p>

          <h2>2. Use of Data</h2>
          <p>We use the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service</li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2>3. Cookies and Similar Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.</p>
          <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>

          <h2>4. Data Security</h2>
          <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

          <h2>5. Service Providers</h2>
          <p>We may employ third-party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services, or to assist us in analyzing how our Service is used.</p>
          <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

          <h2>6. Analytics</h2>
          <p>We use analytics tools to measure traffic and usage trends for the Service. These tools collect information sent by your browser or mobile device, including the pages you visit, plugins, and other details that assist us in improving the Service.</p>

          <h2>7. Links to Other Sites</h2>
          <p>Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
          <p>We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>

          <h2>8. Children's Privacy</h2>
          <p>Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us.</p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>By email: hello@randomcountry.com</li>
            <li>By visiting this page on our website: <a href="/contact">/contact</a></li>
          </ul>
        </div>
      </article>
    </main>
  );
}