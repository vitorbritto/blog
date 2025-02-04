"use client";

import { useLanguage } from "@/lib/hooks/useLanguage";
import { getTranslatedArticle } from "@/lib/i18n";
import { Article } from "@/lib/types/content";

interface TranslatedContentProps {
  article: Article;
  children: (
    translatedArticle: ReturnType<typeof getTranslatedArticle>
  ) => React.ReactNode;
}

export function TranslatedContent({
  article,
  children,
}: TranslatedContentProps) {
  const { language } = useLanguage();
  const translatedArticle = getTranslatedArticle(article, language);

  return <>{children(translatedArticle)}</>;
}
