"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArticleImage } from "./ArticleImage";
import { Article } from "@/lib/types/content";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { getTranslatedArticle } from "@/lib/i18n";

interface TrackTimelineProps {
  articles: Article[];
}

export function TrackTimeline({ articles }: TrackTimelineProps) {
  const { language } = useLanguage();

  return (
    <div className="relative space-y-12">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent" />

      {articles.map((article, index) => {
        const translatedArticle = getTranslatedArticle(article, language);
        return (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-16"
          >
            <div className="absolute left-[1.5rem] top-8 w-8 h-8 rounded-full bg-emerald-400 -translate-x-1/2">
              <p className="text-zinc-700 py-1 px-2.5 font-bold text-center">
                {index + 1}
              </p>
            </div>

            <Link
              href={`/articles/${article.slug}`}
              className="block group bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800/50 transition-colors"
            >
              <div className="grid sm:grid-cols-[1fr,320px]">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <span>{article.readTime} min</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                    {translatedArticle.title}
                  </h3>
                  <p className="text-zinc-400 line-clamp-2">
                    {translatedArticle.excerpt}
                  </p>
                </div>

                <div className="relative aspect-video sm:aspect-auto">
                  <ArticleImage
                    src={article.coverImage}
                    alt={translatedArticle.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 to-transparent sm:bg-gradient-to-l" />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
