# Content Brief: Writing Posts That Actually Get Indexed

Read this before writing. Every rule here is enforced by `npm run blog:lint`, and posts that
fail the hard rules will not be scheduled.

## The one thing to understand first

This site currently has **zero impressions in Google**. The cause is almost certainly that ~250
country pages were mass-produced from a template — same paragraph, different country name — and
Google classified them as scaled content. Those pages are now `noindex` until rewritten.

So: **volume is not the goal, and it never was.** Thirty posts that genuinely answer a question
will outperform 300 that restate the same facts in different word order. If a post you are writing
could be produced by find-and-replace on another post, it will hurt the site, not help it.

---

## The non-negotiables (linter errors — these block publishing)

| Rule | Why |
|---|---|
| **One unique `focusKeyword` per post** | Two posts chasing the same query split their own authority and neither ranks. This is enforced by a DB constraint. |
| **`focusKeyword` appears in the meta title** | It is the strongest single on-page relevance signal. |
| **Minimum 3 sections** | Below that it is a stub, not an article. |
| **Minimum ~600 words** | Thin pages get crawled and dropped. 600 is a floor, not a target — 1,200–1,800 is where useful guides usually land. |
| **A meta description exists** | Otherwise Google writes one for you, usually badly. |

## The strong recommendations (linter warnings)

- **Meta title: 50–60 characters.** Longer gets truncated in the SERP. Front-load the keyword.
- **Meta description: 140–160 characters.** It is not a ranking factor, but it *is* your ad copy — it decides click-through.
- **Focus keyword in the first 100 words**, in the slug, and in at least one H2.
- **Add an FAQ block.** Even though FAQ rich results are gone for sites like ours (see below), FAQs capture "people also ask" long-tail queries and give AI answer engines clean question/answer pairs to quote.
- **Set a `cluster`.** It is what links the post to its siblings. A post with no cluster is an orphan.

---

## Field-by-field spec

```jsonc
{
  "slug": "how-to-learn-country-capitals",      // keyword-shaped, lowercase, hyphens
  "title": "How to Learn Country Capitals",      // the on-page H1 — write for humans
  "metaTitle": "How to Learn Country Capitals: A 15-Minute Method",  // the SERP title, 50–60 chars
  "description": "...",                          // on-page standfirst
  "metaDescription": "...",                      // SERP snippet, 140–160 chars, include the keyword
  "focusKeyword": "how to learn country capitals", // ONE query. Must be unique across all posts.
  "secondaryKeywords": ["memorize capitals", "capital cities quiz"],
  "searchIntent": "informational",               // informational | commercial | navigational | transactional
  "schemaType": "HowTo",                         // BlogPosting | HowTo | FAQPage
  "cluster": "capitals",                         // topic cluster for internal linking
  "tags": ["capitals", "study-methods"],
  "sections": [{ "heading": "...", "body": "..." }],   // min 3
  "faq": [{ "question": "...", "answer": "..." }]
}
```

**On `schemaType`:** use `HowTo` *only* for genuinely procedural posts whose title starts with
"How to". When you do, each section becomes a `HowToStep` — so write the sections as actual
sequential steps, not loose themes. HowTo is one of the few rich-result types still available to
a site like this, so it is worth using correctly and never worth faking.

---

## What Google will and will not give you here

Set expectations honestly, because this is where most SEO effort gets wasted:

- **`FAQPage` rich results are gone** for sites like ours. Google restricted them in August 2023 to
  authoritative government and health sites. Keep the FAQ markup — it helps AI engines parse the page —
  but do not expect SERP stars.
- **`HowTo` rich results** are still live and worth targeting.
- **`BlogPosting`** does not itself produce a rich result, but it carries the author, dates, and
  keywords that AI answer engines (Gemini, Perplexity, ChatGPT search) use to decide whether to cite you.
- **Breadcrumbs** are the one rich result this site reliably earns.

---

## Evergreen keyword map

Evergreen = stable, year-round demand, no news hook. That is what this niche has, and it is a real
advantage — geography questions do not go stale. Build clusters, not scattered one-offs: a cluster
is one broad "pillar" post plus several specific posts that link up to it.

**Cluster: capitals**
Pillar: *countries and capitals list* — Spokes: how to learn country capitals · countries with two capitals · why do countries move their capital · capital cities quiz

**Cluster: flags**
Pillar: *country flags and meanings* — Spokes: flags with stars · flags that look similar · why do flags use red white and blue · flag quiz tips

**Cluster: classroom**
Pillar: *geography lesson ideas* — Spokes: random country game for classrooms · country research project template · geography warmup activities · how to pick a country for a school project

**Cluster: comparisons**
Pillar: *how to compare two countries* — Spokes: [country] vs [country] posts · biggest vs smallest countries · population vs area explained

**Cluster: counting-countries**
Pillar: *how many countries are there* — Spokes: UN members vs observer states · what makes a country a country · disputed territories explained · why sources disagree on the count

**Cluster: travel-basics**
Pillar: *how to choose a country to visit* — Spokes: landlocked countries · island countries · countries with the most coastline

A realistic first target is **30–40 posts across 4 clusters**, not 300 across none. Ship those,
see which index, then scale what worked.

---

## Workflow

```bash
npm run blog:lint                       # fix every ERROR before proceeding
npm run blog -- ready my-post-slug      # release from draft
npm run blog -- schedule --from=2026-07-20   # one per day
npm run blog -- status                  # what's live, what's queued
git add data/app.sqlite && git commit   # the DB is the CMS — commit it
```

Imported posts land as **drafts**. Nothing publishes until a human marks it ready. That is
deliberate: it is the gap between "3,000 files were generated" and "Google saw 3,000 pages."
