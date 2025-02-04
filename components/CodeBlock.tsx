"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      <button
        onClick={copyToClipboard}
        className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2 p-2 rounded bg-zinc-700/50 hover:bg-zinc-700"
      >
        {isCopied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4 text-zinc-400" />
        )}
      </button>
      <pre className="overflow-x-auto rounded-lg bg-[#0d1117] p-4">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
