'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArticleFeed } from './ArticleFeed'
import { LeftSidebar } from './LeftSidebar'
import { MobileFilterDrawer } from './MobileFilterDrawer'
import { RightSidebar } from './RightSidebar'
import { Article, Category, Track } from '@/lib/types/content'

interface HomeContentProps {
  articles: Article[]
  categories: Category[]
  tags: string[]
  tracks: Track[]
}

export function HomeContent({ articles, categories, tags, tracks }: HomeContentProps) {
  const params = useSearchParams()
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    params.get('cat') ? [params.get('cat')!] : []
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(() =>
    params.get('tag') ? [params.get('tag')!] : []
  )
  const [searchQuery, setSearchQuery] = useState<string>(() => params.get('q') || '')

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      if (selectedCategories.length > 0) {
        const matches = selectedCategories.some(cat => article.categories.includes(cat))
        if (!matches) return false
      }

      if (selectedTags.length > 0) {
        const matches = selectedTags.some(tag => article.tags?.includes(tag))
        if (!matches) return false
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase()
        const inEn =
          article.translations.en.title.toLowerCase().includes(q) ||
          article.translations.en.excerpt.toLowerCase().includes(q)
        const inPtBR =
          article.translations['pt-BR'].title.toLowerCase().includes(q) ||
          article.translations['pt-BR'].excerpt.toLowerCase().includes(q)
        if (!inEn && !inPtBR) return false
      }

      return true
    })
  }, [articles, selectedCategories, selectedTags, searchQuery])

  function toggleCategory(slug: string) {
    setSelectedTags([])
    setSelectedCategories(prev =>
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    )
  }

  function toggleTag(tag: string) {
    setSelectedCategories([])
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  function clearAllCategories() { setSelectedCategories([]) }
  function clearAllTags() { setSelectedTags([]) }
  function handleSearchChange(query: string) { setSearchQuery(query) }

  return (
    <main className="min-h-screen">
      <MobileFilterDrawer
        articles={filteredArticles}
        categories={categories}
        tags={tags}
        selectedCategories={selectedCategories}
        selectedTags={selectedTags}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onToggleCategory={toggleCategory}
        onToggleTag={toggleTag}
        onClearAllCategories={clearAllCategories}
        onClearAllTags={clearAllTags}
      />

      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)_300px] lg:gap-32">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeftSidebar
              articles={filteredArticles}
              selectedCategories={selectedCategories}
              selectedTags={selectedTags}
              onToggleCategory={toggleCategory}
              onToggleTag={toggleTag}
            />
          </div>

          <ArticleFeed articles={filteredArticles} />

          <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <RightSidebar
              tracks={tracks}
              categories={categories}
              tags={tags}
              selectedCategories={selectedCategories}
              selectedTags={selectedTags}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onToggleCategory={toggleCategory}
              onToggleTag={toggleTag}
              onClearAllCategories={clearAllCategories}
              onClearAllTags={clearAllTags}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
