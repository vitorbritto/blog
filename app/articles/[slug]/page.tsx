import { getArticleBySlug, getAllArticles } from "@/lib/content";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArticleLikes } from "@/components/ArticleLikes";
import { ArticleShare } from "@/components/ArticleShare";
import { ArticleNavigation } from "@/components/ArticleNavigation";
import { ArticleContent } from "@/components/ArticleContent";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const articles = await getAllArticles();
  const currentIndex = articles.findIndex((a) => a.slug === article.slug);
  const previousArticle = articles[currentIndex + 1];
  const nextArticle = articles[currentIndex - 1];

  return (
    <>
      <ReadingProgress />
      <ArticleContent article={article} />
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
          <ArticleLikes articleId={article.slug} />
          <ArticleShare article={article} />
        </div>
      </div>
      <ArticleNavigation previous={previousArticle} next={nextArticle} />
    </>
  );
}
