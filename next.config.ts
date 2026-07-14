import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  // The SQLite file is read at request time, so it must be traced into the serverless bundle.
  outputFileTracingIncludes: {
    "/**": ["./data/app.sqlite"],
  },
  // /lists/countries-starting-with-a duplicated /countries/a. Only the latter survives.
  async redirects() {
    return [
      {
        source: "/lists/countries-starting-with-:letter([a-z])",
        destination: "/countries/:letter",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
