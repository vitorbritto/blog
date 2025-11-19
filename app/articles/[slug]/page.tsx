import { getArticleBySlug } from '@/lib/content'
import { notFound } from 'next/navigation'
import { ArticleContent } from '@/components/ArticleContent'

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
