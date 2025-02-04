"use client";

import { Article } from "@/lib/types/content";
import { ShareButtons } from "./ShareButtons";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { getTranslatedArticle } from "@/lib/i18n";

interface ArticleShareProps {
  article: Article;
}

export function ArticleShare({ article }: ArticleShareProps) {
  const { language } = useLanguage();
  const translatedArticle = getTranslatedArticle(article, language);

  return (
    <ShareButtons
      url={`${process.env.NEXT_PUBLIC_SITE_URL}/articles/${article.slug}`}
      title={translatedArticle.title}
    />
  );
}
