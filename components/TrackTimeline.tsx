"use client";

import Link from "next/link";
import { Article } from "@/lib/types/content";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { getTranslatedArticle } from "@/lib/i18n";

interface TrackTimelineProps {
  articles: Article[];
}

function getContentPreview(content: string, maxLength: number = 240): string {
  // Remove markdown syntax (headers, links, code blocks, etc.)
  let text = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert links to text
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^\*]+)\*/g, '$1') // Remove italic
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  // Truncate to max length
  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim();
    // Try to cut at a word boundary
    const lastSpace = text.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.8) {
      text = text.substring(0, lastSpace);
    }
    text += '...';
  }

  return text;
}

export function TrackTimeline({ articles }: TrackTimelineProps) {
  const { language } = useLanguage();
  const { translateCategory, t } = useTranslation();

  return (
    <div className="space-y-6">
      {articles.map((article, index) => {
        const translatedArticle = getTranslatedArticle(article, language);
        return (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="block group py-6 border-b border-zinc-800/50 last:border-b-0"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-zinc-500">
                <span className="text-emerald-400 font-medium">#{index + 1}</span>
                <span>·</span>
                <span>{article.readTime} {t('article.readTime')}</span>
                {article.categories.length > 0 && (
                  <>
                    <span>·</span>
                    <span className="capitalize">{translateCategory(article.categories[0])}</span>
                  </>
                )}
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                {translatedArticle.title}
              </h3>
              <p className="text-zinc-500 line-clamp-2 leading-relaxed">
                {getContentPreview(translatedArticle.content)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
