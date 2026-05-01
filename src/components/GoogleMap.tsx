import React from 'react';
import styles from './GoogleMap.module.css';

type GoogleMapProps = {
  countryName: string;
  coordinates: [number, number];
};

export default function GoogleMap({ countryName, coordinates }: GoogleMapProps) {
  // Using the country name generally provides a better bounding box for Google Maps embeds than just lat/long points
  const query = encodeURIComponent(countryName);
  const mapUrl = `https://maps.google.com/maps?q=${query}&t=&z=4&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={styles.container}>
      <iframe
        className={styles.iframe}
        src={mapUrl}
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        title={`Map of ${countryName}`}
        loading="lazy"
      ></iframe>
    </div>
  );
}
