import { getArticleBySlug, getAllArticles } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArticleLikes } from "@/components/ArticleLikes";
import { ShareButtons } from "@/components/ShareButtons";
import { ArticleNavigation } from "@/components/ArticleNavigation";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const articles = await getAllArticles();
  const currentIndex = articles.findIndex(
    (article) => article.slug === params.slug
  );
  const article = articles[currentIndex];

  if (!article) {
    notFound();
  }

  const previousArticle = articles[currentIndex + 1];
  const nextArticle = articles[currentIndex - 1];

  return (
    <>
      <ReadingProgress />
      <article className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-zinc-400">
            <div className="flex items-center gap-2">
              <time dateTime={article.date}>{article.date}</time>
              <span>•</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>

        <div className="prose prose-invert prose-emerald max-w-none">
          <MDXRemote source={article.content} />
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-zinc-800 pt-8">
          <ArticleLikes articleId={params.slug} />
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_SITE_URL}/articles/${params.slug}`}
            title={article.title}
          />
        </div>
      </article>
      <ArticleNavigation
        previous={
          previousArticle
            ? {
                slug: previousArticle.slug,
                title: previousArticle.title,
              }
            : undefined
        }
        next={
          nextArticle
            ? {
                slug: nextArticle.slug,
                title: nextArticle.title,
              }
            : undefined
        }
      />
    </>
  );
}
