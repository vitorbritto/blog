import { Article } from "./types/content";

export function getTranslatedArticle(
  article: Article,
  language: "en" | "pt-BR"
) {
  return {
    title: article.translations[language].title,
    excerpt: article.translations[language].excerpt,
    content: article.translations[language].content,
  };
}
