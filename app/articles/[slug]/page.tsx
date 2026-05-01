import { getArticleBySlug, getAllArticles, getAllCategories, getAllTags, getAllTracks } from '@/lib/content'
import { notFound } from 'next/navigation'
import { ArticlePageLayout } from '@/components/ArticlePageLayout'

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const [article, articles, categories, tags, tracks] = await Promise.all([
    getArticleBySlug(slug),
    getAllArticles(),
    getAllCategories(),
    getAllTags(),
    getAllTracks(),
  ])

  if (!article) {
    notFound()
  }

  return (
    <ArticlePageLayout
      article={article}
      articles={articles}
      categories={categories}
      tags={tags}
      tracks={tracks}
    />
  )
}
