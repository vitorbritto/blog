'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Article, Track } from '@/lib/types/content'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { getTranslatedArticle } from '@/lib/i18n'

interface RightSidebarProps {
  tracks: Track[]
  articles: Article[]
  searchQuery: string
  onSearchChange: (query: string) => void
}

type ArchiveGroup = { key: string; label: string; articles: Article[] }

function groupArticlesByMonth(articles: Article[], locale: string): ArchiveGroup[] {
  const groups = new Map<string, Article[]>()

  for (const article of articles) {
    if (!article.date) continue
    const date = new Date(article.date)
    if (isNaN(date.getTime())) continue
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth()).padStart(2, '0')}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(article)
  }

  const formatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })

  return Array.from(groups.entries())
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([key, items]) => {
      const [year, month] = key.split('-').map(Number)
      const label = formatter.format(new Date(Date.UTC(year, month, 1)))
      return {
        key,
        label: label.charAt(0).toUpperCase() + label.slice(1),
        articles: items.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      }
    })
}

export function RightSidebar({ tracks, articles, searchQuery, onSearchChange }: RightSidebarProps) {
  const { t } = useTranslation()
  const { language } = useLanguage()
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

  const archiveLocale = language === 'en' ? 'en-US' : 'pt-BR'
  const archive = useMemo(
    () => groupArticlesByMonth(articles, archiveLocale),
    [articles, archiveLocale]
  )

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

      {archive.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-3">
            {t('archive.title')}
          </h3>
          <div className="space-y-4">
            {archive.map(group => (
              <div key={group.key}>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2">
                  {group.label}
                </p>
                <ul className="space-y-1.5">
                  {group.articles.map(article => {
                    const translated = getTranslatedArticle(article, language)
                    return (
                      <li key={article.slug}>
                        <Link
                          href={`/articles/${article.slug}`}
                          className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors line-clamp-2"
                        >
                          {translated.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
