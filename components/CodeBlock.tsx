"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-2 rounded-lg bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isCopied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 pre">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
