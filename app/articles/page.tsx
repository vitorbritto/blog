import { getAllArticles } from "@/lib/content";
import { getAllCategories } from "@/lib/content";
import { getAllTags } from "@/lib/content";
import { ArticlesPageContent } from "@/components/ArticlesPageContent";

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  return <ArticlesPageContent articles={articles} categories={categories} tags={tags} />;
}
