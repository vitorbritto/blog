import { getAllArticles } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticlesHeader } from "@/components/ArticlesHeader";

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <main className="max-w-6xl mx-auto px-6 py-24">
      <ArticlesHeader />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  );
}
