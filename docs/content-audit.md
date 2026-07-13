# The Lyon Den Content Audit

Audit date: July 13, 2026

This audit covers the current repository sources for TruthLoveMoney.com after the homepage curation pass. Public written content is code-driven in `src/App.jsx`; no Markdown, MDX, CMS export, public database seed, sitemap, or robots file is currently present. Supabase remains limited to the private Seed Garden portal.

## Content Sources Reviewed

- `src/App.jsx`: routes, Journal entries, curated episode/chapter data, collection pages, Poetry feature, homepage sections, archive entries.
- `public/assets/`: brand imagery, article artwork, editorial covers, and approved portrait/banner assets.
- `public/assets/covers/README.md`: cover workflow notes only.
- `content/episodes/episode-001-the-summer-that-never-left-me/`: HeyGen episode production files and scripts, not public article routes.
- `README.md`, `vercel.json`, `supabase/schema.sql`, and migrations.

## Normalized Taxonomy

Use this restrained taxonomy for public content:

- Stories From a Life
- Daily Chapters
- From the Bookshelf
- Field Notes
- Poetry and Reflection
- Episodes
- Legacy Lessons

## Current Written Content Inventory

| Title | Slug / Route | Content Type | Source | Status | Date | Featured Image / Cover | Canonical URL | Duplicate Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Fill Your Days With Stories That Make Your Heart Wiser | `/blog/fill-your-days-with-stories-that-make-your-heart-wiser` | Daily Chapters | `src/App.jsx` `blogPosts` | Published / cornerstone | July 11, 2026 | `/assets/lyon-den-storytelling-banner.png` | `/blog/fill-your-days-with-stories-that-make-your-heart-wiser` | No duplicate found |
| Books That Never Really Leave Us | `/blog/books-that-never-really-leave-us` | From the Bookshelf | `src/App.jsx` `blogPosts` | Published | July 11, 2026 | `coverId: books-never-leave`; social fallback `/assets/wildflowers-never-ask-permission.png` | `/blog/books-that-never-really-leave-us` | No duplicate found |
| Between Winter and Spring | `/blog/between-winter-and-spring` | Poetry and Reflection | `src/App.jsx` `blogPosts` | Published | July 11, 2026 | `/assets/between-winter-and-spring-artwork.png` | `/blog/between-winter-and-spring` | Canonical replacement for the earlier Persephone route |
| What My Mother Already Knew | `/blog/what-my-mother-already-knew` | Legacy Lessons | `src/App.jsx` `blogPosts` | Published | July 7, 2026 | `coverId: mother-already-knew` | `/blog/what-my-mother-already-knew` | Related to Covey article, not duplicate |
| A Teacher Never Retires | `/blog/a-teacher-never-retires` | Legacy Lessons | `src/App.jsx` `blogPosts` | Published | July 5, 2026 | `coverId: teacher-never-retires` | `/blog/a-teacher-never-retires` | Related to grammar and mother wisdom articles, not duplicate |
| The Notebook That Changed Everything | `/blog/the-notebook-that-changed-everything` | Poetry and Reflection | `src/App.jsx` `blogPosts` | Published | July 5, 2026 | `coverId: poetry-notebook` | `/blog/the-notebook-that-changed-everything` | Related to Poetry page, not duplicate |
| Clear Grammar, Clear Thoughts | `/blog/clear-grammar-clear-thoughts` | Field Notes | `src/App.jsx` `blogPosts` | Published | July 5, 2026 | `coverId: clear-grammar` | `/blog/clear-grammar-clear-thoughts` | Related to teaching articles, not duplicate |
| Stephen Covey Wrote What My Mother Lived | `/blog/stephen-covey-wrote-what-my-mother-lived` | From the Bookshelf | `src/App.jsx` `blogPosts` | Published | July 5, 2026 | `coverId: covey-mother` | `/blog/stephen-covey-wrote-what-my-mother-lived` | Related to `What My Mother Already Knew`; separate angle and details |
| Freedom Is Found in the Small Things | `/blog/freedom-is-found-in-the-small-things` | Daily Chapters | `src/App.jsx` `blogPosts` | Published | July 4, 2026 | `coverId: freedom-small-things` | `/blog/freedom-is-found-in-the-small-things` | No duplicate found |
| The Summer That Never Left Me | `/blog/the-summer-that-never-left-me` | Stories From a Life | `src/App.jsx` `blogPosts` | Published / featured | June 2026 | `coverId: summer-memory` | `/blog/the-summer-that-never-left-me` | Has related episode card with same title; keep both formats |
| Every Story Has Something to Teach Us | `/blog/every-story-has-something-to-teach-us` | Stories From a Life | `src/App.jsx` `blogPosts` | Published | June 2026 | `coverId: every-story-blog` | `/blog/every-story-has-something-to-teach-us` | Has related episode card with same title; keep both formats |

## Episode / Chapter Inventory

The public homepage now showcases only the strongest current chapter material. Curated episode cards in `src/App.jsx` link to the official YouTube channel unless individual video URLs are added later.

| Title | Route / URL | Content Type | Status | Cover | Duplicate Status |
| --- | --- | --- | --- | --- | --- |
| The Summer That Never Left Me | YouTube channel | Episode | Featured chapter | `/assets/summer-that-never-left-me.png` | Related written article remains canonical for reading |
| The Book That Changed My Life | YouTube channel | Episode / Bookshelf teaser | Curated fallback | `coverId: book-that-changed-me` | No duplicate article found |

## Poetry Feature Inventory

| Title | Route | Content Type | Source | Status | Canonical URL | Duplicate Status |
| --- | --- | --- | --- | --- | --- | --- |
| Poems That Stayed With Me | `/poetry` | Poetry and Reflection | `src/App.jsx` `poetryFeature` | Published | `/poetry` | Related to poetry notebook and summer memory pieces, not duplicate |

## Duplicate Review

### Group 1: Persephone / Winter / Hope

- `Between Winter and Spring` at `/blog/between-winter-and-spring`
- Previous route alias: `/daily-chapters/one-bloom-at-a-time`

Canonical version:

- `/blog/between-winter-and-spring`

Consolidation:

- The current article uses the requested `Between Winter and Spring` title, metadata, artwork, and Journal route.
- The old `/daily-chapters/one-bloom-at-a-time` path is preserved in `redirectPaths` so any prior preview link resolves to the canonical article instead of breaking.

SEO risk:

- Low. If the old route was publicly indexed, add a server-level 301 redirect later.

### Group 2: Stephen Covey / Mother Wisdom

- `Stephen Covey Wrote What My Mother Lived`
- `What My Mother Already Knew`

Canonical recommendation:

- Keep both. They share a values theme but use different framing, details, and search intent.

### Group 3: Same Title Across Article and Episode

- `The Summer That Never Left Me`
- `Every Story Has Something to Teach Us`

Canonical recommendation:

- Keep both formats where present. Journal routes are canonical for reading; YouTube links are canonical for watching.

## Consolidation Completed

- Curated the homepage around the required sequence: Hero, Latest Chapter, Latest Journal, Books That Changed Me, Wildflowers & Wisdom, Illustrated Pages, About Marguerite, Newsletter, Footer.
- Removed competing homepage content blocks from the public homepage flow.
- Preserved existing Journal/blog routes and added route aliases where older preview paths could otherwise break.
- Added the newest article artwork assets to `public/assets/` with production-ready filenames.
- Published three cornerstone Journal entries with SEO, Open Graph, Twitter, social caption, category, tag, excerpt, and related-reading data in `src/App.jsx`.

No previously verified public article was deleted.

## Unresolved Content Questions

- Confirm whether `/daily-chapters/one-bloom-at-a-time` was ever deployed or shared externally. If yes, add a server-level 301 redirect.
- Confirm whether individual YouTube video URLs should replace channel-level episode links.
- Add a sitemap and robots file if production SEO needs explicit crawl controls.
- Replace the fallback storytelling banner if a more exact “Fill Your Days With Stories That Make Your Heart Wiser” source asset is supplied.
