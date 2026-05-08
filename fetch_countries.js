const https = require('https');
const fs = require('fs');

function fetchData(fields) {
  return new Promise((resolve, reject) => {
    https.get(`https://restcountries.com/v3.1/all?fields=${fields}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const basic = await fetchData('name,capital,population,region,subregion,cca2,cca3,currencies,languages,latlng');
  const extra = await fetchData('cca2,area,borders,timezones');

  // Create lookup for extra data
  const extraMap = {};
  extra.forEach(c => {
    if (c.cca2) extraMap[c.cca2.toLowerCase()] = c;
  });

  const formattedCountries = basic
    .filter((c) => c.name && c.name.common)
    .map((c) => {
      let currencyName = 'N/A';
      let currencySymbol = '';
      let currencyCode = 'N/A';
      if (c.currencies) {
        const keys = Object.keys(c.currencies);
        if (keys.length > 0) {
          currencyName = c.currencies[keys[0]].name;
          currencySymbol = c.currencies[keys[0]].symbol || '';
          currencyCode = keys[0];
        }
      }
      const currency = currencySymbol ? `${currencyName} (${currencySymbol})` : currencyName;

      let language = 'N/A';
      if (c.languages) {
        language = Object.values(c.languages).slice(0, 3).join(', ');
      }

      let capital = 'N/A';
      if (c.capital && c.capital.length > 0) {
        capital = c.capital[0];
      }

      let coordinates = [0, 0];
      if (c.latlng && c.latlng.length === 2) {
        coordinates = c.latlng;
      }

      const extraData = extraMap[c.cca2.toLowerCase()] || {};
      const timezones = extraData.timezones || [];
      const borders = extraData.borders || [];

      return {
        name: c.name.common,
        officialName: c.name.official || c.name.common,
        capital: capital,
        population: c.population.toLocaleString(),
        populationRaw: c.population,
        region: c.region || 'N/A',
        subregion: c.subregion || 'N/A',
        flagUrl: `https://flagcdn.com/w320/${c.cca2.toLowerCase()}.png`,
        flagIcon: `https://flagcdn.com/w40/${c.cca2.toLowerCase()}.png`,
        code: c.cca2.toLowerCase(),
        iso3: c.cca3 || '',
        currency: currency,
        currencyCode: currencyCode,
        language: language,
        coordinates: coordinates,
        area: extraData.area || 0,
        borders: borders,
        timezones: timezones,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  fs.writeFileSync('./src/data/countries.json', JSON.stringify(formattedCountries, null, 2));
  console.log(`Successfully wrote ${formattedCountries.length} countries to src/data/countries.json`);
}

main().catch(err => console.error('Error:', err));