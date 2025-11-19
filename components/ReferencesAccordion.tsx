"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ReferencesAccordionProps {
  children: React.ReactNode;
  title: string;
}

export function ReferencesAccordion({ children, title }: ReferencesAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 border border-zinc-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900/50 hover:bg-zinc-900 transition-colors text-left"
        aria-expanded={isOpen}
      >
        <h2 className="text-xl font-bold text-zinc-50 m-0">{title}</h2>
        <ChevronDown
          className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-zinc-900/30 border-t border-zinc-800">
          <div className="prose prose-invert prose-emerald max-w-none
            prose-p:text-lg prose-p:leading-relaxed prose-p:text-zinc-200
            prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
            prose-li:text-zinc-200 prose-ul:text-zinc-200 prose-ol:text-zinc-200">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

