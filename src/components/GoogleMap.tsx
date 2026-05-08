import React from 'react';

type GoogleMapProps = {
  countryName: string;
  coordinates: [number, number];
};

export default function GoogleMap({ countryName, coordinates }: GoogleMapProps) {
  const [lat, lng] = coordinates;
  
  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-blue-600">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" fill="currentColor" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{countryName}</h3>
          <p className="text-gray-600">Lat: {lat}, Lng: {lng}</p>
        </div>
      </div>
    </div>
  );
}