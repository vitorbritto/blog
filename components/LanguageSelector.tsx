"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("pt");

  const languages = {
    pt: { flag: "🇧🇷", label: "PT" },
    en: { flag: "🇺🇸", label: "EN" },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-sm hover:border-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
      >
        {languages[selected as keyof typeof languages].flag}{" "}
        {languages[selected as keyof typeof languages].label}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded shadow-lg overflow-hidden">
          {Object.entries(languages).map(([key, { flag, label }]) => (
            <button
              key={key}
              onClick={() => {
                setSelected(key);
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-1.5 hover:bg-zinc-800 transition-colors ${
                selected === key ? "text-emerald-400" : ""
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
