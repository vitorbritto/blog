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
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg
            aria-hidden
            viewBox="0 0 220 160"
            className="mb-8 h-36 w-48 text-zinc-700"
            fill="none"
          >
            <path
              d="M55 116c-10 0-18-8-18-18V47c0-10 8-18 18-18h104c10 0 18 8 18 18v51c0 10-8 18-18 18H55Z"
              className="fill-zinc-900 stroke-zinc-800"
              strokeWidth="4"
            />
            <path
              d="M67 53h56M67 72h84M67 91h48"
              className="stroke-zinc-600"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M142 85c14 0 25 11 25 25s-11 25-25 25-25-11-25-25 11-25 25-25Z"
              className="fill-[#161718] stroke-emerald-400"
              strokeWidth="5"
            />
            <path
              d="m160 128 18 18"
              className="stroke-emerald-400"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M134 106h.01M151 106h.01"
              className="stroke-zinc-300"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M134 119c5-4 11-4 16 0"
              className="stroke-zinc-300"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M38 132c10 5 21 5 31 0M177 33c8-7 17-7 25 0"
              className="stroke-zinc-800"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
          <h1
            className="text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {t('articles.noArticlesFound')}
          </h1>
          <p
            className="mt-3 max-w-xl text-zinc-400"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {t('articles.noArticlesFoundDescription')}
          </p>
        </div>
      ) : (
        articles.map(article => (
          <MinimalArticleCard key={article.slug} article={article} />
        ))
      )}
    </div>
  )
}
