import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { graph } from "@/lib/schema";
import { siteName, siteUrl } from "@/lib/seo";
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
  // Lets Google show large image previews and untruncated snippets. Per-page noindex
  // (unreviewed country profiles) still overrides this.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteName,
    description: "Generate random countries and learn country facts with flags, maps, quizzes, lists, and guides.",
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: "A country generator and geography learning website.",
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${siteName} blog` }],
    },
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
        {/* One connected @graph: Organization and WebSite reference each other by @id, and
            page templates append their own nodes to the same graph. */}
        <JsonLd data={graph()} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
