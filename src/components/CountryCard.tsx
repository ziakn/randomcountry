import React from 'react';
import styles from './CountryCard.module.css';
import { Country } from '../utils/getRandomCountry';

type CountryCardProps = {
  country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
  // Use a key to force re-animation when country changes
  return (
    <div key={country.code} className={`${styles.card} animate-fade-in`}>
      <div className={styles.flagContainer}>
        {/* Using a regular img tag since Next.js Image component requires external domain config */}
        <img 
          src={country.flagUrl} 
          alt={`Flag of ${country.name}`} 
          className={styles.flag}
          loading="lazy"
        />
      </div>
      
      <h2 className={styles.name}>{country.name}</h2>
      <div className={styles.region}>{country.region}</div>
      
      <div className={styles.grid}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Capital</span>
          <span className={styles.statValue}>{country.capital}</span>
        </div>
        
        <div className={styles.stat}>
          <span className={styles.statLabel}>Population</span>
          <span className={styles.statValue}>{country.population}</span>
        </div>
        
        <div className={styles.stat}>
          <span className={styles.statLabel}>Currency</span>
          <span className={styles.statValue}>{country.currency}</span>
        </div>
        
        <div className={styles.stat}>
          <span className={styles.statLabel}>Language</span>
          <span className={styles.statValue}>{country.language}</span>
        </div>
      </div>
    </div>
  );
}
