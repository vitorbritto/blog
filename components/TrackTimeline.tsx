"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArticleImage } from "./ArticleImage";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  readTime: number;
}

interface TrackTimelineProps {
  articles: Article[];
}

export function TrackTimeline({ articles }: TrackTimelineProps) {
  return (
    <div className="relative space-y-12">
      {/* Linha vertical central */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent" />

      {articles.map((article, index) => (
        <motion.div
          key={article.slug}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative pl-16"
        >
          {/* Círculo na timeline */}
          <div className="absolute left-4 top-8 w-4 h-4 rounded-full border-2 border-emerald-400 bg-zinc-950 -translate-x-1/2" />

          <Link
            href={`/articles/${article.slug}`}
            className="block group bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800/50 transition-colors"
          >
            <div className="grid sm:grid-cols-[1fr,320px]">
              {/* Conteúdo */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <span>{article.readTime} min read</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-zinc-400 line-clamp-2">{article.excerpt}</p>
              </div>

              {/* Imagem */}
              <div className="relative aspect-video sm:aspect-auto">
                <ArticleImage src={article.coverImage} alt={article.title} />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 to-transparent sm:bg-gradient-to-l" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
