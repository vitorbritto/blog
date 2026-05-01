'use client'

import { useState } from 'react'
import { Category } from '@/lib/types/content'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface LeftSidebarProps {
  categories: Category[]
  tags: string[]
  selectedCategories: string[]
  selectedTags: string[]
  onToggleCategory: (slug: string) => void
  onToggleTag: (tag: string) => void
  onClearAllCategories: () => void
  onClearAllTags: () => void
}

type FilterType = 'topic' | 'tag' | null

export function LeftSidebar({
  categories,
  tags,
  selectedCategories,
  selectedTags,
  onToggleCategory,
  onToggleTag,
  onClearAllCategories,
  onClearAllTags
}: LeftSidebarProps) {
  const { t, translateCategory } = useTranslation()
  const [openFilter, setOpenFilter] = useState<FilterType>(null)

  return (
    <div className="space-y-4">
      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map(categorySlug => (
            <div
              key={categorySlug}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/70 text-zinc-300 text-xs"
            >
              <span className="capitalize">{translateCategory(categorySlug)}</span>
              <button
                onClick={() => onToggleCategory(categorySlug)}
                className="ml-1 hover:text-zinc-100 transition-colors"
                aria-label="Remove filter"
              >
                &times;
              </button>
            </div>
          ))}
          {selectedTags.map(tag => (
            <div
              key={tag}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/70 text-zinc-300 text-xs"
            >
              <span>{tag}</span>
              <button
                onClick={() => onToggleTag(tag)}
                className="ml-1 hover:text-zinc-100 transition-colors"
                aria-label="Remove filter"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpenFilter(openFilter === 'topic' ? null : 'topic')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  selectedCategories.length > 0
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : openFilter === 'topic'
                    ? 'bg-zinc-700 text-zinc-200 border border-zinc-600'
                    : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 border border-zinc-700/50'
                }`}
              >
                <span>
                  {t('filters.topics')}
                  {selectedCategories.length > 0 && (
                    <span className="ml-1.5">({selectedCategories.length})</span>
                  )}
                </span>
                <span className="text-[12px]">+</span>
              </button>
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpenFilter(openFilter === 'tag' ? null : 'tag')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  selectedTags.length > 0
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : openFilter === 'tag'
                    ? 'bg-zinc-700 text-zinc-200 border border-zinc-600'
                    : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 border border-zinc-700/50'
                }`}
              >
                <span>
                  {t('filters.tags')}
                  {selectedTags.length > 0 && (
                    <span className="ml-1.5">({selectedTags.length})</span>
                  )}
                </span>
                <span className="text-[12px]">+</span>
              </button>
            </div>
          )}
        </div>

        {openFilter === 'topic' && categories.length > 0 && (
          <div className="space-y-2 max-h-[300px] overflow-y-auto bg-zinc-900/50 rounded-lg p-3 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 font-medium">
                {t('filters.topics')}
              </span>
              {selectedCategories.length > 0 && (
                <button
                  onClick={onClearAllCategories}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {t('filters.clearAll')}
                </button>
              )}
            </div>
            {categories.map(category => (
              <label
                key={category.slug}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800/50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => onToggleCategory(category.slug)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-0 focus:ring-offset-zinc-900"
                />
                <span className="text-sm text-zinc-300 capitalize">
                  {translateCategory(category.slug)}
                </span>
              </label>
            ))}
          </div>
        )}

        {openFilter === 'tag' && tags.length > 0 && (
          <div className="space-y-2 max-h-[300px] overflow-y-auto bg-zinc-900/50 rounded-lg p-3 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">{t('filters.tags')}</span>
              {selectedTags.length > 0 && (
                <button
                  onClick={onClearAllTags}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {t('filters.clearAll')}
                </button>
              )}
            </div>
            {tags.slice(0, 50).map(tag => (
              <label
                key={tag}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800/50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => onToggleTag(tag)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-0 focus:ring-offset-zinc-900"
                />
                <span className="text-sm text-zinc-300">{tag}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block space-y-10 h-[calc(100vh-210px)]">
        {categories.length > 0 && (
          <div className="h-[50%]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
                {t('filters.topics')}
              </h3>
              {selectedCategories.length > 0 && (
                <button
                  onClick={onClearAllCategories}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {t('filters.clearAll')}
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2 max-h-[calc(100%-20px)] overflow-y-auto">
              {categories.map(category => (
                <button
                  key={category.slug}
                  onClick={() => onToggleCategory(category.slug)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left capitalize flex items-center gap-2 ${
                    selectedCategories.includes(category.slug)
                      ? 'bg-zinc-100 text-zinc-900'
                      : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      selectedCategories.includes(category.slug)
                        ? 'bg-zinc-900 border-zinc-900'
                        : 'border-zinc-600'
                    }`}
                  >
                    {selectedCategories.includes(category.slug) && (
                      <span className="text-zinc-100 text-xs">✓</span>
                    )}
                  </span>
                  {translateCategory(category.slug)}
                </button>
              ))}
            </div>
          </div>
        )}

        {tags.length > 0 && (
          <div className="h-[50%]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
                {t('filters.tags')}
              </h3>
              {selectedTags.length > 0 && (
                <button
                  onClick={onClearAllTags}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {t('filters.clearAll')}
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2 max-h-[calc(100%-20px)] overflow-y-auto">
              {tags.slice(0, 30).map(tag => (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-2 ${
                    selectedTags.includes(tag)
                      ? 'bg-zinc-100 text-zinc-900'
                      : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      selectedTags.includes(tag)
                        ? 'bg-zinc-900 border-zinc-900'
                        : 'border-zinc-600'
                    }`}
                  >
                    {selectedTags.includes(tag) && (
                      <span className="text-zinc-100 text-xs">✓</span>
                    )}
                  </span>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
