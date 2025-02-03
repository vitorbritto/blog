import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Article, Track } from "./types/content";

const contentDirectory = path.join(process.cwd(), "content");
const articlesDirectory = path.join(contentDirectory, "articles");

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      date: data.date,
      author: data.author,
      categories: data.categories,
      tracks: data.tracks,
      tags: data.tags,
      readTime: data.readTime,
      featured: data.featured,
    };
  } catch {
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const slugs = fs.readdirSync(articlesDirectory);
  const articles = await Promise.all(
    slugs.map((slug) => getArticleBySlug(slug.replace(/\.mdx$/, "")))
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
