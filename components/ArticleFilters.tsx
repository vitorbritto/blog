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

  const handleCategoryClick = (categorySlug: string | null) => {
    const newCategory = selectedCategory === categorySlug ? null : categorySlug
    setSelectedCategory(newCategory)
    setSelectedTag(null) // Reset tag when category changes

    if (newCategory) {
      const filtered = articles.filter(article =>
        article.categories.includes(newCategory)
      )
      onFilterChange(filtered)
    } else {
      onFilterChange(articles)
    }
  }

  const handleTagClick = (tag: string | null) => {
    const newTag = selectedTag === tag ? null : tag
    setSelectedTag(newTag)
    setSelectedCategory(null) // Reset category when tag changes

    if (newTag) {
      const filtered = articles.filter(article => article.tags?.includes(newTag))
      onFilterChange(filtered)
    } else {
      onFilterChange(articles)
    }
  }

  return (
    <div className="space-y-8">
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wide">
            {t('filters.topics')}
          </h3>
          <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
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
