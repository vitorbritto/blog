'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react'
import { Article, Category, Track } from '@/lib/types/content'
import { cn } from '@/lib/utils'
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
  const [isWideReading, setIsWideReading] = useState(false)

  const goHomeWith = (params: Record<string, string>) => {
    const search = new URLSearchParams(params).toString()
    router.push(`/${search ? `?${search}` : ''}`)
  }

  useEffect(() => {
    setIsWideReading(window.localStorage.getItem('articleReadingWidth') === 'wide')
  }, [])

  const toggleReadingWidth = () => {
    setIsWideReading(current => {
      const next = !current
      window.localStorage.setItem('articleReadingWidth', next ? 'wide' : 'default')
      return next
    })
  }

  const readingWidthLabel = isWideReading
    ? t('article.restoreReadingWidth')
    : t('article.expandReadingWidth')

  return (
    <main className="min-h-screen">
      <div className="mx-auto px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
        <div
          className={cn(
            'grid grid-cols-1 gap-8 transition-all duration-300 ease-out',
            isWideReading
              ? 'lg:grid-cols-[180px_minmax(0,1fr)_200px] lg:gap-10 xl:grid-cols-[200px_minmax(0,1fr)_220px] xl:gap-12'
              : 'lg:grid-cols-[280px_minmax(0,1fr)_300px] lg:gap-32'
          )}
        >
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <LeftSidebar
              articles={articles}
              selectedCategories={[]}
              selectedTags={[]}
              onToggleCategory={slug => goHomeWith({ cat: slug })}
              onToggleTag={tag => goHomeWith({ tag })}
            />
          </div>

          <div className="min-w-0">
            <div className="mb-6 flex items-center justify-between gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden />
                {t('article.back')}
              </Link>
              <button
                type="button"
                onClick={toggleReadingWidth}
                aria-label={readingWidthLabel}
                aria-pressed={isWideReading}
                title={readingWidthLabel}
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800/70 bg-zinc-900 text-zinc-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 lg:inline-flex"
              >
                {isWideReading ? (
                  <Minimize2 className="h-4 w-4" aria-hidden />
                ) : (
                  <Maximize2 className="h-4 w-4" aria-hidden />
                )}
              </button>
            </div>
            <ArticleContent article={article} />
          </div>

          <div className="hidden min-w-0 lg:block lg:sticky lg:top-24 lg:self-start">
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
