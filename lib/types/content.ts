export type Article = {
  slug: string;
  title: string;
  excerpt: string;
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
  content: string;
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
