'use client'

import { useEffect, useState } from 'react'
import { Category, Track } from '@/lib/types/content'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface RightSidebarProps {
  tracks: Track[]
  categories: Category[]
  tags: string[]
  selectedCategories: string[]
  selectedTags: string[]
  searchQuery: string
  onSearchChange: (query: string) => void
  onToggleCategory: (slug: string) => void
  onToggleTag: (tag: string) => void
  onClearAllCategories: () => void
  onClearAllTags: () => void
}

export function RightSidebar({
  tracks,
  categories,
  tags,
  selectedCategories,
  selectedTags,
  searchQuery,
  onSearchChange,
  onToggleCategory,
  onToggleTag,
  onClearAllCategories,
  onClearAllTags
}: RightSidebarProps) {
  const { t, translateCategory } = useTranslation()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localQuery !== searchQuery) onSearchChange(localQuery)
    }, 300)
    return () => clearTimeout(timeout)
  }, [localQuery, searchQuery, onSearchChange])

  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  return (
    <aside className="space-y-6">
      <div className="relative">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={localQuery}
          onChange={e => setLocalQuery(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full pl-9 pr-9 py-2 rounded-lg bg-zinc-900 border border-zinc-800/60 text-sm text-white placeholder:text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
        />
        {localQuery && (
          <button
            type="button"
            onClick={() => setLocalQuery('')}
            aria-label={t('search.clear')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {tracks.length > 0 && (
        <div className="rounded-lg border border-zinc-800/60 bg-zinc-900 p-4">
          <div className="flex items-center justify-between">
            {/* :top: mb-3 */}
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
              {t('filters.tracks')}
            </h3>
            <span className="text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
              {t('filters.comingSoon')}
            </span>
          </div>
          {/* <ul className="space-y-2">
            {tracks.map(track => (
              <li
                key={track.slug}
                className="text-sm text-zinc-400 flex items-center justify-between gap-2"
              >
                <span className="truncate">{track.name}</span>
                <span className="shrink-0 text-xs text-zinc-500">
                  {track.articles.length} {t('tracks.articles')}
                </span>
              </li>
            ))}
          </ul> */}
        </div>
      )}

      {categories.length > 0 && (
        <div className="rounded-lg border border-zinc-800/60 bg-zinc-900 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
              {t('filters.topics')}
            </h3>
            {selectedCategories.length > 0 && (
              <button
                onClick={onClearAllCategories}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {t('filters.clearAll')}
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {categories.map(category => (
              <button
                key={category.slug}
                onClick={() => onToggleCategory(category.slug)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left capitalize flex items-center gap-2 ${
                  selectedCategories.includes(category.slug)
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    selectedCategories.includes(category.slug)
                      ? 'bg-zinc-900 border-zinc-900'
                      : 'border-zinc-600'
                  }`}
                >
                  {selectedCategories.includes(category.slug) && (
                    <span className="text-zinc-100 text-xs">✓</span>
                  )}
                </span>
                {translateCategory(category.slug)}
              </button>
            ))}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div className="rounded-lg border border-zinc-800/60 bg-zinc-900 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
              {t('filters.tags')}
            </h3>
            {selectedTags.length > 0 && (
              <button
                onClick={onClearAllTags}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {t('filters.clearAll')}
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {tags.slice(0, 30).map(tag => (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-2 ${
                  selectedTags.includes(tag)
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    selectedTags.includes(tag)
                      ? 'bg-zinc-900 border-zinc-900'
                      : 'border-zinc-600'
                  }`}
                >
                  {selectedTags.includes(tag) && (
                    <span className="text-zinc-100 text-xs">✓</span>
                  )}
                </span>
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
