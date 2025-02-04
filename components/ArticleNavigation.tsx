"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { getTranslatedArticle } from "@/lib/i18n";
import { Article } from "@/lib/types/content";

interface ArticleNavigationProps {
  previous?: Article | null;
  next?: Article | null;
}

export function ArticleNavigation({ previous, next }: ArticleNavigationProps) {
  const { language } = useLanguage();

  const prevTranslated = previous
    ? getTranslatedArticle(previous, language)
    : null;
  const nextTranslated = next ? getTranslatedArticle(next, language) : null;

  return (
    <div className="fixed top-1/2 -translate-y-1/2 w-full pointer-events-none">
      <div className="max-w-[1920px] mx-auto px-4 flex justify-between">
        {previous ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto"
          >
            <Link
              href={`/articles/${previous.slug}`}
              className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-800 px-3 py-2 rounded-lg group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-transform group-hover:-translate-x-1" />
              <div className="max-w-[120px]">
                <span className="block text-xs text-zinc-400 mb-1">
                  Anterior
                </span>
                <span className="block text-sm truncate group-hover:text-emerald-400">
                  {prevTranslated?.title}
                </span>
              </div>
            </Link>
          </motion.div>
        ) : null}

        {next ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto ml-auto"
          >
            <Link
              href={`/articles/${next.slug}`}
              className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-800 px-3 py-2 rounded-lg group transition-colors"
            >
              <div className="max-w-[120px] text-right">
                <span className="block text-xs text-zinc-400 mb-1">
                  Próximo
                </span>
                <span className="block text-sm truncate group-hover:text-emerald-400">
                  {nextTranslated?.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
