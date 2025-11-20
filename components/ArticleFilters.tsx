'use client'

import { useState } from 'react'
import { Article } from '@/lib/types/content'
import { Category } from '@/lib/types/content'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface ArticleFiltersProps {
  articles: Article[]
  categories: Category[]
  tags: string[]
  onFilterChange: (filteredArticles: Article[]) => void
}

export function ArticleFilters({
  articles,
  categories,
  tags,
  onFilterChange
}: ArticleFiltersProps) {
  const { t, translateCategory } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug)
    setSelectedTag(null) // Reset tag when category changes

    if (categorySlug) {
      const filtered = articles.filter(article =>
        article.categories.includes(categorySlug)
      )
      onFilterChange(filtered)
    } else {
      onFilterChange(articles)
    }
  }

  const handleCategoryClick = (categorySlug: string | null) => {
    const newCategory = selectedCategory === categorySlug ? null : categorySlug
    handleCategoryChange(newCategory)
  }

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag)
    setSelectedCategory(null) // Reset category when tag changes

    if (tag) {
      const filtered = articles.filter(article => article.tags?.includes(tag))
      onFilterChange(filtered)
    } else {
      onFilterChange(articles)
    }
  }

  const handleTagClick = (tag: string | null) => {
    const newTag = selectedTag === tag ? null : tag
    handleTagChange(newTag)
  }

  return (
    <div className="space-y-8">
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wide">
            {t('filters.topics')}
          </h3>

          <select
            value={selectedCategory || ''}
            onChange={e => handleCategoryChange(e.target.value || null)}
            className="lg:hidden w-full px-3 py-2 rounded-lg text-sm font-medium bg-zinc-800/50 text-zinc-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          >
            <option value="">{t('filters.all')}</option>
            {categories.map(category => (
              <option key={category.slug} value={category.slug}>
                {translateCategory(category.slug)}
              </option>
            ))}
          </select>

          <div className="hidden lg:flex flex-col gap-2">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                selectedCategory === null
                  ? 'bg-zinc-100 text-zinc-900'
                  : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {t('filters.all')}
            </button>
            {categories.map(category => (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left capitalize ${
                  selectedCategory === category.slug
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {translateCategory(category.slug)}
              </button>
            ))}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wide">
            {t('filters.tags')}
          </h3>

          <select
            value={selectedTag || ''}
            onChange={e => handleTagChange(e.target.value || null)}
            className="lg:hidden w-full px-3 py-2 rounded-lg text-sm font-medium bg-zinc-800/50 text-zinc-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          >
            <option value="">{t('filters.all')}</option>
            {tags.slice(0, 30).map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <div className="hidden lg:flex flex-col gap-2 max-h-[400px] overflow-y-auto">
            <button
              onClick={() => handleTagClick(null)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                selectedTag === null
                  ? 'bg-zinc-100 text-zinc-900'
                  : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {t('filters.all')}
            </button>
            {tags.slice(0, 30).map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                  selectedTag === tag
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
