import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Random Country Generator | Countries, Flags, Maps and Quizzes",
    template: "%s | Random Country Generator",
  },
  description: "Generate random countries, browse country facts, compare countries, study maps, and practice geography quizzes.",
  openGraph: {
    title: "Random Country Generator",
    description: "Generate random countries and learn country facts with flags, maps, quizzes, lists, and guides.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Country Generator",
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
