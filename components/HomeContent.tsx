'use client'

import { ArticlesList } from './ArticlesList'
import { Article } from '@/lib/types/content'
import { Category } from '@/lib/types/content'

interface HomeContentProps {
  articles: Article[]
  categories: Category[]
  tags: string[]
}

export function HomeContent({ articles, categories, tags }: HomeContentProps) {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <ArticlesList initialArticles={articles} categories={categories} tags={tags} />
      </div>
    </main>
  )
}
