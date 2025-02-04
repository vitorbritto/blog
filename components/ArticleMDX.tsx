"use client";

import { MDXRemote } from "next-mdx-remote/rsc";
import { useArticleContext } from "./ArticleLanguageProvider";

export function ArticleMDX() {
  const { translatedArticle } = useArticleContext();

  return (
    <div className="prose prose-invert prose-emerald max-w-none mb-4">
      <MDXRemote source={translatedArticle.content} />
    </div>
  );
}
