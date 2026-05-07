'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Check, ChevronDown, Search, X } from 'lucide-react'
import { Article, Category } from '@/lib/types/content'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { getTranslatedArticle } from '@/lib/i18n'

const MOBILE_FILTERS_EVENT = 'blog:toggle-mobile-filters'

type DrawerSection = 'archive' | 'topics' | 'tags'
type ArchiveGroup = { key: string; label: string; articles: Article[] }

interface MobileFilterDrawerProps {
  articles: Article[]
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

function groupArticlesByMonth(articles: Article[], locale: string): ArchiveGroup[] {
  const groups = new Map<string, Article[]>()

  for (const article of articles) {
    if (!article.date) continue
    const date = new Date(article.date)
    if (Number.isNaN(date.getTime())) continue
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
        articles: items.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      }
    })
}

export function MobileFilterDrawer({
  articles,
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
}: MobileFilterDrawerProps) {
  const { t, translateCategory } = useTranslation()
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<DrawerSection>('archive')
  const [localQuery, setLocalQuery] = useState(searchQuery)
  const archiveLocale = language === 'en' ? 'en-US' : 'pt-BR'
  const archive = useMemo(
    () => groupArticlesByMonth(articles, archiveLocale),
    [articles, archiveLocale]
  )

  const activeFilterCount = selectedCategories.length + selectedTags.length

  useEffect(() => {
    function openDrawer() {
      setIsOpen(true)
    }

    window.addEventListener(MOBILE_FILTERS_EVENT, openDrawer)
    return () => window.removeEventListener(MOBILE_FILTERS_EVENT, openDrawer)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localQuery !== searchQuery) onSearchChange(localQuery)
    }, 300)

    return () => clearTimeout(timeout)
  }, [localQuery, searchQuery, onSearchChange])

  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <button
        type="button"
        aria-label={t('filters.close')}
        className="absolute inset-0 bg-black/60"
        onClick={() => setIsOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-filters-title"
        className="absolute right-0 top-0 flex h-full w-[min(26rem,calc(100vw-2rem))] flex-col border-l border-zinc-800 bg-[#161718] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
          <div>
            <h2
              id="mobile-filters-title"
              className="text-sm font-semibold uppercase tracking-wide text-zinc-300"
            >
              {t('filters.title')}
            </h2>
            <p className="text-xs text-zinc-500">
              {activeFilterCount > 0
                ? t('filters.active').replace('{count}', String(activeFilterCount))
                : t('articles.browseDescription')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label={t('filters.close')}
            className="flex h-10 w-10 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-emerald-400 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="border-b border-zinc-800 px-4 py-4">
          <div className="relative">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              value={localQuery}
              onChange={event => setLocalQuery(event.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full rounded-lg border border-zinc-800/60 bg-zinc-900 py-2 pl-9 pr-9 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
            />
            {localQuery && (
              <button
                type="button"
                onClick={() => setLocalQuery('')}
                aria-label={t('search.clear')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-100"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-zinc-800 px-4 py-3">
          {[
            { key: 'archive' as const, label: t('archive.title'), count: archive.length },
            {
              key: 'topics' as const,
              label: t('filters.topics'),
              count: selectedCategories.length
            },
            { key: 'tags' as const, label: t('filters.tags'), count: selectedTags.length }
          ].map(item => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveSection(item.key)}
              aria-pressed={activeSection === item.key}
              className={`flex min-h-11 items-center justify-center gap-1 rounded text-xs font-semibold uppercase tracking-wide transition-colors ${
                activeSection === item.key
                  ? 'bg-zinc-100 text-zinc-900'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
              }`}
            >
              <span>{item.label}</span>
              {item.count > 0 && item.key !== 'archive' && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    activeSection === item.key
                      ? 'bg-zinc-900 text-zinc-100'
                      : 'bg-zinc-900 text-zinc-400'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          {activeSection === 'archive' && (
            <div className="divide-y divide-zinc-800/70">
              {archive.map(group => (
                <details key={group.key} className="group/archive">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-3 text-xs font-medium uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-200">
                    <span className="flex items-center gap-2">
                      {group.label}
                      <span className="text-zinc-600 normal-case tracking-normal">
                        ({group.articles.length})
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden
                      className="h-4 w-4 text-zinc-500 transition-transform group-open/archive:rotate-180"
                    />
                  </summary>
                  <ul className="space-y-3 pb-4 pt-1">
                    {group.articles.map(article => {
                      const translated = getTranslatedArticle(article, language)
                      return (
                        <li key={article.slug}>
                          <Link
                            href={`/articles/${article.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="block text-sm leading-relaxed text-zinc-400 transition-colors hover:text-emerald-400"
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
          )}

          {activeSection === 'topics' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {t('filters.topics')}
                </h3>
                {selectedCategories.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearAllCategories}
                    className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    {t('filters.clearAll')}
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {categories.map(category => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => onToggleCategory(category.slug)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium capitalize transition-colors ${
                      selectedCategories.includes(category.slug)
                        ? 'bg-zinc-100 text-zinc-900'
                        : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded border-2 ${
                        selectedCategories.includes(category.slug)
                          ? 'border-zinc-900 bg-zinc-900'
                          : 'border-zinc-600'
                      }`}
                    >
                      {selectedCategories.includes(category.slug) && (
                        <Check className="h-3 w-3 text-zinc-100" aria-hidden />
                      )}
                    </span>
                    {translateCategory(category.slug)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'tags' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {t('filters.tags')}
                </h3>
                {selectedTags.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearAllTags}
                    className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    {t('filters.clearAll')}
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {tags.slice(0, 50).map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onToggleTag(tag)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-zinc-100 text-zinc-900'
                        : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded border-2 ${
                        selectedTags.includes(tag)
                          ? 'border-zinc-900 bg-zinc-900'
                          : 'border-zinc-600'
                      }`}
                    >
                      {selectedTags.includes(tag) && (
                        <Check className="h-3 w-3 text-zinc-100" aria-hidden />
                      )}
                    </span>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
