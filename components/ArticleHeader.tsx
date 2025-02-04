"use client";

import Image from "next/image";
import Link from "next/link";
import { useArticleContext } from "./ArticleLanguageProvider";
import { useTranslation } from "../lib/hooks/useTranslation";

export function ArticleHeader() {
  const { translatedArticle } = useArticleContext();
  const { t } = useTranslation();

  return (
    <div className="mt-8 mb-12">
      <div className="flex gap-4">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{translatedArticle.title}</h1>
          <h2 className="text-xl text-zinc-400">{translatedArticle.excerpt}</h2>
        </div>
      </div>

      <div className="space-y-4 text-left border-t border-b border-zinc-700 my-4 py-4">
        <div className="flex gap-2 justify-between">
          <div>
            {translatedArticle.categories?.map((category) => (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/50 px-3 py-1 rounded-full"
              >
                {category}
              </Link>
            ))}
          </div>
          <div>
            <time dateTime={translatedArticle.date}>
              {translatedArticle.date}
            </time>
            <span>•</span>
            <span>
              {translatedArticle.readTime} {t("article.readTime")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Image
          src={translatedArticle.coverImage}
          alt={translatedArticle.title}
          width={1000}
          height={1000}
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
}
