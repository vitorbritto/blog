'use client'

import { Article } from '@/lib/types/content'
import { MinimalArticleCard } from './MinimalArticleCard'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface ArticleFeedProps {
  articles: Article[]
}

export function ArticleFeed({ articles }: ArticleFeedProps) {
  const { t } = useTranslation()

  return (
    <div className="min-w-0">
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-400">{t('articles.noArticlesFound')}</p>
        </div>
      ) : (
        articles.map(article => (
          <MinimalArticleCard key={article.slug} article={article} />
        ))
      )}
    </div>
  )
}
