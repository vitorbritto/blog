import { Feed } from "feed";
import { getAllArticles } from "./content";

export async function generateRssFeed() {
  const articles = await getAllArticles();
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || "https://seusite.com";
  const date = new Date();

  const author = {
    name: "Vitor Britto",
    email: "contato@vitorbritto.dev",
    link: "https://twitter.com/vitorbritto",
  };

  const feed = new Feed({
    title: "Vitor Britto Blog",
    description: "Blog sobre desenvolvimento, arquitetura e boas práticas",
    id: siteURL,
    link: siteURL,
    language: "pt-BR",
    image: `${siteURL}/og-image.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `Todos os direitos reservados ${date.getFullYear()}, Vitor Britto`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
      json: `${siteURL}/rss.json`,
      atom: `${siteURL}/atom.xml`,
    },
    author,
  });

  articles.forEach((article) => {
    const url = `${siteURL}/articles/${article.slug}`;
    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.excerpt,
      content: article.content,
      author: [author],
      contributor: [author],
      date: new Date(article.date),
      image: article.coverImage,
      category: article.categories.map((category) => ({ name: category })),
    });
  });

  return {
    rss: feed.rss2(),
    atom: feed.atom1(),
    json: feed.json1(),
  };
}
