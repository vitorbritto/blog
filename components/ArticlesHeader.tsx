"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/hooks/useTranslation";

export function ArticlesHeader() {
  const { t } = useTranslation();

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold">{t("common.articles")}</h1>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{t("common.back")}</span>
        </Link>
      </div>
      <p className="text-lg text-zinc-400 max-w-2xl">
        {t("articles.description")}
      </p>
    </div>
  );
}
