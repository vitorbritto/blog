import Link from "next/link";
import { getAllTracks } from "@/lib/content";
import {
  Computer,
  Terminal,
  Network,
  Cloud,
  LayoutDashboard,
  Layers,
  Wallpaper,
} from "lucide-react";

export async function Tracks() {
  const tracks = await getAllTracks();

  const icons = {
    Computer,
    Terminal,
    Network,
    Cloud,
    LayoutDashboard,
    Layers,
    Wallpaper,
  };

  return (
    <section id="tracks" className="max-w-6xl mx-auto mb-32">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl font-bold">Trilhas disponíveis</h2>
        <Link
          href="/tracks"
          className="group flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Ver todas
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tracks
          .filter((track) => track.featured)
          .map((track) => {
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
                <h3 className="mb-2 text-lg font-bold group-hover:text-emerald-400 transition-colors">
                  {track.name}
                </h3>
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
                  <span className="text-sm text-zinc-400">artigos</span>
                </div>
                <div className="absolute inset-0 border border-emerald-400/0 group-hover:border-emerald-400/50 rounded-lg transition-colors duration-300" />
              </Link>
            );
          })}
      </div>
    </section>
  );
}
