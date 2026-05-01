'use client'

import { useMemo, useState } from 'react'
import { ArticlesList } from './ArticlesList'
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

  // Callbacks wired to children in T6 — defined here as state lives in HomeContent
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

  // All below wired to columns in T6
  void tracks
  void toggleCategory
  void toggleTag
  void clearAllCategories
  void clearAllTags
  void handleSearchChange

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <ArticlesList
          initialArticles={filteredArticles}
          categories={categories}
          tags={tags}
        />
      </div>
    </main>
  )
}
