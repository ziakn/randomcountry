"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, MapPin, Navigation2 } from "lucide-react";

type GoogleMapProps = {
  countryName: string;
  coordinates: [number, number];
};

export default function GoogleMap({ countryName, coordinates }: GoogleMapProps) {
  const [lat] = coordinates;
  const [lng] = coordinates;
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Use OpenStreetMap static map as a free alternative
    const url = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=5&size=600x400&markers=${lat},${lng},red-pushpin`;
    setMapUrl(url);
    setLoaded(true);
  }, [lat, lng]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Location Map</span>
        </div>
        <span className="text-xs text-gray-500">{lat}°N, {lng}°E</span>
      </div>

      <div className="relative h-[300px] sm:h-[400px] bg-gray-100 dark:bg-gray-700">
        {mapUrl && loaded ? (
          <img
            src={mapUrl}
            alt={`Map showing location of ${countryName}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        )}

        {/* Pin overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full opacity-20 animate-ping" />
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=5/${lat}/${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <Navigation2 className="w-3 h-3" />
          View on OpenStreetMap
        </a>
      </div>
    </div>
  );
}