'use client'

import { useState } from 'react'
import { Article } from '@/lib/types/content'
import { Category } from '@/lib/types/content'
import { MinimalArticleCard } from './MinimalArticleCard'
import { ArticleFilters } from './ArticleFilters'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface ArticlesListProps {
  initialArticles: Article[]
  categories: Category[]
  tags: string[]
}

export function ArticlesList({ initialArticles, categories, tags }: ArticlesListProps) {
  const { t } = useTranslation()
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(initialArticles)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <ArticleFilters
          articles={initialArticles}
          categories={categories}
          tags={tags}
          onFilterChange={setFilteredArticles}
        />
      </aside>

      <div className="min-w-0">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">{t('articles.noArticlesFound')}</p>
          </div>
        ) : (
          filteredArticles.map(article => (
            <MinimalArticleCard key={article.slug} article={article} />
          ))
        )}
      </div>
    </div>
  )
}
