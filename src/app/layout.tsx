import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { siteName, siteUrl, socialProfiles } from "@/lib/seo";
import "./globals.css";

// Unset in dev and previews, so local traffic no longer pollutes the production property.
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Countries, Flags, Maps and Quizzes`,
    template: `%s | ${siteName}`,
  },
  description: "Generate random countries, browse country facts, compare countries, study maps, and practice geography quizzes.",
  openGraph: {
    title: siteName,
    description: "Generate random countries and learn country facts with flags, maps, quizzes, lists, and guides.",
    type: "website",
    url: siteUrl,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: "A country generator and geography learning website.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Analytics measurementId={googleAnalyticsId} />
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}#website`,
              name: siteName,
              url: siteUrl,
              publisher: { "@id": `${siteUrl}#organization` },
            },
            // A bare name + url leaves the publisher unresolvable as an entity. sameAs is what
            // links it to a known profile; add real ones to socialProfiles as they exist.
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${siteUrl}#organization`,
              name: siteName,
              url: siteUrl,
              description: "A geography reference and random country generator for students, teachers, and quiz players.",
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/icon.svg`,
              },
              ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
            },
          ]}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
