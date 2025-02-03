import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Category } from "@/lib/types/content";
import {
  Layout,
  Terminal,
  Network,
  Database,
  Lock,
  Cpu,
  Code2,
} from "lucide-react";

const icons = {
  Layout,
  Terminal,
  Network,
  Database,
  Lock,
  Cpu,
  Code2,
};

async function getAllCategories(): Promise<Category[]> {
  const categoriesDirectory = path.join(process.cwd(), "content", "categories");
  const categoryFiles = fs.readdirSync(categoriesDirectory);

  const categories = categoryFiles.map((fileName) => {
    const filePath = path.join(categoriesDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent) as Category;
  });

  return categories;
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">Categorias</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar</span>
          </Link>
        </div>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Explore artigos por categoria e encontre exatamente o que você precisa
          para evoluir em áreas específicas.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = icons[category.icon as keyof typeof icons];
          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-lg bg-zinc-900 p-6 hover:bg-zinc-800/80 transition-all duration-300"
            >
              <div className="mb-4 inline-flex rounded-lg bg-emerald-400/10 p-3">
                <Icon className="h-6 w-6 text-emerald-400" />
              </div>
              <h2 className="mb-2 text-lg font-bold group-hover:text-emerald-400 transition-colors">
                {category.name}
              </h2>
              <p className="text-sm text-zinc-400 mb-6">
                {category.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-emerald-400">
                  {category.articles.length}
                </span>
                <span className="text-sm text-zinc-400">artigos</span>
              </div>
              <div className="absolute inset-0 border border-emerald-400/0 group-hover:border-emerald-400/50 rounded-lg transition-colors duration-300" />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
