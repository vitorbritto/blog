"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import {
  Layout,
  Terminal,
  Network,
  Database,
  Lock,
  Cpu,
  Code2,
  Cloud,
} from "lucide-react";

export function CategoriesPageContent() {
  const { t } = useTranslation();

  const categories = [
    {
      name: t("categories.frontend.name"),
      slug: "front-end",
      description: t("categories.frontend.description"),
      count: 12,
      icon: Layout,
      gradient: "from-blue-400/10 to-indigo-400/10",
      hover: "hover:border-indigo-400/50",
    },
    {
      name: t("categories.backend.name"),
      slug: "back-end",
      description: t("categories.backend.description"),
      count: 15,
      icon: Terminal,
      gradient: "from-emerald-400/10 to-green-400/10",
      hover: "hover:border-emerald-400/50",
    },
    {
      name: t("categories.architecture.name"),
      slug: "arquitetura",
      description: t("categories.architecture.description"),
      count: 8,
      icon: Network,
      gradient: "from-orange-400/10 to-amber-400/10",
      hover: "hover:border-orange-400/50",
    },
    {
      name: t("categories.devops.name"),
      slug: "devops",
      description: t("categories.devops.description"),
      count: 10,
      icon: Cloud,
      gradient: "from-purple-400/10 to-pink-400/10",
      hover: "hover:border-purple-400/50",
    },
    {
      name: t("categories.databases.name"),
      slug: "databases",
      description: t("categories.databases.description"),
      count: 7,
      icon: Database,
      gradient: "from-cyan-400/10 to-blue-400/10",
      hover: "hover:border-cyan-400/50",
    },
    {
      name: t("categories.security.name"),
      slug: "security",
      description: t("categories.security.description"),
      count: 6,
      icon: Lock,
      gradient: "from-red-400/10 to-rose-400/10",
      hover: "hover:border-red-400/50",
    },
    {
      name: t("categories.performance.name"),
      slug: "performance",
      description: t("categories.performance.description"),
      count: 5,
      icon: Cpu,
      gradient: "from-yellow-400/10 to-amber-400/10",
      hover: "hover:border-yellow-400/50",
    },
    {
      name: t("categories.algorithms.name"),
      slug: "algorithms",
      description: t("categories.algorithms.description"),
      count: 9,
      icon: Code2,
      gradient: "from-teal-400/10 to-emerald-400/10",
      hover: "hover:border-teal-400/50",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto py-24">
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">{t("categories.title")}</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("common.back")}</span>
          </Link>
        </div>
        <p className="text-lg text-zinc-400 max-w-2xl">
          {t("categories.description")}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;
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
                  {category.count}
                </span>
                <span className="text-sm text-zinc-400">
                  {t("common.articles")}
                </span>
              </div>
              <div className="absolute inset-0 border border-emerald-400/0 group-hover:border-emerald-400/50 rounded-lg transition-colors duration-300" />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
