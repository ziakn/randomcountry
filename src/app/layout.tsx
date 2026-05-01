import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Random Country Generator | Discover the World Instantly",
  description: "Generate a random country instantly! Discover facts, flags, capitals, and populations with our premium, lightning-fast Random Country Generator.",
  metadataBase: new URL('https://randomcountry.ziamuhammad.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Random Country Generator | Discover the World Instantly",
    description: "Generate a random country instantly! Discover facts, flags, capitals, and populations.",
    url: 'https://randomcountry.ziamuhammad.com',
    siteName: 'Random Country Generator',
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Country Generator',
    description: 'Generate a random country instantly and learn about its geography, language, and culture.',
  },
  keywords: ["random country generator", "random country picker", "country generator", "randomizer", "random place generator", "random travel destination"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Random Country Generator',
    description: 'Generate a random country instantly! Discover facts, flags, capitals, and populations.',
    url: 'https://randomcountry.ziamuhammad.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://randomcountry.ziamuhammad.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
