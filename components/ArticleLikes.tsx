"use client";

import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface ArticleLikesProps {
  articleId: string;
}

export function ArticleLikes({ articleId }: ArticleLikesProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  // Carrega o estado inicial dos likes e verifica se o usuário já curtiu
  useEffect(() => {
    const loadLikes = async () => {
      // Busca o total de likes
      const { data: likesData } = await supabase
        .from("article_likes")
        .select("likes")
        .eq("article_id", articleId)
        .single();

      if (likesData) {
        setLikes(likesData.likes);
      }

      // Verifica se o usuário atual já curtiu
      const hasLiked = localStorage.getItem(`article-liked-${articleId}`);
      if (hasLiked) {
        setHasLiked(true);
      }
    };

    loadLikes();
  }, [articleId]);

  const handleLike = async () => {
    if (hasLiked) return;

    try {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setHasLiked(true);
      setParticles((prev) => [...prev, Date.now()]);

      // Atualiza no Supabase usando upsert
      const { error } = await supabase.from("article_likes").upsert(
        {
          article_id: articleId,
          likes: newLikes,
        },
        {
          onConflict: "article_id",
        }
      );

      if (error) throw error;

      // Marca que o usuário atual já curtiu
      localStorage.setItem(`article-liked-${articleId}`, "true");
    } catch (error) {
      console.error("Error updating likes:", error);
      // Reverte o estado em caso de erro
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className={`group flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors ${
          hasLiked ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        <ThumbsUp
          className={`w-5 h-5 transition-all ${
            hasLiked
              ? "text-emerald-400 scale-110"
              : "text-emerald-400 group-hover:scale-110"
          }`}
        />
        <span className="text-sm font-medium text-zinc-400">{likes}</span>
      </button>

      <AnimatePresence>
        {particles.map((id) => (
          <motion.div
            key={id}
            className="absolute -top-4 left-8 text-emerald-400 pointer-events-none"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -20, opacity: 0 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
              setParticles((prev) =>
                prev.filter((particleId) => particleId !== id)
              );
            }}
          >
            +1
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
