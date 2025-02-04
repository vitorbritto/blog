"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="px-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6 max-w-3xl pt-6 pb-24">
          <h1
            className={cn(
              "text-6xl font-bold leading-tight",
              "bg-gradient-to-r from-white via-emerald-400 to-emerald-600",
              "bg-clip-text text-transparent",
              "animate-gradient-x bg-[length:200%_auto]"
            )}
          >
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            {t("hero.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
