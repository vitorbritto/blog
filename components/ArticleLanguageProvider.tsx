"use client";

import { createContext, useContext, ReactNode } from "react";
import { Article } from "@/lib/types/content";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { getTranslatedArticle } from "@/lib/i18n";

const ArticleContext = createContext<{
  language: string;
  translatedArticle: ReturnType<typeof getTranslatedArticle>;
} | null>(null);

export function useArticleContext() {
  const context = useContext(ArticleContext);
  if (!context)
    throw new Error(
      "useArticleContext must be used within ArticleLanguageProvider"
    );
  return context;
}

export function ArticleLanguageProvider({
  article,
  children,
}: {
  article: Article;
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const translatedArticle = getTranslatedArticle(article, language);

  return (
    <ArticleContext.Provider value={{ language, translatedArticle }}>
      {children}
    </ArticleContext.Provider>
  );
}
