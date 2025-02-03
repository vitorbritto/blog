"use client";

import { motion } from "framer-motion";

export function ArticleImagePlaceholder() {
  return (
    <div className="w-full h-full min-h-[225px] bg-zinc-800/50 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.svg
          className="w-16 h-16 text-zinc-700"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <motion.path
            d="M21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19Z"
            stroke="currentColor"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.path
            d="M3 16L8 11C8.62791 10.3721 9.84208 10.3721 10.4699 11L15 15.5M15 15.5L18 12.5C18.6279 11.8721 19.8421 11.8721 20.4699 12.5L21 13M15 15.5L17 17.5"
            stroke="currentColor"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
          />
          <motion.circle
            cx="8"
            cy="8"
            r="2"
            stroke="currentColor"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />
        </motion.svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
    </div>
  );
}
