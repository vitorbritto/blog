"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { LanguageSelector } from "./LanguageSelector";
import { SocialLinks } from "./SocialLinks";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="fixed left-1/2 -translate-x-1/2 w-[95%] max-w-full mx-auto px-6 top-6 z-10 bg-zinc-950/80 rounded-full border border-zinc-800 backdrop-blur-md">
      <nav className="flex items-center justify-between py-2">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="w-12 h-12"
          />
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/articles"
              className="text-sm hover:text-emerald-400 transition-colors"
            >
              {t("nav.articles")}
            </Link>
            <Link
              href="/tracks"
              className="text-sm hover:text-emerald-400 transition-colors"
            >
              {t("nav.tracks")}
            </Link>
            <Link
              href="/categories"
              className="text-sm hover:text-emerald-400 transition-colors"
            >
              {t("nav.categories")}
            </Link>
          </div>

          <div className="h-5 w-px bg-zinc-800" />

          <SocialLinks />

          <div className="h-5 w-px bg-zinc-800" />

          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
}
