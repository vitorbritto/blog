'use client'

import { useState, useEffect } from 'react'
import { Article } from '@/lib/types/content'
import { Category } from '@/lib/types/content'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface ArticleFiltersProps {
  articles: Article[]
  categories: Category[]
  tags: string[]
  onFilterChange: (filteredArticles: Article[]) => void
}

type FilterType = 'topic' | 'tag' | null

export function ArticleFilters({
  articles,
  categories,
  tags,
  onFilterChange
}: ArticleFiltersProps) {
  const { t, translateCategory } = useTranslation()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [openFilter, setOpenFilter] = useState<FilterType>(null)

  useEffect(() => {
    let filtered = articles

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(article =>
        selectedCategories.some(cat => article.categories.includes(cat))
      )
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(article =>
        selectedTags.some(tag => article.tags?.includes(tag))
      )
    }

    onFilterChange(filtered)
  }, [selectedCategories, selectedTags, articles, onFilterChange])

  const toggleCategory = (categorySlug: string) => {
    setSelectedCategories(prev => {
      const isRemoving = prev.includes(categorySlug)

      if (isRemoving) {
        return prev.filter(cat => cat !== categorySlug)
      }

      setSelectedTags([])
      return [...prev, categorySlug]
    })
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const isRemoving = prev.includes(tag)

      if (isRemoving) {
        return prev.filter(t => t !== tag)
      }

      setSelectedCategories([])
      return [...prev, tag]
    })
  }

  const clearCategory = (categorySlug: string) =>
    setSelectedCategories(prev => prev.filter(cat => cat !== categorySlug))
  const clearTag = (tag: string) => setSelectedTags(prev => prev.filter(t => t !== tag))
  const clearAllCategories = () => setSelectedCategories([])
  const clearAllTags = () => setSelectedTags([])

  return (
    <div className="space-y-4">
      <div className="lg:hidden space-y-4">
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map(categorySlug => (
            <div
              key={categorySlug}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/70 text-zinc-300 text-xs"
            >
              <span className="capitalize">{translateCategory(categorySlug)}</span>
              <button
                onClick={() => clearCategory(categorySlug)}
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
                onClick={() => clearTag(tag)}
                className="ml-1 hover:text-zinc-100 transition-colors"
                aria-label="Remove filter"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Filter Chips - Click to open select */}
        <div className="flex flex-wrap gap-2">
          {categories.length > 0 && (
            <button
              onClick={() => setOpenFilter(openFilter === 'topic' ? null : 'topic')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategories.length > 0
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : openFilter === 'topic'
                  ? 'bg-zinc-700 text-zinc-200 border border-zinc-600'
                  : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 border border-zinc-700/50'
              }`}
            >
              {t('filters.topics')}
              {selectedCategories.length > 0 && (
                <span className="ml-1.5">({selectedCategories.length})</span>
              )}
            </button>
          )}

          {tags.length > 0 && (
            <button
              onClick={() => setOpenFilter(openFilter === 'tag' ? null : 'tag')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedTags.length > 0
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : openFilter === 'tag'
                  ? 'bg-zinc-700 text-zinc-200 border border-zinc-600'
                  : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 border border-zinc-700/50'
              }`}
            >
              {t('filters.tags')}
              {selectedTags.length > 0 && (
                <span className="ml-1.5">({selectedTags.length})</span>
              )}
            </button>
          )}
        </div>

        {/* Checkbox Lists - Shown when chip is clicked */}
        {openFilter === 'topic' && categories.length > 0 && (
          <div className="space-y-2 max-h-[300px] overflow-y-auto bg-zinc-900/50 rounded-lg p-3 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">{t('filters.topics')}</span>
              {selectedCategories.length > 0 && (
                <button
                  onClick={clearAllCategories}
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
                  onChange={() => toggleCategory(category.slug)}
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
                  onClick={clearAllTags}
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
                  onChange={() => toggleTag(tag)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-0 focus:ring-offset-zinc-900"
                />
                <span className="text-sm text-zinc-300">{tag}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View - Keep buttons for larger screens */}
      <div className="hidden lg:block space-y-6">
        {categories.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
                {t('filters.topics')}
              </h3>
              {selectedCategories.length > 0 && (
                <button
                  onClick={clearAllCategories}
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
                  onClick={() => toggleCategory(category.slug)}
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
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
                {t('filters.tags')}
              </h3>
              {selectedTags.length > 0 && (
                <button
                  onClick={clearAllTags}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {t('filters.clearAll')}
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
              {tags.slice(0, 30).map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
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
      </div>
    </div>
  )
}
