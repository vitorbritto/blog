export type ArticleTranslation = {
  title: string;
  excerpt: string;
  content: string;
};

export type Article = {
  slug: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    picture: string;
  };
  categories: string[];
  tracks?: string[];
  tags?: string[];
  readTime: number;
  featured?: boolean;
  translations: {
    en: ArticleTranslation;
    "pt-BR": ArticleTranslation;
  };
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  articles: string[];
};

export type Track = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  articles: string[];
  topics: string[];
  featured?: boolean;
};
