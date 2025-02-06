"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types/content";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { getTranslatedArticle } from "@/lib/i18n";

export function CategoryArticles({ articles }: { articles: Article[] }) {
  const { language } = useLanguage();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {articles.map((article) => {
        const translatedArticle = getTranslatedArticle(article, language);
        return (
          <article key={article.slug} className="group">
            <Link
              href={`/articles/${article.slug}`}
              className="space-y-4 block"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900">
                <Image
                  src={article.coverImage}
                  alt={translatedArticle.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <time dateTime={article.date}>{article.date}</time>
                  <span>•</span>
                  <span>{article.readTime} min</span>
                </div>
                <h2 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                  {translatedArticle.title}
                </h2>
                <p className="text-zinc-400 line-clamp-2">
                  {translatedArticle.excerpt}
                </p>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
