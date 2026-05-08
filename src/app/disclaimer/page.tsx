import BreadcrumbBar from "@/components/BreadcrumbBar";

export const metadata = {
  title: "Disclaimer - Random Country Generator",
  description: "Read our disclaimer regarding the accuracy and use of information on the Random Country Generator website.",
  openGraph: {
    title: "Disclaimer",
    description: "Important disclaimers about the information provided on our website.",
  },
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Disclaimer" },
        ]}
      />

      <article className="animate-fade-in-down">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Disclaimer
          </h1>
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-1 w-24 rounded-full mx-auto mb-6" />
        </header>

        <div className="prose lg:prose-lg max-w-none dark:prose-invert">
          <h2>General Disclaimer</h2>
          <p>
            The information contained on the Random Country Generator website (the "Service") is for general
            informational purposes only. All information on the Service is provided in good faith. However,
            Random Country Generator makes no representation or warranty of any kind, express or implied,
            regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any
            information on the Service.
          </p>

          <h2>Data Accuracy</h2>
          <p>
            While we strive to provide the most accurate and up-to-date information about countries worldwide,
            data such as population figures, currencies, and political situations can change frequently. We
            source our data from publicly available databases and international organizations, but we cannot
            guarantee that all information is current, complete, or error-free.
          </p>
          <ul>
            <li>Population figures may be based on estimates and the most recent census data available.</li>
            <li>Exchange rates and currency values fluctuate and may not reflect current rates.</li>
            <li>Political and territorial situations are subject to change.</li>
            <li>Travel information should be verified with official government sources before making travel plans.</li>
          </ul>

          <h2>No Professional Advice</h2>
          <p>
            The information on the Service is not intended to be a substitute for professional advice. We strongly
            recommend consulting with appropriate professionals (travel agents, government agencies, legal
            advisors, etc.) before making any decisions based on information found on the Service.
          </p>

          <h2>External Links</h2>
          <p>
            The Service may contain links to external websites that are not provided or maintained by or in
            any way affiliated with Random Country Generator. Please note that Random Country Generator does
            not warrant the accuracy, relevance, timeliness, or completeness of any information on these
            external websites.
          </p>

          <h2>Use at Your Own Risk</h2>
          <p>
            Your use of the Service and your reliance on any information on the Service is solely at your own
            risk. Random Country Generator shall not be liable for any decisions made or actions taken in
            reliance on any information provided on the Service.
          </p>

          <h2>Changes to This Disclaimer</h2>
          <p>
            We reserve the right to make changes to this Disclaimer at any time. Changes will be effective
            immediately upon posting the revised version on this page.
          </p>
        </div>
      </article>
    </main>
  );
}