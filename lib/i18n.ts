import { Article, ArticleTranslation } from "./types/content";

export function getTranslatedArticle(
  article: Article,
  language: "en" | "pt-BR"
): ArticleTranslation &
  Pick<Article, "slug" | "coverImage" | "date" | "readTime" | "categories"> {
  return {
    slug: article.slug,
    coverImage: article.coverImage,
    date: article.date,
    readTime: article.readTime,
    categories: article.categories,
    ...article.translations[language],
  };
}
