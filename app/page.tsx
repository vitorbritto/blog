import { getAllArticles, getAllCategories, getAllTags, getAllTracks } from '@/lib/content'
import { HomeContent } from '@/components/HomeContent'

export default async function Home() {
  const [articles, categories, tags, tracks] = await Promise.all([
    getAllArticles(),
    getAllCategories(),
    getAllTags(),
    getAllTracks(),
  ])

  return <HomeContent articles={articles} categories={categories} tags={tags} tracks={tracks} />
}
