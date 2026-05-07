'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Article } from '@/lib/types/content'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { getTranslatedArticle } from '@/lib/i18n'

interface LeftSidebarProps {
  articles: Article[]
  selectedCategories: string[]
  selectedTags: string[]
  onToggleCategory: (slug: string) => void
  onToggleTag: (tag: string) => void
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

export function LeftSidebar({
  articles,
  selectedCategories,
  selectedTags,
  onToggleCategory,
  onToggleTag
}: LeftSidebarProps) {
  const { t, translateCategory } = useTranslation()
  const { language } = useLanguage()
  const archiveLocale = language === 'en' ? 'en-US' : 'pt-BR'
  const archive = useMemo(
    () => groupArticlesByMonth(articles, archiveLocale),
    [articles, archiveLocale]
  )

  return (
    <aside>
      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {(selectedCategories.length > 0 || selectedTags.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(categorySlug => (
              <div
                key={categorySlug}
                className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/70 px-2.5 py-1 text-xs text-zinc-300"
              >
                <span className="capitalize">{translateCategory(categorySlug)}</span>
                <button
                  type="button"
                  onClick={() => onToggleCategory(categorySlug)}
                  className="ml-1 transition-colors hover:text-zinc-100"
                  aria-label={t('filters.remove')}
                >
                  x
                </button>
              </div>
            ))}
            {selectedTags.map(tag => (
              <div
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/70 px-2.5 py-1 text-xs text-zinc-300"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => onToggleTag(tag)}
                  className="ml-1 transition-colors hover:text-zinc-100"
                  aria-label={t('filters.remove')}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block space-y-6">
        {archive.length > 0 && (
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-900 p-4">
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-4">
              {t('archive.title')}
            </h3>
            <div className="divide-y divide-zinc-800/60">
              {archive.map(group => (
                <details key={group.key} className="group/archive">
                  <summary className="flex items-center justify-between gap-2 py-3 cursor-pointer list-none text-xs font-medium text-zinc-400 uppercase tracking-wide hover:text-zinc-200 transition-colors">
                    <span className="flex items-center gap-2">
                      {group.label}
                      <span className="text-zinc-600 normal-case tracking-normal">
                        ({group.articles.length})
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-zinc-500 transition-transform group-open/archive:rotate-90"
                    >
                      ›
                    </span>
                  </summary>
                  <ul className="space-y-3 pt-2 pb-4">
                    {group.articles.map(article => {
                      const translated = getTranslatedArticle(article, language)
                      return (
                        <li key={article.slug}>
                          <Link
                            href={`/articles/${article.slug}`}
                            className="block text-sm leading-relaxed text-zinc-400 hover:text-emerald-400 transition-colors"
                          >
                            {translated.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
