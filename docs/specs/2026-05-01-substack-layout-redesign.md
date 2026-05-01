# Spec: Substack-Style 3-Column Layout Redesign

**Date:** 2026-05-01  
**Status:** Approved  
**Scope:** Homepage article list layout only (`/`)

---

## Overview

Redesign the homepage from a 2-column layout (left sidebar + content) to a 3-column layout inspired by Substack: left sidebar for filtering, center column for the article feed, and right sidebar for discovery (search + tracks/series).

---

## Current State

```
[LeftSidebar 280px | ArticleList 1fr]
```

- `HomeContent` wraps `ArticlesList`
- `ArticlesList` holds filter state and renders `ArticleFilters` + `MinimalArticleCard[]`
- `ArticleFilters` handles categories and tags (mutually exclusive)
- No search, no tracks display, no right sidebar

---

## Target Layout

```
[LeftSidebar 240px | ArticleFeed 1fr | RightSidebar 260px]
```

Responsive breakpoints:
- **Mobile (< 768px):** single column; left filters collapse to chip buttons (existing behavior); right sidebar hidden
- **Tablet (768–1023px):** 2 columns — left sidebar + center; right sidebar hidden
- **Desktop (≥ 1024px):** full 3-column layout

---

## Left Sidebar

**Content:** Topics (categories) + Tags — same filter logic as today.

**Changes from current:**
- Width reduced from 280px to 240px
- Section labels (`TOPICS`, `TAGS`) keep uppercase tracking style
- Filter buttons keep current active state (`bg-zinc-100 text-zinc-900` selected, `bg-zinc-800/50` default)
- Sticky at `top-24`, scrollable list within the sidebar (`calc(100vh - 210px)`)
- No behavior changes — only visual adjustments from narrowing

**State:** `selectedCategories` and `selectedTags` lifted to `HomeContent` (see State section below).

---

## Center Column — Article Feed

**Content:** Filtered article list, coordinated with search and sidebar filters.

### Card improvements

Each card renders:

| Element | Current | Target |
|---|---|---|
| Cover image | Not shown | Small thumbnail (80×80px), right-aligned, if `coverImage` exists |
| Date · readtime · category | Left metadata row | Kept; category links to filter |
| Title | `text-xl font-semibold` | `text-xl font-semibold` — no change |
| Excerpt | `line-clamp-2` from content | Keep `getContentPreview` (strip markdown from full content) — no change |
| Tags | Up to 3 badges | Keep as-is |
| Track badge | Not shown | If `article.tracks.length > 0`, show first track as a pill (e.g., `◈ Front-end Track`) above title |
| Featured marker | Not shown | If `article.featured`, add a small `★ Featured` label inline with metadata |

**Card separator:** Keep `border-b border-zinc-800/50` between cards. No card background.

---

## Right Sidebar

**Content:** Search input + Tracks/Series list.

### Search

- Text input, placeholder: `"Search articles..."` / `"Buscar artigos..."` (i18n)
- Filters articles by title + excerpt (case-insensitive)
- Search query is independent of sidebar filters: both apply simultaneously (AND logic)
- Debounced: 300ms after keystroke before filtering
- Styled: `bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 py-2 text-sm`
- Shows result count below the input: `"12 articles"` / `"12 artigos"`

### Tracks / Series — Mocked (layout placeholder)

> Full track filtering will be a separate feature. This iteration renders the UI structure only — no click/filter behavior.

- Section label: `TRACKS` uppercase, same style as left sidebar labels
- Lists all tracks from `content/tracks/*.json` (data is real, behavior is not wired)
- Each row: track name + article count — Example: `Front-end  ·  21 articles`
- No active state, no click handlers
- Sticky at `top-24`

---

## State Architecture

**Current:** filter state (`selectedCategories`, `selectedTags`) lives inside `ArticlesList`.

**Target:** lift filter state to `HomeContent` so that left sidebar, right sidebar (search), and center column all read from and write to the same state.

```
HomeContent (state owner)
├── selectedCategories: string[]
├── selectedTags: string[]
├── searchQuery: string
├── filteredArticles: Article[]   ← derived via useMemo
│
├── LeftSidebar (reads categories/tags state, writes via callbacks)
├── ArticleFeed (reads filteredArticles)
└── RightSidebar (reads searchQuery, writes via onSearchChange; tracks are display-only)
```

Filter logic (applied in order, all AND):
1. If `selectedCategories` not empty → keep articles matching any selected category
2. If `selectedTags` not empty → keep articles matching any selected tag
3. If `searchQuery` not empty → keep articles where title or excerpt contains query

Exclusivity rule: selecting a category clears tags; selecting a tag clears categories. (Track filtering is out of scope for this iteration.)

---

## Data Changes

`app/page.tsx` needs to add `getAllTracks()` call and pass `tracks` to `HomeContent` (used for display in `RightSidebar`).

`HomeContent` props:
```typescript
interface HomeContentProps {
  articles: Article[]
  categories: Category[]
  tags: string[]
  tracks: Track[]          // new — passed through to RightSidebar for display only
}
```

No changes to `lib/content.ts` or data types — `getAllTracks()` and `Track` type already exist.

---

## Component Map

| File | Action | Notes |
|---|---|---|
| `app/page.tsx` | Modify | Add `getAllTracks()`, pass to `HomeContent` |
| `components/HomeContent.tsx` | Refactor | Lift state here; render 3-column grid |
| `components/ArticlesList.tsx` | Simplify | Becomes thin feed — just renders `ArticleFeed` (or inline into `HomeContent`) |
| `components/ArticleFilters.tsx` | Refactor → `LeftSidebar` | Remove internal state; accept state + callbacks via props |
| `components/MinimalArticleCard.tsx` | Modify | Add thumbnail, track badge, featured marker; keep `getContentPreview` |
| `components/RightSidebar.tsx` | Create | Search input + tracks list (display only, no filter wiring) |

---

## Out of Scope

- Pagination or infinite scroll
- Server-side search
- Dedicated track/series pages
- Changes to the article detail page
- Any other route besides `/`
