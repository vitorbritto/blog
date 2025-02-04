import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllArticles } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";

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
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  );
}
