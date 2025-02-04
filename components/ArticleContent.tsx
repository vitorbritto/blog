import { Suspense } from "react";
import { Article } from "@/lib/types/content";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleMDX } from "./ArticleMDX";
import { ArticleLanguageProvider } from "./ArticleLanguageProvider";

export function ArticleContent({ article }: { article: Article }) {
  return (
    <article className="max-w-3xl mx-auto pt-24 pb-6">
      <ArticleLanguageProvider article={article}>
        <ArticleHeader />
        <Suspense fallback={<div>Carregando...</div>}>
          <ArticleMDX />
        </Suspense>
      </ArticleLanguageProvider>
    </article>
  );
}
