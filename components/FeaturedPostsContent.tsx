"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { ArticleCard } from "./ArticleCard";
import { Article } from "@/lib/types/content";

interface FeaturedPostsContentProps {
  articles: Article[];
}

export function FeaturedPostsContent({ articles }: FeaturedPostsContentProps) {
  const { t } = useTranslation();

  return (
    <section id="posts" className="max-w-6xl mx-auto mb-32">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl font-bold">{t("common.featuredPosts")}</h2>
        <Link
          href="/articles"
          className="group flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          {t("common.viewAll")}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
