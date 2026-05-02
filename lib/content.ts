import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Article, ArticleTranslation, Category, Track } from './types/content'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const metadataPath = path.join(contentDirectory, 'metadata/articles', `${slug}.json`)
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))

    const en = await getArticleTranslation(slug, 'en')
    const ptBR = await getArticleTranslation(slug, 'pt-BR')
    if (!en && !ptBR) return null

    const translations: Article['translations'] = {
      en: en ?? ptBR!,
      'pt-BR': ptBR ?? en!
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
): Promise<ArticleTranslation | null> {
  const filePath = path.join(contentDirectory, 'articles', language, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
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

  const metadataDirectory = path.join(contentDirectory, 'metadata/articles')
  if (!fs.existsSync(metadataDirectory)) {
    return categories
  }

  const validCategories = new Set(categories.map(category => category.slug))
  const articlesByCategory = new Map<string, string[]>(
    categories.map(category => [category.slug, []])
  )

  const articleMetadata = fs
    .readdirSync(metadataDirectory)
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const filePath = path.join(metadataDirectory, fileName)
      return JSON.parse(fs.readFileSync(filePath, 'utf8')) as Pick<
        Article,
        'slug' | 'date' | 'categories'
      >
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  for (const article of articleMetadata) {
    for (const category of article.categories || []) {
      if (validCategories.has(category)) {
        articlesByCategory.get(category)?.push(article.slug)
      }
    }
  }

  return categories.map(category => ({
    ...category,
    articles: articlesByCategory.get(category.slug) || []
  }))
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
