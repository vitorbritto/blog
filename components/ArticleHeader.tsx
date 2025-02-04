"use client";

import { useArticleContext } from "./ArticleLanguageProvider";

export function ArticleHeader() {
  const { translatedArticle } = useArticleContext();

  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold mb-4">{translatedArticle.title}</h1>
      <div className="flex items-center gap-4 text-zinc-400">
        <div className="flex items-center gap-2">
          <time dateTime={translatedArticle.date}>
            {translatedArticle.date}
          </time>
          <span>•</span>
          <span>{translatedArticle.readTime} min</span>
        </div>
      </div>
    </div>
  );
}
