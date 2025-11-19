import { getAllArticles } from '@/lib/content'
import { getAllCategories } from '@/lib/content'
import { getAllTags } from '@/lib/content'
import { HomeContent } from '@/components/HomeContent'

export default async function Home() {
  const articles = await getAllArticles()
  const categories = await getAllCategories()
  const tags = await getAllTags()

  return <HomeContent articles={articles} categories={categories} tags={tags} />
}
