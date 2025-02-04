"use client";

import { MDXRemote } from "next-mdx-remote/rsc";
import { useArticleContext } from "./ArticleLanguageProvider";
import { CodeBlock } from "./CodeBlock";
import { mdxOptions } from "@/lib/mdx";

const components = {
  pre: ({ children }: { children: React.ReactNode }) => children,
  code: ({ children, className }: { children: string; className?: string }) => {
    const language = className?.replace("language-", "");
    if (!language) return <code>{children}</code>;

    return (
      <CodeBlock
        code={children.trim()}
        language={language}
        title={language === "bash" ? "Terminal" : undefined}
      />
    );
  },
};

export function ArticleMDX() {
  const { translatedArticle } = useArticleContext();

  return (
    <div className="prose prose-invert prose-emerald max-w-none mb-4">
      <MDXRemote
        source={translatedArticle.content}
        components={components}
        options={mdxOptions}
      />
    </div>
  );
}
