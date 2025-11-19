'use client'

import { Article } from '@/lib/types/content'
import { ArticleHeader } from './ArticleHeader'
import { ArticleMDX } from './ArticleMDX'
import { ArticleLanguageProvider } from './ArticleLanguageProvider'

export function ArticleContent({ article }: { article: Article }) {
  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <ArticleLanguageProvider article={article}>
        <ArticleHeader />
        <ArticleMDX />
      </ArticleLanguageProvider>
    </article>
  )
}
