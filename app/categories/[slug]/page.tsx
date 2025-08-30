import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { Article, Category } from '@/lib/types/content'
import { getArticleBySlug } from '@/lib/content'
import { getTranslatedArticle } from '@/lib/i18n'
import {
  Code2,
  Layout,
  Network,
  Cloud,
  Terminal,
  Database,
  Lock,
  Cpu
} from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

const icons = {
  Layout,
  Terminal,
  Network,
  Database,
  Lock,
  Cpu,
  Code2,
  Cloud
}

async function getCategoryData(slug: string): Promise<Category | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'categories', `${slug}.json`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent)
  } catch {
    return null
  }
}

async function getCategoryArticles(slugs: string[]): Promise<Article[]> {
  const articles = await Promise.all(slugs.map(slug => getArticleBySlug(slug)))
  return articles.filter((article): article is Article => article !== null)
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryData(slug)

  if (!category) {
    notFound()
  }

  const articles = await getCategoryArticles(category.articles)
  const Icon = icons[category.icon as keyof typeof icons]

  return (
    <main className="max-w-6xl mx-auto px-6 py-24">
      {/* Category Header */}
      <div className="mb-16">
        <div className="inline-flex rounded-lg bg-emerald-400/10 p-3 mb-4">
          <Icon className="h-6 w-6 text-emerald-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-zinc-400 text-lg">{category.description}</p>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {articles.map(article => {
          const translatedArticle = getTranslatedArticle(article, 'pt-BR')
          return (
            <article key={article.slug} className="group">
              <Link href={`/articles/${article.slug}`} className="space-y-4 block">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900">
                  <Image
                    src={article.coverImage}
                    alt="Article cover image"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <time dateTime={article.date}>{article.date}</time>
                    <span>•</span>
                    <span>{article.readTime} min</span>
                  </div>
                  <h2 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                    {translatedArticle.title}
                  </h2>
                  <p className="text-zinc-400 line-clamp-2">
                    {translatedArticle.excerpt}
                  </p>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </main>
  )
}
