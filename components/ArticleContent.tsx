import { Suspense } from "react";
import { Article } from "@/lib/types/content";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleMDX } from "./ArticleMDX";
import { ArticleLanguageProvider } from "./ArticleLanguageProvider";

export function ArticleContent({ article }: { article: Article }) {
  return (
    <article className="max-w-6xl mx-auto px-6 py-24">
      <ArticleLanguageProvider article={article}>
        <ArticleHeader article={article} />
        <Suspense fallback={<div>Carregando...</div>}>
          <ArticleMDX article={article} />
        </Suspense>
      </ArticleLanguageProvider>
    </article>
  );
}
