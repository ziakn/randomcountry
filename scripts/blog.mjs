import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

// Blog queue management.
//
//   node scripts/blog.mjs status                 queue summary
//   node scripts/blog.mjs list [--all]           live posts (--all includes the queue)
//   node scripts/blog.mjs import <file.json>     add/update posts from a JSON array
//   node scripts/blog.mjs schedule [--from=YYYY-MM-DD] [--every=1]
//                                                assign publish dates, one post per N days
//   node scripts/blog.mjs draft <slug>...        hold a post back (never publishes)
//   node scripts/blog.mjs ready <slug>...        release a draft into the schedule
//
// A post goes live only when publishAt has arrived AND status is 'scheduled' AND it has
// at least one section. Empty stubs cannot publish themselves.

const db = new DatabaseSync(join(process.cwd(), "data", "app.sqlite"));
db.exec("PRAGMA busy_timeout = 10000;");
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    publishAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'scheduled',
    author TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '[]',
    sections TEXT NOT NULL DEFAULT '[]',
    faq TEXT NOT NULL DEFAULT '[]'
  );
  CREATE INDEX IF NOT EXISTS posts_publish_idx ON posts (status, publishAt);
`);

const [command = "status", ...args] = process.argv.slice(2);
const flag = (name, fallback) => {
  const hit = args.find((arg) => arg.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const today = new Date().toISOString().slice(0, 10);
const addDays = (date, days) => {
  const next = new Date(`${date}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + days);
  return next.toISOString().slice(0, 10);
};

function status() {
  const row = db
    .prepare(
      // Mirrors the app's gate exactly: scheduled + date arrived + has a body.
      `SELECT COUNT(*) AS total,
        SUM(CASE WHEN status='scheduled' AND publishAt <= ? AND json_array_length(sections) > 0 THEN 1 ELSE 0 END) AS live,
        SUM(CASE WHEN status='scheduled' AND publishAt > ? THEN 1 ELSE 0 END) AS queued,
        SUM(CASE WHEN status='draft' THEN 1 ELSE 0 END) AS drafts,
        MAX(publishAt) AS lastDate
      FROM posts`
    )
    .get(today, today);
  const empty = db.prepare("SELECT COUNT(*) AS n FROM posts WHERE json_array_length(sections) = 0").get();

  console.log(`Posts:      ${row.total ?? 0}`);
  console.log(`Live today: ${row.live ?? 0}`);
  console.log(`Queued:     ${row.queued ?? 0}${row.lastDate ? ` (last publishes ${row.lastDate})` : ""}`);
  console.log(`Drafts:     ${row.drafts ?? 0}`);
  if (empty.n > 0) console.log(`\n${empty.n} post(s) have no body and will NOT publish until content is added.`);
}

function list() {
  const all = args.includes("--all");
  const rows = db
    .prepare(
      all
        ? "SELECT slug, title, publishAt, status FROM posts ORDER BY publishAt, slug"
        : "SELECT slug, title, publishAt, status FROM posts WHERE status='scheduled' AND publishAt <= ? ORDER BY publishAt DESC"
    )
    .all(...(all ? [] : [today]));

  for (const row of rows) {
    const state = row.status === "draft" ? "draft" : row.publishAt > today ? "queued" : "live";
    console.log(`${row.publishAt}  ${state.padEnd(7)}  ${row.slug}`);
  }
  console.log(`\n${rows.length} post(s).`);
}

function importPosts(file) {
  if (!file) throw new Error("Usage: node scripts/blog.mjs import <file.json>");
  const posts = JSON.parse(readFileSync(file, "utf8"));
  if (!Array.isArray(posts)) throw new Error("Expected a JSON array of posts.");

  const upsert = db.prepare(`
    INSERT INTO posts (
      slug, title, description, metaTitle, metaDescription, focusKeyword, secondaryKeywords,
      searchIntent, schemaType, cluster, publishAt, updatedAt, status, author, tags, sections, faq
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      description = excluded.description,
      metaTitle = excluded.metaTitle,
      metaDescription = excluded.metaDescription,
      focusKeyword = excluded.focusKeyword,
      secondaryKeywords = excluded.secondaryKeywords,
      searchIntent = excluded.searchIntent,
      schemaType = excluded.schemaType,
      cluster = excluded.cluster,
      updatedAt = excluded.updatedAt,
      author = excluded.author,
      tags = excluded.tags,
      sections = excluded.sections,
      faq = excluded.faq
  `);

  db.exec("BEGIN IMMEDIATE TRANSACTION;");
  try {
    for (const post of posts) {
      if (!post.slug || !post.title) throw new Error(`Post is missing slug or title: ${JSON.stringify(post).slice(0, 80)}`);
      upsert.run(
        post.slug,
        post.title,
        post.description ?? "",
        post.metaTitle ?? "",
        post.metaDescription ?? "",
        post.focusKeyword ?? "",
        JSON.stringify(post.secondaryKeywords ?? []),
        post.searchIntent ?? "informational",
        post.schemaType ?? "BlogPosting",
        post.cluster ?? "",
        post.publishAt ?? "2099-12-31", // unscheduled until `schedule` runs
        post.updatedAt ?? today,
        post.status ?? "draft", // imported posts start held back, on purpose
        post.author ?? "",
        JSON.stringify(post.tags ?? []),
        JSON.stringify(post.sections ?? []),
        JSON.stringify(post.faq ?? [])
      );
    }
    db.exec("COMMIT;");
  } catch (error) {
    db.exec("ROLLBACK;");
    if (String(error.message).includes("UNIQUE constraint failed: posts.focusKeyword")) {
      throw new Error("Two posts claim the same focusKeyword. Every post must target a unique query. Run `npm run blog:lint` to find the clash.");
    }
    throw error;
  }
  console.log(`Imported ${posts.length} post(s) as drafts.`);
  console.log("Next: npm run blog:lint  →  fix errors  →  blog ready <slug>  →  blog schedule");
}

function schedule() {
  const from = flag("from", addDays(today, 1));
  const every = Math.max(1, Number(flag("every", "1")));

  // Only posts that are ready, have a body, and carry a focus keyword enter the drip.
  // Anything failing the hard SEO rules is held back rather than silently queued.
  const candidates = db
    .prepare("SELECT * FROM posts WHERE status = 'scheduled' AND publishAt > ? ORDER BY publishAt, slug")
    .all(today);

  const pending = [];
  const blocked = [];
  for (const post of candidates) {
    const sections = JSON.parse(post.sections || "[]");
    if (!post.focusKeyword) blocked.push(`${post.slug}: no focusKeyword`);
    else if (sections.length < 3) blocked.push(`${post.slug}: only ${sections.length} section(s)`);
    else pending.push(post);
  }

  if (blocked.length) {
    console.log(`Held back ${blocked.length} post(s) that fail the SEO gate:`);
    for (const reason of blocked) console.log(`  ${reason}`);
    console.log("Run `npm run blog:lint` for the full report.\n");
  }

  const update = db.prepare("UPDATE posts SET publishAt = ? WHERE slug = ?");
  db.exec("BEGIN IMMEDIATE TRANSACTION;");
  try {
    pending.forEach((post, index) => update.run(addDays(from, index * every), post.slug));
    db.exec("COMMIT;");
  } catch (error) {
    db.exec("ROLLBACK;");
    throw error;
  }

  const last = pending.length ? addDays(from, (pending.length - 1) * every) : from;
  console.log(`Scheduled ${pending.length} post(s), one every ${every} day(s), from ${from} through ${last}.`);
}

function setStatus(next) {
  const slugs = args.filter((arg) => !arg.startsWith("--"));
  if (!slugs.length) throw new Error(`Usage: node scripts/blog.mjs ${next === "draft" ? "draft" : "ready"} <slug>...`);
  const update = db.prepare("UPDATE posts SET status = ? WHERE slug = ?");
  for (const slug of slugs) {
    const result = update.run(next, slug);
    console.log(result.changes ? `${slug} -> ${next}` : `No post found with slug "${slug}"`);
  }
}

const commands = {
  status,
  list,
  import: () => importPosts(args.find((arg) => !arg.startsWith("--"))),
  schedule,
  draft: () => setStatus("draft"),
  ready: () => setStatus("scheduled"),
};

const run = commands[command];
if (!run) {
  console.error(`Unknown command "${command}". Try: ${Object.keys(commands).join(", ")}`);
  process.exit(1);
}
run();
