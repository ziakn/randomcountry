import BreadcrumbBar from "@/components/BreadcrumbBar";

export const metadata = {
  title: "Terms and Conditions - Random Country Generator",
  description: "Please read our terms and conditions before using the Random Country Generator website.",
  openGraph: {
    title: "Terms and Conditions",
    description: "Our terms and conditions for using the Random Country Generator service.",
  },
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />

      <article className="animate-fade-in-down">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Terms and Conditions
          </h1>
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-1 w-24 rounded-full mx-auto mb-6" />
        </header>

        <div className="prose lg:prose-lg max-w-none dark:prose-invert">
          <p>
            Please read these Terms and Conditions ("Terms") carefully before using the Random Country Generator
            website (the "Service") operated by Random Country Generator.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any
            part of the terms, you may not access the Service.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive
            property of Random Country Generator and its licensors. The Service is protected by copyright,
            trademark, and other laws of both the country and foreign countries.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with any product or service without
            the prior written consent of Random Country Generator.
          </p>

          <h2>3. Links to Other Websites</h2>
          <p>
            Our Service may contain links to third-party websites or services that are not owned or controlled
            by Random Country Generator. We have no control over, and assume no responsibility for, the content,
            privacy policies, or practices of any third-party websites or services. You further acknowledge and
            agree that Random Country Generator shall not be responsible or liable, directly or indirectly, for
            any damage or loss caused or alleged to be caused by or in connection with the use of or reliance
            on any such content, goods, or services available on or through any such websites or services.
          </p>

          <h2>4. Termination</h2>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or liability,
            for any reason whatsoever, including without limitation if you breach the Terms. All provisions
            of the Terms which by their nature should survive termination, including ownership provisions,
            warranty disclaimers, indemnity, and limitations of liability, shall survive termination.
          </p>

          <h2>5. Disclaimer</h2>
          <p>
            The information provided on our Service is for general informational purposes only. While we strive
            to keep the information up to date and correct, we make no representations or warranties of any kind,
            express or implied, about the completeness, accuracy, reliability, suitability, or availability
            with respect to the Service or the information contained on the Service. Your reliance on any such
            information is strictly at your own risk.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Random Country Generator, nor its directors, employees, partners, agents, suppliers,
            or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
            including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
            resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>7. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Random Country Generator and its licensee and
            licensors, and their employees, contractors, agents, officers, and directors, from and against all
            claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not
            limited to attorney's fees) arising from or in any way connected with your use of the Service.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws applicable in the jurisdiction
            where Random Country Generator is based, without regard to its conflict of law provisions.
          </p>

          <h2>9. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
            revision is material, we will try to provide at least 30 days' notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2>10. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at hello@randomcountry.com.
          </p>
        </div>
      </article>
    </main>
  );
}