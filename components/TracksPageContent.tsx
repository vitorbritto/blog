"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Computer,
  Terminal,
  Network,
  Cloud,
  LayoutDashboard,
  Layers,
  Wallpaper,
} from "lucide-react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { Track } from "@/lib/types/content";

const icons = {
  Computer,
  Terminal,
  Network,
  Cloud,
  LayoutDashboard,
  Layers,
  Wallpaper,
};

interface TracksContentProps {
  tracks: Track[];
}

export function TracksPageContent({ tracks }: TracksContentProps) {
  const { t } = useTranslation();

  return (
    <main className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">{t("tracks.title")}</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("common.back")}</span>
          </Link>
        </div>
        <p className="text-lg text-zinc-400 max-w-2xl">
          {t("tracks.description")}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tracks?.map((track) => {
          const Icon = icons[track.icon as keyof typeof icons];
          return (
            <Link
              key={track.slug}
              href={`/tracks/${track.slug}`}
              className="group relative overflow-hidden rounded-lg bg-zinc-900 p-6 hover:bg-zinc-800/80 transition-all duration-300"
            >
              <div className="mb-4 inline-flex rounded-lg bg-emerald-400/10 p-3">
                <Icon className="h-6 w-6 text-emerald-400" />
              </div>
              <h2 className="mb-2 text-lg font-bold group-hover:text-emerald-400 transition-colors">
                {t(`tracks.${track.slug}.title`)}
              </h2>
              <p className="text-sm text-zinc-400 mb-6">
                {t(`tracks.${track.slug}.description`)}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {track.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 rounded-full bg-zinc-800/50 text-xs text-zinc-400"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-emerald-400">
                  {track.articles.length}
                </span>
                <span className="text-sm text-zinc-400">
                  {t("common.articles")}
                </span>
              </div>
              <div className="absolute inset-0 border border-emerald-400/0 group-hover:border-emerald-400/50 rounded-lg transition-colors duration-300" />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
