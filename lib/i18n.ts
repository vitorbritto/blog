import { Article, ArticleTranslation } from "./types/content";

export function getTranslatedArticle(
  article: Article,
  language: "en" | "pt-BR"
): ArticleTranslation &
  Pick<Article, "slug" | "coverImage" | "date" | "readTime"> {
  return {
    slug: article.slug,
    coverImage: article.coverImage,
    date: article.date,
    readTime: article.readTime,
    ...article.translations[language],
  };
}
