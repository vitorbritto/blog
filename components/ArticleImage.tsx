"use client";

import { useState } from "react";
import Image from "next/image";
import { ArticleImagePlaceholder } from "./ArticleImagePlaceholder";

interface ArticleImageProps {
  src?: string | null;
  alt: string;
}

export function ArticleImage({ src, alt }: ArticleImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <ArticleImagePlaceholder />;
  }

  return (
    <Image
      src={src}
      alt={alt || "Article cover image"}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      onError={() => setHasError(true)}
    />
  );
}
