import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

// Flips a country profile to indexable once its copy has been rewritten by hand.
// Usage: node scripts/mark-reviewed.mjs japan france
//        node scripts/mark-reviewed.mjs --unset japan
//        node scripts/mark-reviewed.mjs --list

const args = process.argv.slice(2);
const db = new DatabaseSync(join(process.cwd(), "data", "app.sqlite"));
db.exec("PRAGMA busy_timeout = 10000;");

if (args.includes("--list") || args.length === 0) {
  const rows = db.prepare("SELECT slug, reviewedAt FROM countries WHERE reviewed = 1 ORDER BY name").all();
  const { total } = db.prepare("SELECT COUNT(*) AS total FROM countries").get();
  console.log(`${rows.length} of ${total} country profiles are reviewed and indexable.`);
  for (const row of rows) console.log(`  ${row.slug}${row.reviewedAt ? `  (${row.reviewedAt})` : ""}`);
  process.exit(0);
}

const unset = args.includes("--unset");
const slugs = args.filter((arg) => !arg.startsWith("--"));
const update = db.prepare("UPDATE countries SET reviewed = ?, reviewedAt = ? WHERE slug = ?");
const today = new Date().toISOString().slice(0, 10);

for (const slug of slugs) {
  const result = update.run(unset ? 0 : 1, unset ? "" : today, slug);
  if (result.changes === 0) console.error(`No country found with slug "${slug}"`);
  else console.log(`${unset ? "Unmarked" : "Marked reviewed"}: ${slug}`);
}
