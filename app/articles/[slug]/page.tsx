import { getArticleBySlug, getAllArticles } from '@/lib/content'
import { notFound } from 'next/navigation'
import { ReadingProgress } from '@/components/ReadingProgress'
// import { ArticleLikes } from '@/components/ArticleLikes'
import { ArticleShare } from '@/components/ArticleShare'
import { ArticleNavigation } from '@/components/ArticleNavigation'
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

  const articles = await getAllArticles()
  const currentIndex = articles.findIndex(a => a.slug === slug)
  const previousArticle = articles[currentIndex + 1] || null
  const nextArticle = articles[currentIndex - 1] || null

  return (
    <main className="relative">
      <ReadingProgress />
      <div className="px-6">
        <ArticleContent article={article} />
        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex justify-end border-t border-zinc-800 pt-6">
            {/* <ArticleLikes articleId={article.slug} /> */}
            <ArticleShare article={article} />
          </div>
        </div>
        <ArticleNavigation previous={previousArticle} next={nextArticle} />
      </div>
    </main>
  )
}
