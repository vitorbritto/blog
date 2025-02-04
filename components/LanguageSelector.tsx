"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/hooks/useLanguage";

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const languages = {
    "pt-BR": { flag: "🇧🇷", label: "PT" },
    en: { flag: "🇺🇸", label: "EN" },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-sm hover:border-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
      >
        {languages[language].flag} {languages[language].label}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded shadow-lg overflow-hidden">
          {Object.entries(languages).map(([key, { flag, label }]) => (
            <button
              key={key}
              onClick={() => {
                setLanguage(key as "en" | "pt-BR");
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-1.5 hover:bg-zinc-800 transition-colors ${
                language === key ? "text-emerald-400" : ""
              }`}
            >
              {flag} {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
