"use client";

import { Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado!");
    } catch (err) {
      toast.error("Erro ao copiar link");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 transition-colors"
      >
        <Twitter className="w-5 h-5" />
        <span className="sr-only">Compartilhar no Twitter</span>
      </a>
      <a
        href={shareUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 transition-colors"
      >
        <Linkedin className="w-5 h-5" />
        <span className="sr-only">Compartilhar no LinkedIn</span>
      </a>
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 transition-colors"
      >
        <LinkIcon className="w-5 h-5" />
        <span className="sr-only">Copiar link</span>
      </button>
    </div>
  );
}
