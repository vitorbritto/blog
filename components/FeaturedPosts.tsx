import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import { ArticleCard } from "./ArticleCard";

export async function FeaturedPosts() {
  const articles = await getAllArticles();
  const featuredArticles = articles.slice(0, 3);

  return (
    <section id="posts" className="max-w-6xl mx-auto mb-32">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl font-bold">Artigos em destaque</h2>
        <Link
          href="/articles"
          className="group flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Ver todos
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {featuredArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
