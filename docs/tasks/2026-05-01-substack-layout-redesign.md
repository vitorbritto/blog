# Tasks: Substack-Style 3-Column Layout Redesign

**Spec:** `docs/specs/2026-05-01-substack-layout-redesign.md`  
**Date:** 2026-05-01  
**Status:** Approved

---

## Task List

### T1 — Lift filter state to `HomeContent` and add tracks data

**File:** `app/page.tsx`, `components/HomeContent.tsx`

- [ ] In `app/page.tsx`, call `getAllTracks()` in parallel with existing calls; pass `tracks` to `HomeContent`
- [ ] In `HomeContent.tsx`, add `tracks: Track[]` to props
- [ ] Move `selectedCategories`, `selectedTags` state from `ArticlesList` into `HomeContent`
- [ ] Add `searchQuery: string` state to `HomeContent`
- [ ] Compute `filteredArticles` via `useMemo` from three filters (categories, tags, search)
- [ ] Apply AND filter logic with exclusivity rule (selecting category clears tags; selecting tag clears categories)

**Dependencies:** none — must be done first

---

### T2 — Refactor `ArticleFilters` into `LeftSidebar`

**File:** `components/ArticleFilters.tsx` → `components/LeftSidebar.tsx`

- [ ] Rename file to `LeftSidebar.tsx` and component to `LeftSidebar`
- [ ] Remove internal `selectedCategories` and `selectedTags` state — accept them as props
- [ ] Accept callbacks: `onToggleCategory`, `onToggleTag`, `onClearAllCategories`, `onClearAllTags`
- [ ] Remove `onFilterChange` callback (state is now owned by `HomeContent`)
- [ ] Keep all existing visual markup (desktop 50/50 split, mobile collapse buttons) unchanged

**Dependencies:** T1 (state now lives in `HomeContent`)

---

### T3 — Refactor `ArticlesList` into `ArticleFeed`

**File:** `components/ArticlesList.tsx` → `components/ArticleFeed.tsx`

- [ ] Rename file to `ArticleFeed.tsx` and component to `ArticleFeed`
- [ ] Remove internal state and `ArticleFilters` import
- [ ] Accept only `articles: Article[]` as prop (filtered list passed from `HomeContent`)
- [ ] Render `MinimalArticleCard[]` or the "no articles" empty state

**Dependencies:** T1

---

### T4 — Improve `MinimalArticleCard`

**File:** `components/MinimalArticleCard.tsx`

- [ ] Keep `getContentPreview` as-is (strip markdown from full content)
- [ ] Add cover image thumbnail: if `article.coverImage` is set, render `<Image>` (80×80px, `object-cover`, right-aligned) using `src={article.coverImage}`
- [ ] Add track badge: if `article.tracks.length > 0`, render `◈ {trackName}` pill above the title row (zinc-700 bg, zinc-400 text, small)
- [ ] Add featured marker: if `article.featured`, add `★ Featured` inline with the metadata row (emerald-400 text)
- [ ] Adjust card layout to accommodate thumbnail — use `flex` row with text on left and thumbnail on right

**Dependencies:** none — can run in parallel with T1–T3

---

### T5 — Create `RightSidebar`

**File:** `components/RightSidebar.tsx` (new file)

- [ ] Create component accepting props: `tracks: Track[]`, `articles: Article[]`, `searchQuery: string`, `onSearchChange: (query: string) => void`
- [ ] Render search input with debounce (300ms via `useEffect` + `setTimeout`)
- [ ] Show result count below search input: filtered article count by current query
- [ ] Render `TRACKS` section with list of tracks; each row shows `track.name · {track.articles.length} articles` — display only, no click handlers (placeholder for future feature)
- [ ] Sticky at `top-24`, `lg:self-start`
- [ ] i18n: use `useTranslation()` for search placeholder and article count label (add keys if missing)

**Dependencies:** T1 (needs callbacks)

---

### T6 — Wire 3-column layout in `HomeContent`

**File:** `components/HomeContent.tsx`

- [ ] Replace current `<ArticlesList>` rendering with 3-column grid:
  ```
  grid-cols-1 lg:grid-cols-[240px_1fr_260px]
  ```
- [ ] Render `<LeftSidebar>` in first column with state + callbacks from T1
- [ ] Render `<ArticleFeed articles={filteredArticles}>` in second column
- [ ] Render `<RightSidebar>` in third column with tracks, searchQuery, onSearchChange callback
- [ ] Mobile: left sidebar uses existing mobile collapse behavior; right sidebar hidden on `< lg` (add `hidden lg:block` wrapper)
- [ ] Tablet (768–1023px): right sidebar hidden, left sidebar visible (add `hidden xl:block` or adjust breakpoint as needed)

**Dependencies:** T2, T3, T5

---

### T7 — i18n keys

**Files:** `lib/translations/en.json`, `lib/translations/pt-BR.json`

- [ ] Add `search.placeholder`: `"Search articles..."` / `"Buscar artigos..."`
- [ ] Add `search.resultCount`: `"{count} articles"` / `"{count} artigos"`
- [ ] Add `filters.tracks`: `"Tracks"` / `"Trilhas"` (section label in RightSidebar)

**Dependencies:** none — can run in parallel

---

### T8 — Smoke test & visual review

- [ ] Run `pnpm dev` and verify 3-column layout renders correctly at desktop width
- [ ] Verify category filter narrows article list correctly
- [ ] Verify tag filter narrows article list correctly
- [ ] Verify exclusivity: selecting category clears tag state (and vice-versa)
- [ ] Verify search filters articles in real-time (debounced)
- [ ] Verify mobile layout: right sidebar hidden, left sidebar collapses to chip buttons
- [ ] Verify no console errors

**Dependencies:** T6

---

## Execution Order

```
T1 → T2 → T6
T1 → T3 → T6
T1 → T5 → T6
T4 (parallel)
T7 (parallel)
T8 (after T6)
```

Parallel safe: T4 and T7 can start immediately without blocking anything.
