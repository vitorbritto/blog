"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileQuestion } from "lucide-react";

interface NotFoundProps {
  title: string;
  description: string;
  backTo: {
    href: string;
    label: string;
  };
}

export function NotFound({ title, description, backTo }: NotFoundProps) {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md text-center"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="w-24 h-24 rounded-full bg-zinc-900/50 flex items-center justify-center"
          >
            <FileQuestion className="w-12 h-12 text-emerald-400" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-zinc-400 mb-8">{description}</p>

          <Link
            href={backTo.href}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span className="border-b border-emerald-400/0 hover:border-emerald-400 transition-colors">
              {backTo.label}
            </span>
            <span className="text-xl">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
