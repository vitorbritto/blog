'use client'

import { useMemo, useState } from 'react'
import { ArticleFeed } from './ArticleFeed'
import { LeftSidebar } from './LeftSidebar'
import { RightSidebar } from './RightSidebar'
import { Article, Category, Track } from '@/lib/types/content'

interface HomeContentProps {
  articles: Article[]
  categories: Category[]
  tags: string[]
  tracks: Track[]
}

export function HomeContent({ articles, categories, tags, tracks }: HomeContentProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

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
      <div className="mx-auto px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-32">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeftSidebar
              categories={categories}
              tags={tags}
              selectedCategories={selectedCategories}
              selectedTags={selectedTags}
              onToggleCategory={toggleCategory}
              onToggleTag={toggleTag}
              onClearAllCategories={clearAllCategories}
              onClearAllTags={clearAllTags}
            />
          </div>

          <ArticleFeed articles={filteredArticles} />

          <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <RightSidebar
              tracks={tracks}
              articles={filteredArticles}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
