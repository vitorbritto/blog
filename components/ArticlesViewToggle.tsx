"use client";

import { LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";

interface ArticlesViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ArticlesViewToggle({
  view,
  onViewChange,
}: ArticlesViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-lg">
      <button
        onClick={() => onViewChange("grid")}
        className={`p-2 rounded-md transition-colors relative ${
          view === "grid"
            ? "text-emerald-400"
            : "text-zinc-400 hover:text-zinc-300"
        }`}
      >
        {view === "grid" && (
          <motion.div
            layoutId="viewToggle"
            className="absolute inset-0 bg-emerald-400/10 rounded-md -z-10"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <LayoutGrid className="w-5 h-5" />
      </button>

      <button
        onClick={() => onViewChange("list")}
        className={`p-2 rounded-md transition-colors relative ${
          view === "list"
            ? "text-emerald-400"
            : "text-zinc-400 hover:text-zinc-300"
        }`}
      >
        {view === "list" && (
          <motion.div
            layoutId="viewToggle"
            className="absolute inset-0 bg-emerald-400/10 rounded-md -z-10"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <List className="w-5 h-5" />
      </button>
    </div>
  );
}
