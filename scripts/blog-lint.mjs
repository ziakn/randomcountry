import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

// SEO linter. Run before scheduling anything:  npm run blog:lint
// Errors block publication. Warnings are judgment calls for the editor.
//
// Rule sources: SERP title truncation (~60 chars), snippet truncation (~160 chars),
// Google's helpful-content guidance on depth, and keyword cannibalization.

const db = new DatabaseSync(join(process.cwd(), "data", "app.sqlite"));
const posts = db.prepare("SELECT * FROM posts ORDER BY publishAt, slug").all();

const MIN_WORDS = 600;
const MIN_SECTIONS = 3;

const norm = (value) => String(value ?? "").toLowerCase();
const words = (post) => {
  const sections = JSON.parse(post.sections || "[]");
  const faq = JSON.parse(post.faq || "[]");
  const text = [
    post.description,
    ...sections.flatMap((s) => [s.heading, s.body]),
    ...faq.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
};

// Cannibalization map: two posts must never chase the same query.
const keywordOwners = new Map();
for (const post of posts) {
  const key = norm(post.focusKeyword);
  if (!key) continue;
  if (!keywordOwners.has(key)) keywordOwners.set(key, []);
  keywordOwners.get(key).push(post.slug);
}

let errorCount = 0;
let warnCount = 0;

for (const post of posts) {
  const errors = [];
  const warnings = [];

  const metaTitle = post.metaTitle || post.title;
  const metaDescription = post.metaDescription || post.description;
  const keyword = norm(post.focusKeyword);
  const sections = JSON.parse(post.sections || "[]");
  const faq = JSON.parse(post.faq || "[]");
  const count = words(post);

  // --- Errors: these block publication ---
  if (!keyword) errors.push("No focusKeyword. Every post must target exactly one query.");
  if (keyword && keywordOwners.get(keyword).length > 1) {
    errors.push(`Keyword cannibalization: "${post.focusKeyword}" is also targeted by ${keywordOwners.get(keyword).filter((s) => s !== post.slug).join(", ")}`);
  }
  if (sections.length < MIN_SECTIONS) errors.push(`Only ${sections.length} section(s); minimum is ${MIN_SECTIONS}.`);
  if (count < MIN_WORDS) errors.push(`Only ~${count} words; minimum is ${MIN_WORDS}. Thin posts do not get indexed.`);
  if (keyword && !norm(metaTitle).includes(keyword)) errors.push(`Focus keyword "${post.focusKeyword}" is missing from the meta title.`);
  if (keyword && !norm(post.slug.replace(/-/g, " ")).includes(keyword)) {
    warnings.push(`Focus keyword is not in the slug. Prefer /blog/${post.focusKeyword.replace(/\s+/g, "-")}.`);
  }
  if (!metaDescription) errors.push("No meta description.");

  // --- Warnings: editor's call ---
  if (metaTitle.length > 60) warnings.push(`Meta title is ${metaTitle.length} chars; Google truncates around 60.`);
  if (metaTitle.length < 30) warnings.push(`Meta title is only ${metaTitle.length} chars; you are wasting SERP real estate.`);
  if (metaDescription.length > 160) warnings.push(`Meta description is ${metaDescription.length} chars; truncates around 160.`);
  if (metaDescription.length < 110) warnings.push(`Meta description is only ${metaDescription.length} chars; aim for 140–160.`);
  if (keyword && !norm(metaDescription).includes(keyword)) warnings.push("Focus keyword is not in the meta description.");
  if (keyword && sections.length && !norm(sections[0].body).includes(keyword)) {
    warnings.push("Focus keyword does not appear in the opening section. Put it in the first 100 words.");
  }
  if (!faq.length) warnings.push("No FAQ block. FAQs capture long-tail 'people also ask' queries even without rich results.");
  if (!post.cluster) warnings.push("No cluster set; the post will not be internally linked from siblings.");
  if (post.schemaType === "HowTo" && !/^how (to|do|does)/i.test(post.title)) {
    warnings.push('schemaType is HowTo but the title is not a "how to" phrasing. Google may flag the mismatch.');
  }

  if (errors.length || warnings.length) {
    console.log(`\n${post.slug}  [${post.status}, ${post.publishAt}]`);
    for (const message of errors) console.log(`  ERROR  ${message}`);
    for (const message of warnings) console.log(`  warn   ${message}`);
  }
  errorCount += errors.length;
  warnCount += warnings.length;
}

console.log(`\n${posts.length} post(s) linted: ${errorCount} error(s), ${warnCount} warning(s).`);
if (errorCount > 0) {
  console.log("Posts with errors will not be scheduled. Fix them and re-run.");
  process.exitCode = 1;
}
