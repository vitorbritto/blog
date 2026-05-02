"use client";

import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Check, Globe2 } from "lucide-react";
import { useLanguage } from "@/lib/hooks/useLanguage";

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const languages = {
    "pt-BR": { flag: "🇧🇷", label: "Português" },
    en: { flag: "🇺🇸", label: "English" },
  } as const;
  const tooltipLabel = language === "pt-BR" ? "Idioma" : "Language";

  return (
    <div className="relative">
      <Tooltip.Provider delayDuration={150}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Select language"
              aria-expanded={isOpen}
              aria-haspopup="menu"
              className="flex h-9 w-9 items-center justify-center cursor-pointer bg-zinc-900 border border-zinc-800 rounded text-zinc-300 hover:text-emerald-400 hover:border-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            >
              <Globe2 className="w-4 h-4" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="bottom"
              sideOffset={8}
              className="z-50 rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-200 shadow-lg"
            >
              {tooltipLabel}
              <Tooltip.Arrow className="fill-zinc-900" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-40 bg-zinc-900 border border-zinc-800 rounded shadow-lg overflow-hidden"
        >
          {Object.entries(languages).map(([key, { flag, label }]) => (
            <button
              key={key}
              type="button"
              role="menuitemradio"
              aria-checked={language === key}
              onClick={() => {
                setLanguage(key as "en" | "pt-BR");
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-zinc-800 transition-colors ${
                language === key ? "text-emerald-400" : ""
              }`}
            >
              <span className="flex-1 text-left">
                {flag} {label}
              </span>
              {language === key && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
