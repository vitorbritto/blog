'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Article, Category } from '@/lib/types/content'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { getTranslatedArticle } from '@/lib/i18n'

interface LeftSidebarProps {
  articles: Article[]
  categories: Category[]
  tags: string[]
  selectedCategories: string[]
  selectedTags: string[]
  onToggleCategory: (slug: string) => void
  onToggleTag: (tag: string) => void
  onClearAllCategories: () => void
  onClearAllTags: () => void
}

type FilterType = 'topic' | 'tag' | null
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
  categories,
  tags,
  selectedCategories,
  selectedTags,
  onToggleCategory,
  onToggleTag,
  onClearAllCategories,
  onClearAllTags
}: LeftSidebarProps) {
  const { t, translateCategory } = useTranslation()
  const { language } = useLanguage()
  const [openFilter, setOpenFilter] = useState<FilterType>(null)
  const archiveLocale = language === 'en' ? 'en-US' : 'pt-BR'
  const archive = useMemo(
    () => groupArticlesByMonth(articles, archiveLocale),
    [articles, archiveLocale]
  )

  return (
    <aside>
      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map(categorySlug => (
            <div
              key={categorySlug}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/70 text-zinc-300 text-xs"
            >
              <span className="capitalize">{translateCategory(categorySlug)}</span>
              <button
                onClick={() => onToggleCategory(categorySlug)}
                className="ml-1 hover:text-zinc-100 transition-colors"
                aria-label="Remove filter"
              >
                &times;
              </button>
            </div>
          ))}
          {selectedTags.map(tag => (
            <div
              key={tag}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/70 text-zinc-300 text-xs"
            >
              <span>{tag}</span>
              <button
                onClick={() => onToggleTag(tag)}
                className="ml-1 hover:text-zinc-100 transition-colors"
                aria-label="Remove filter"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpenFilter(openFilter === 'topic' ? null : 'topic')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  selectedCategories.length > 0
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : openFilter === 'topic'
                    ? 'bg-zinc-700 text-zinc-200 border border-zinc-600'
                    : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 border border-zinc-700/50'
                }`}
              >
                <span>
                  {t('filters.topics')}
                  {selectedCategories.length > 0 && (
                    <span className="ml-1.5">({selectedCategories.length})</span>
                  )}
                </span>
                <span className="text-[12px]">+</span>
              </button>
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpenFilter(openFilter === 'tag' ? null : 'tag')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  selectedTags.length > 0
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : openFilter === 'tag'
                    ? 'bg-zinc-700 text-zinc-200 border border-zinc-600'
                    : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 border border-zinc-700/50'
                }`}
              >
                <span>
                  {t('filters.tags')}
                  {selectedTags.length > 0 && (
                    <span className="ml-1.5">({selectedTags.length})</span>
                  )}
                </span>
                <span className="text-[12px]">+</span>
              </button>
            </div>
          )}
        </div>

        {openFilter === 'topic' && categories.length > 0 && (
          <div className="space-y-2 max-h-[300px] overflow-y-auto bg-zinc-900/50 rounded-lg p-3 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 font-medium">
                {t('filters.topics')}
              </span>
              {selectedCategories.length > 0 && (
                <button
                  onClick={onClearAllCategories}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {t('filters.clearAll')}
                </button>
              )}
            </div>
            {categories.map(category => (
              <label
                key={category.slug}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800/50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => onToggleCategory(category.slug)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-0 focus:ring-offset-zinc-900"
                />
                <span className="text-sm text-zinc-300 capitalize">
                  {translateCategory(category.slug)}
                </span>
              </label>
            ))}
          </div>
        )}

        {openFilter === 'tag' && tags.length > 0 && (
          <div className="space-y-2 max-h-[300px] overflow-y-auto bg-zinc-900/50 rounded-lg p-3 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">{t('filters.tags')}</span>
              {selectedTags.length > 0 && (
                <button
                  onClick={onClearAllTags}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {t('filters.clearAll')}
                </button>
              )}
            </div>
            {tags.slice(0, 50).map(tag => (
              <label
                key={tag}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800/50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => onToggleTag(tag)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-0 focus:ring-offset-zinc-900"
                />
                <span className="text-sm text-zinc-300">{tag}</span>
              </label>
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
