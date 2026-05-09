"use client";

import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import("@/components/GoogleMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />,
});

export default function CountryMapWrapper({ countryName, coordinates }: { countryName: string; coordinates: number[] }) {
  return <GoogleMap countryName={countryName} coordinates={[coordinates[0] || 0, coordinates[1] || 0]} />;
}