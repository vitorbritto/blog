"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/hooks/useTranslation";

export function Hero() {
  const { t } = useTranslation();

  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    x: 9 + i * 13,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 5,
  }));

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex items-center justify-between">
        <div className="max-w-2xl">
          <motion.h1
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("hero.title1")} <br />
            <span className="text-emerald-400">{t("hero.title2")}</span>
          </motion.h1>
          <motion.p
            className="text-xl text-zinc-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("hero.description")}
          </motion.p>
        </div>

        <motion.div
          className="hidden lg:block relative w-[600px] h-[400px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-[3px] h-40 bg-gradient-to-b from-emerald-400/0 via-emerald-400/40 to-emerald-400/0"
              style={{ left: `${particle.x}%` }}
              animate={{
                y: ["-20%", "120%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                y: {
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: particle.delay,
                },
                opacity: {
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: particle.delay,
                  times: [0, 0.5, 1],
                },
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
