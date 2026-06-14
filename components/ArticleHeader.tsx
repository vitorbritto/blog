"use client";

import Image from "next/image";
import { useArticleContext } from "./ArticleLanguageProvider";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { formatArticleDate } from "@/lib/date";

export function ArticleHeader() {
  const { article, translatedArticle } = useArticleContext();
  const { language } = useLanguage();
  const { t, translateCategory } = useTranslation();

  const formattedDate =
    formatArticleDate(article.date, language === "en" ? "en-US" : "pt-BR") ??
    article.date;

  return (
    <header className="mb-12">
      <div className="space-y-4">
        {article.coverImage && (
          <Image
            src={article.coverImage}
            alt={translatedArticle.title}
            width={1672}
            height={941}
            priority
            sizes="(min-width: 1024px) 768px, 100vw"
            className="mb-8 aspect-[1672/941] w-full rounded-lg bg-zinc-900 object-cover"
          />
        )}

        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-zinc-50">
          {translatedArticle.title}
        </h1>
        <p className="text-xl text-zinc-300 leading-relaxed">
          {translatedArticle.excerpt}
        </p>
        <div className="flex items-center gap-3 text-sm text-zinc-400 pt-4 border-t border-zinc-800/50">
          <time dateTime={article.date}>{formattedDate}</time>
          <span>·</span>
          <span>{article.readTime} {t('article.readTime')}</span>
          {article.categories.length > 0 && (
            <>
              <span>·</span>
              <span className="capitalize">{translateCategory(article.categories[0])}</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
