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
          <div style={{ height: 450 }}></div>
        )}
        <GenerateButton onClick={handleGenerate} />
      </div>

      <section className={styles.seoSection}>
        <div className={styles.seoContainer}>
          <h2>What is the Random Country Generator?</h2>
          <p>
            The <strong>Random Country Generator</strong> is a free, lightning-fast tool designed to help you discover new places around the globe. Whether you're a geography student looking to test your knowledge, a traveler seeking inspiration for your next trip, or just someone curious about the world, our tool provides instant information at the click of a button.
          </p>
          
          <h3>How does it work?</h3>
          <p>
            Simply click the "Generate Random Country" button above. Our algorithm will instantly select one of the 250 recognized countries or territories from our comprehensive, up-to-date database. You will immediately see the country's flag, capital city, population, currency, primary languages, and an interactive map showing its exact location.
          </p>

          <h3>Why use a Random Country Picker?</h3>
          <ul className={styles.seoList}>
            <li><strong>Education & Trivia:</strong> Perfect for teachers and students studying world geography.</li>
            <li><strong>Travel Inspiration:</strong> Can't decide where to go next? Let chance decide your next vacation destination.</li>
            <li><strong>Creative Writing:</strong> Authors and world-builders use our tool to find inspiration for settings, names, and cultures.</li>
            <li><strong>Games & Challenges:</strong> Use it as a starting point for GeoGuessr challenges or geography bees.</li>
          </ul>

          <h2>Frequently Asked Questions (FAQ)</h2>
          <div className={styles.faq}>
            <h4>How many countries are in the generator?</h4>
            <p>Our database includes 250 countries and dependent territories, sourced directly from the latest international data standards (ISO 3166).</p>

            <h4>Is the data accurate and up-to-date?</h4>
            <p>Yes! We regularly update our dataset to ensure populations, capitals, and currencies reflect the most current global information available.</p>

            <h4>Is this tool free to use?</h4>
            <p>Absolutely. The Random Country Generator is 100% free with no limits on how many times you can spin the globe and discover new places.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
