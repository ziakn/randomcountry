'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import CountryCard from '../components/CountryCard';
import GenerateButton from '../components/GenerateButton';
import GoogleMap from '../components/GoogleMap';
import { getRandomCountry, Country } from '../utils/getRandomCountry';

export default function Home() {
  const [country, setCountry] = useState<Country | null>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize with a random country on mount
  useEffect(() => {
    setCountry(getRandomCountry());
    setMounted(true);
  }, []);

  const handleGenerate = () => {
    // Generate a new country that is different from the current one
    let newCountry = getRandomCountry();
    while (country && newCountry.code === country.code) {
      newCountry = getRandomCountry();
    }
    setCountry(newCountry);
  };

  return (
    <main>
      <div className={styles.header}>
        <h1 className={styles.title}>Random Country Generator</h1>
        <p className={styles.subtitle}>
          Click the button below to instantly explore a random country from around the world.
        </p>
      </div>
      
      <div className={styles.content}>
        {mounted && country ? (
          <div className={styles.layoutGrid}>
            <CountryCard country={country} />
            <GoogleMap countryName={country.name} coordinates={country.coordinates} />
          </div>
        ) : (
          <div style={{ height: 400 }}></div>
        )}
        <GenerateButton onClick={handleGenerate} />
      </div>
    </main>
  );
}
