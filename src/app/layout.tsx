import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Random Country Generator | Discover the World",
  description: "Generate a random country instantly! Discover facts, flags, capitals, and populations with our premium Random Country Generator.",
  openGraph: {
    title: "Random Country Generator | Discover the World",
    description: "Generate a random country instantly! Discover facts, flags, capitals, and populations.",
    type: "website",
    locale: "en_US",
  },
  keywords: ["random country generator", "random country picker", "country generator", "randomizer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
