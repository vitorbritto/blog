import { notFound } from "next/navigation";
import { Article, Category } from "@/lib/types/content";
import { getArticleBySlug } from "@/lib/content";
import {
  Layout,
  Terminal,
  Network,
  Database,
  Lock,
  Cpu,
  Code2,
} from "lucide-react";
import { CategoryArticles } from "@/components/CategoryArticles";

const icons = {
  Layout,
  Terminal,
  Network,
  Database,
  Lock,
  Cpu,
  Code2,
};

const categories = {
  architecture: {
    slug: "architecture",
    name: "Arquitetura",
    description: "Design patterns e boas práticas",
    icon: "Network",
    articles: ["clean-architecture-node"],
  },
  "back-end": {
    slug: "back-end",
    name: "Back-end",
    description: "APIs, bancos de dados e servidores",
    icon: "Terminal",
    articles: ["clean-architecture-node"],
  },
  "front-end": {
    slug: "front-end",
    name: "Front-end",
    description: "UI/UX, frameworks e bibliotecas",
    icon: "Layout",
    articles: ["react-performance"],
  },
};

export const runtime = "edge";

async function getCategoryData(slug: string): Promise<Category | null> {
  return categories[slug as keyof typeof categories] || null;
}

async function getCategoryArticles(slugs: string[]): Promise<Article[]> {
  const articles = await Promise.all(
    slugs.map((slug) => getArticleBySlug(slug))
  );
  return articles.filter((article): article is Article => article !== null);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryData(slug);

  if (!category) {
    notFound();
  }

  const articles = await getCategoryArticles(category.articles);
  const Icon = icons[category.icon as keyof typeof icons];

  return (
    <main className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-16">
        <div className="inline-flex rounded-lg bg-emerald-400/10 p-3 mb-4">
          <Icon className="h-6 w-6 text-emerald-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-zinc-400 text-lg">{category.description}</p>
      </div>

      <CategoryArticles articles={articles} />
    </main>
  );
}
