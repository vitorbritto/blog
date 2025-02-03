import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllArticles } from "@/lib/content";
import { ArticleImage } from "@/components/ArticleImage";

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <main className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">Artigos</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar</span>
          </Link>
        </div>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Explore artigos sobre desenvolvimento, arquitetura e boas práticas.
          Conhecimento compartilhado para ajudar você a se tornar um
          desenvolvedor melhor.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="group relative flex flex-col rounded-lg bg-zinc-900 overflow-hidden"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-zinc-800/50">
              <ArticleImage src={article.coverImage} alt={article.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />
            </div>

            <Link href={`/articles/${article.slug}`} className="flex-1 p-6">
              <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
                <time dateTime={article.date}>{article.date}</time>
                <span>•</span>
                <span>{article.readTime} min read</span>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                {article.title}
              </h2>
              <p className="text-zinc-400 line-clamp-2 mb-6">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {article.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-xs font-medium border border-emerald-400/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>

            <div className="absolute inset-0 border border-emerald-400/0 rounded-lg group-hover:border-emerald-400/50 transition-colors pointer-events-none" />
          </article>
        ))}
      </div>
    </main>
  );
}
