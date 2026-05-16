import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const googleAnalyticsId = "G-1JFWECSRRQ";

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
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              url: siteUrl,
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
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
