"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArticleImage } from "./ArticleImage";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  readTime: number;
}

interface Track {
  id: string;
  title: string;
  description: string;
  articles: Article[];
}

interface TrackArticlesProps {
  tracks: Track[];
}

export function TrackArticles({ tracks }: TrackArticlesProps) {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-16 text-center">Séries</h2>

        <div className="space-y-32">
          {tracks.map((track, trackIndex) => (
            <div key={track.id} className="relative">
              {/* Track Header */}
              <div className="sticky top-24 z-10 bg-zinc-950/80 backdrop-blur-sm py-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-2xl"
                >
                  <h3 className="text-2xl font-bold mb-4 text-emerald-400">
                    {track.title}
                  </h3>
                  <p className="text-zinc-400">{track.description}</p>
                </motion.div>
              </div>

              {/* Articles List */}
              <div className="space-y-8">
                {track.articles.map((article, index) => (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/articles/${article.slug}`}
                      className="group grid grid-cols-[auto,1fr] gap-8 items-start"
                    >
                      {/* Article Number */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 text-emerald-400 font-mono text-lg font-bold group-hover:bg-emerald-400 group-hover:text-zinc-900 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="grid sm:grid-cols-[1fr,280px] gap-6">
                        {/* Article Info */}
                        <div className="space-y-3">
                          <h4 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-zinc-400 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <span>{article.readTime} min read</span>
                          </div>
                        </div>

                        {/* Article Image */}
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800/50">
                          <ArticleImage
                            src={article.coverImage}
                            alt={article.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Track Separator */}
              {trackIndex < tracks.length - 1 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
