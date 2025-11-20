'use client'

import { useState, useEffect } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useArticleContext } from './ArticleLanguageProvider'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { CodeBlock } from './CodeBlock'
import { ReferencesAccordion } from './ReferencesAccordion'
import remarkGfm from 'remark-gfm'
import { remarkReferencesAccordion } from '@/lib/remark-references-accordion'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

const components = {
  pre: ({ children }: { children: React.ReactNode }) => children,
  code: ({ children, className }: { children: string; className?: string }) => {
    if (!className) {
      return (
        <code className="px-1.5 py-0.5 text-sm font-mono bg-zinc-800 text-emerald-400 rounded">
          {children}
        </code>
      )
    }

    const language = className.replace('language-', '')
    return <CodeBlock code={children.trim()} language={language} />
  },
  ReferencesAccordion: ReferencesAccordion
}

export function ArticleMDX() {
  const { translatedArticle, language } = useArticleContext()
  const { t } = useTranslation()
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function serializeContent() {
      setIsLoading(true)
      try {
        const serialized = await serialize(translatedArticle.content, {
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkReferencesAccordion],
            format: 'mdx'
          }
        })

        if (isMounted) {
          setMdxSource(serialized)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error serializing MDX:', error)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    serializeContent()

    return () => {
      isMounted = false
    }
  }, [language, translatedArticle.content])

  if (isLoading || !mdxSource) {
    return <div>{t('article.loading')}</div>
  }

  return (
    <div
      className="prose prose-invert prose-emerald max-w-none mb-4 
      prose-p:text-lg prose-p:leading-relaxed prose-p:text-zinc-200
      prose-headings:text-zinc-50 prose-headings:font-bold
      prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-zinc-50 prose-strong:font-semibold
      prose-code:text-emerald-400 prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
      prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
      prose-blockquote:text-zinc-300 prose-blockquote:border-zinc-700
      prose-li:text-zinc-200 prose-ul:text-zinc-200 prose-ol:text-zinc-200"
    >
      <MDXRemote {...mdxSource} components={components} />
    </div>
  )
}
