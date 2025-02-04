"use client";

import Link from "next/link";
import { ArticleImage } from "./ArticleImage";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { getTranslatedArticle } from "@/lib/i18n";
import { Article } from "@/lib/types/content";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { language } = useLanguage();
  const translatedArticle = getTranslatedArticle(article, language);

  return (
    <article className="group">
      <Link href={`/articles/${article.slug}`} className="space-y-4 block">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800/50">
          <ArticleImage
            src={article.coverImage}
            alt={
              translatedArticle?.title || article.slug || "Article cover image"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <time dateTime={article.date}>{article.date}</time>
            <span>•</span>
            <span>{article.readTime} min</span>
          </div>
          <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
            {translatedArticle.title}
          </h3>
          <p className="text-zinc-400 line-clamp-2">
            {translatedArticle.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
