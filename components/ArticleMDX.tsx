"use client";

import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxOptions } from "@/lib/mdx";
import { useArticleContext } from "./ArticleLanguageProvider";
import { CodeBlock } from "./CodeBlock";

const components = {
  pre: ({ children }: { children: React.ReactNode }) => children,
  code: ({ children, className }: { children: string; className?: string }) => {
    if (!className) {
      return (
        <code className="px-1.5 py-0.5 text-sm font-mono bg-zinc-800 text-emerald-400 rounded">
          {children}
        </code>
      );
    }

    const language = className.replace("language-", "");
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
