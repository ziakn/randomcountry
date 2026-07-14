import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const dbPath = join(process.cwd(), "data", "app.sqlite");
const db = new DatabaseSync(dbPath);

db.exec("PRAGMA busy_timeout = 10000;");

// Reviewed profiles hold hand-written copy. Regenerating them would overwrite it.
const countries = db
  .prepare(
    `SELECT slug, name, officialName, capital, continent, region, language, timeZone,
      latitude, longitude, neighbors, area, unMember
    FROM countries
    WHERE reviewed = 0
    ORDER BY name`
  )
  .all();

const update = db.prepare(`
  UPDATE countries
  SET history = ?, geography = ?, culture = ?, food = ?, famousPlaces = ?, travelFacts = ?, funFacts = ?
  WHERE slug = ? AND reviewed = 0
`);

db.exec("BEGIN IMMEDIATE TRANSACTION;");

try {
  for (const country of countries) {
    const neighbors = JSON.parse(country.neighbors);
    const neighborText = neighbors.length ? neighbors.join(", ") : "no listed land-border neighbors";
    const history = `${country.name} is recorded with the official name ${country.officialName}. This profile uses country database fields for quick reference and links the country to its region, capital, identifiers, and basic geography. Detailed historical timelines should be checked with dedicated historical sources when used for formal research.`;
    const geography = `${country.name} is in ${country.region}, ${country.continent}. Its listed coordinates are ${country.latitude}, ${country.longitude}; it has ${neighborText}.`;
    const culture = `${country.name} uses ${country.language} in this dataset. Culture, traditions, education, sport, arts, and daily life can vary by region, language community, and local history, so deeper cultural notes should be checked with reliable local sources.`;
    const food = `Food culture in ${country.name} varies by region and community. This profile avoids naming specific dishes unless they have been reviewed from a dedicated source, making it a safe starting point for classroom or travel research.`;
    const famousPlaces = [
      country.capital,
      `${country.region} cultural and historic sites`,
      `${country.continent} map and regional landmarks`,
    ];
    const travelFacts = [
      `Capital or main administrative city: ${country.capital}`,
      `Time zone data: ${country.timeZone}`,
      "Check official sources for entry, safety, and transport information.",
    ];
    const funFacts = [
      `${country.name} is grouped under ${country.continent}.`,
      `${country.name} has a listed area of ${Math.round(country.area).toLocaleString()} km².`,
      country.unMember ? `${country.name} is listed as a UN member.` : `${country.name} is not listed as a UN member in the source data.`,
    ];

    update.run(
      history,
      geography,
      culture,
      food,
      JSON.stringify(famousPlaces),
      JSON.stringify(travelFacts),
      JSON.stringify(funFacts),
      country.slug
    );
  }

  db.exec("COMMIT;");
  console.log(`Refreshed country copy for ${countries.length} records.`);
} catch (error) {
  db.exec("ROLLBACK;");
  throw error;
}
