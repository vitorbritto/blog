'use client'

import { useEffect, useState } from 'react'
import { Article, Track } from '@/lib/types/content'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface RightSidebarProps {
  tracks: Track[]
  articles: Article[]
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function RightSidebar({ tracks, articles, searchQuery, onSearchChange }: RightSidebarProps) {
  const { t } = useTranslation()
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

  const resultLabel = t('search.resultCount').replace('{count}', String(articles.length))

  return (
    <aside className="space-y-6">
      <div className="space-y-2">
        <input
          type="search"
          value={localQuery}
          onChange={e => setLocalQuery(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
        />
        <p className="text-xs text-zinc-500">{resultLabel}</p>
      </div>

      {tracks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-3">
            {t('filters.tracks')}
          </h3>
          <ul className="space-y-2">
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
          </ul>
        </div>
      )}
    </aside>
  )
}
