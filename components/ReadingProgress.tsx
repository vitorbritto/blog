"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const element = document.documentElement;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const scrolled = element.scrollTop;
      const progress = (scrolled / totalHeight) * 100;
      setProgress(progress);
    }

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-zinc-800 z-50">
      <div
        className="h-full bg-emerald-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
