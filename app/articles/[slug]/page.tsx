import { getArticleBySlug, getAllArticles } from '@/lib/content'
import { notFound } from 'next/navigation'
import { ArticleContent } from '@/components/ArticleContent'

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
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <main>
      <ArticleContent article={article} />
    </main>
  )
}
