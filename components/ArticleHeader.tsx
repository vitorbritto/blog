"use client";

import { useArticleContext } from "./ArticleLanguageProvider";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { useTranslation } from "@/lib/hooks/useTranslation";

export function ArticleHeader() {
  const { article, translatedArticle } = useArticleContext();
  const { language } = useLanguage();
  const { t, translateCategory } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="mb-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-zinc-50">
          {translatedArticle.title}
        </h1>
        <p className="text-xl text-zinc-300 leading-relaxed">
          {translatedArticle.excerpt}
        </p>
        <div className="flex items-center gap-3 text-sm text-zinc-400 pt-4 border-t border-zinc-800/50">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
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
