'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { getTranslatedArticle } from '@/lib/i18n'
import { Article } from '@/lib/types/content'

interface MinimalArticleCardProps {
  article: Article
}

function getContentPreview(content: string, maxLength: number = 240): string {
  // Remove markdown syntax (headers, links, code blocks, etc.)
  let text = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert links to text
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^\*]+)\*/g, '$1') // Remove italic
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  // Truncate to max length
  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim()
    // Try to cut at a word boundary
    const lastSpace = text.lastIndexOf(' ')
    if (lastSpace > maxLength * 0.8) {
      text = text.substring(0, lastSpace)
    }
    text += '...'
  }

  return text
}

export function MinimalArticleCard({ article }: MinimalArticleCardProps) {
  const { language } = useLanguage()
  const { translateCategory, t } = useTranslation()
  const translatedArticle = getTranslatedArticle(article, language)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const contentPreview = getContentPreview(translatedArticle.content)

  return (
    <article className="py-6 border-b border-zinc-800/50 last:border-b-0">
      <Link href={`/articles/${article.slug}`} className="group block">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span>·</span>
            <span>
              {article.readTime} {t('article.readTime')}
            </span>
            {article.categories.length > 0 && (
              <>
                <span>·</span>
                <span className="capitalize">
                  {translateCategory(article.categories[0])}
                </span>
              </>
            )}
          </div>
          <h2 className="text-xl font-semibold text-zinc-50 group-hover:text-emerald-400 transition-colors">
            {translatedArticle.title}
          </h2>
          <p className="text-zinc-400 line-clamp-2 leading-relaxed">{contentPreview}</p>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-zinc-800/70 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
