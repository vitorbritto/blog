import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Article, ArticleTranslation, Track } from "./types/content";

const contentDirectory = path.join(process.cwd(), "content");

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    // Lê o metadata
    const metadataPath = path.join(
      contentDirectory,
      "metadata/articles",
      `${slug}.json`
    );
    const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));

    // Lê as traduções
    const translations: Article["translations"] = {
      en: await getArticleTranslation(slug, "en"),
      "pt-BR": await getArticleTranslation(slug, "pt-BR"),
    };

    return {
      ...metadata,
      translations,
    };
  } catch {
    return null;
  }
}

async function getArticleTranslation(
  slug: string,
  language: "en" | "pt-BR"
): Promise<ArticleTranslation> {
  const filePath = path.join(
    contentDirectory,
    "articles",
    language,
    `${slug}.mdx`
  );
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    excerpt: data.excerpt,
    content,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  // Alterar para ler da pasta metadata
  const metadataDirectory = path.join(contentDirectory, "metadata/articles");
  const articleFiles = fs.readdirSync(metadataDirectory);

  const articles = await Promise.all(
    articleFiles.map((fileName) =>
      getArticleBySlug(fileName.replace(/\.json$/, ""))
    )
  );

  return articles
    .filter((article): article is Article => article !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((article) => article.featured);
}

export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((article) => article.categories.includes(category));
}

export async function getArticlesByTrack(track: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((article) => article.tracks?.includes(track));
}

export async function getAllTracks(): Promise<Track[]> {
  const tracksDirectory = path.join(process.cwd(), "content", "tracks");
  const trackFiles = fs.readdirSync(tracksDirectory);

  const tracks = trackFiles.map((fileName) => {
    const filePath = path.join(tracksDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent) as Track;
  });

  return tracks;
}
