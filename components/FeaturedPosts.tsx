import Link from "next/link";
// import Image from "next/image";
import { getAllArticles } from "@/lib/content";
import { ArticleImage } from "./ArticleImage";

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
          <article key={article.slug} className="group">
            <Link
              href={`/articles/${article.slug}`}
              className="space-y-4 block"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800/50">
                <ArticleImage src={article.coverImage} alt={article.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <time dateTime={article.date}>{article.date}</time>
                  <span>•</span>
                  <span>{article.readTime} min read</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-zinc-400 line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
