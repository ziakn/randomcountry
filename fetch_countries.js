const https = require('https');
const fs = require('fs');

https.get('https://restcountries.com/v3.1/all?fields=name,capital,population,region,cca2,currencies,languages,latlng', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const rawCountries = JSON.parse(data);
    
    const formattedCountries = rawCountries
      .filter((c) => c.unMember || c.name.common) // Filter to valid entities
      .map((c) => {
        // Extract currency
        let currencyName = 'N/A';
        let currencySymbol = '';
        if (c.currencies) {
          const keys = Object.keys(c.currencies);
          if (keys.length > 0) {
            currencyName = c.currencies[keys[0]].name;
            currencySymbol = c.currencies[keys[0]].symbol || '';
          }
        }
        const currency = currencySymbol ? `${currencyName} (${currencySymbol})` : currencyName;

        // Extract language
        let language = 'N/A';
        if (c.languages) {
          language = Object.values(c.languages).slice(0, 2).join(', ');
        }

        // Extract capital
        let capital = 'N/A';
        if (c.capital && c.capital.length > 0) {
          capital = c.capital[0];
        }

        // Extract coordinates
        let coordinates = [0, 0];
        if (c.latlng && c.latlng.length === 2) {
          coordinates = c.latlng;
        }

        return {
          name: c.name.common,
          capital: capital,
          population: c.population.toLocaleString(),
          region: c.region || 'N/A',
          flagUrl: `https://flagcdn.com/w320/${c.cca2.toLowerCase()}.png`,
          code: c.cca2.toLowerCase(),
          currency: currency,
          language: language,
          coordinates: coordinates
        };
      })
      // Sort alphabetically
      .sort((a, b) => a.name.localeCompare(b.name));

    fs.writeFileSync('./src/data/countries.json', JSON.stringify(formattedCountries, null, 2));
    console.log(`Successfully wrote ${formattedCountries.length} countries to src/data/countries.json`);
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
