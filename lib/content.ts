import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Article, ArticleTranslation, Category, Track } from './types/content'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const metadataPath = path.join(contentDirectory, 'metadata/articles', `${slug}.json`)
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))

    const translations: Article['translations'] = {
      en: await getArticleTranslation(slug, 'en'),
      'pt-BR': await getArticleTranslation(slug, 'pt-BR')
    }

    return {
      ...metadata,
      translations
    }
  } catch {
    return null
  }
}

async function getArticleTranslation(
  slug: string,
  language: 'en' | 'pt-BR'
): Promise<ArticleTranslation> {
  const filePath = path.join(contentDirectory, 'articles', language, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    title: data.title,
    excerpt: data.excerpt,
    content
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const metadataDirectory = path.join(contentDirectory, 'metadata/articles')
  const articleFiles = fs.readdirSync(metadataDirectory)
  const articles = await Promise.all(
    articleFiles.map(fileName => getArticleBySlug(fileName.replace(/\.json$/, '')))
  )

  return articles
    .filter((article): article is Article => article !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getAllArticles()
  return articles.filter(article => article.featured)
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getAllArticles()
  return articles.filter(article => article.categories.includes(category))
}

export async function getArticlesByTrack(track: string): Promise<Article[]> {
  const articles = await getAllArticles()
  return articles.filter(article => article.tracks?.includes(track))
}

export async function getAllTracks(): Promise<Track[]> {
  const tracksDirectory = path.join(process.cwd(), 'content', 'tracks')
  
  if (!fs.existsSync(tracksDirectory)) {
    return []
  }
  
  const trackFiles = fs.readdirSync(tracksDirectory)

  const tracks = trackFiles.map(fileName => {
    const filePath = path.join(tracksDirectory, fileName)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent) as Track
  })

  return tracks
}

export async function getAllCategories(): Promise<Category[]> {
  const categoriesDirectory = path.join(process.cwd(), 'content', 'categories')
  
  if (!fs.existsSync(categoriesDirectory)) {
    return []
  }
  
  const categoryFiles = fs.readdirSync(categoriesDirectory)

  const categories = categoryFiles.map(fileName => {
    const filePath = path.join(categoriesDirectory, fileName)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent) as Category
  })

  return categories
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getAllCategories()
  return categories.find(category => category.slug === slug) || null
}

export async function getAllTags(): Promise<string[]> {
  const articles = await getAllArticles()
  const allTags = new Set<string>()
  
  articles.forEach(article => {
    if (article.tags) {
      article.tags.forEach(tag => allTags.add(tag))
    }
  })
  
  return Array.from(allTags).sort()
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const articles = await getAllArticles()
  return articles.filter(article => article.tags?.includes(tag))
}
