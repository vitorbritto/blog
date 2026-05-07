'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Article, Category, Track } from '@/lib/types/content'
import { ArticleContent } from './ArticleContent'
import { LeftSidebar } from './LeftSidebar'
import { RightSidebar } from './RightSidebar'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface ArticlePageLayoutProps {
  article: Article
  articles: Article[]
  categories: Category[]
  tags: string[]
  tracks: Track[]
}

export function ArticlePageLayout({
  article,
  articles,
  categories,
  tags,
  tracks
}: ArticlePageLayoutProps) {
  const router = useRouter()
  const { t } = useTranslation()

  const goHomeWith = (params: Record<string, string>) => {
    const search = new URLSearchParams(params).toString()
    router.push(`/${search ? `?${search}` : ''}`)
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)_300px] lg:gap-32">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeftSidebar
              articles={articles}
              selectedCategories={[]}
              selectedTags={[]}
              onToggleCategory={slug => goHomeWith({ cat: slug })}
              onToggleTag={tag => goHomeWith({ tag })}
            />
          </div>

          <div className="min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
              {t('article.back')}
            </Link>
            <ArticleContent article={article} />
          </div>

          <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <RightSidebar
              tracks={tracks}
              categories={categories}
              tags={tags}
              selectedCategories={[]}
              selectedTags={[]}
              searchQuery=""
              onSearchChange={query => {
                if (query.trim()) goHomeWith({ q: query })
              }}
              onToggleCategory={slug => goHomeWith({ cat: slug })}
              onToggleTag={tag => goHomeWith({ tag })}
              onClearAllCategories={() => router.push('/')}
              onClearAllTags={() => router.push('/')}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
