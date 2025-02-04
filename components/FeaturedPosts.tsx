import { getAllArticles } from "@/lib/content";
import { FeaturedPostsContent } from "./FeaturedPostsContent";

export async function FeaturedPosts() {
  const articles = await getAllArticles();
  const featuredArticles = articles.slice(0, 3);
  return <FeaturedPostsContent articles={featuredArticles} />;
}
