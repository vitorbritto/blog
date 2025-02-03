import Link from "next/link";
import Image from "next/image";
import { LanguageSelector } from "./LanguageSelector";
import { SocialLinks } from "./SocialLinks";

export function Header() {
  return (
    <header className="fixed w-full z-10 bg-zinc-950/80 backdrop-blur-sm">
      <nav className="flex items-center justify-between py-2 max-w-6xl mx-auto">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Blog Logo"
            width={64}
            height={64}
            className="w-12 h-12"
          />
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/articles"
            className="cursor-pointer hover:text-emerald-400 transition-colors active:scale-95"
          >
            Artigos
          </Link>
          <Link
            href="/tracks"
            className="cursor-pointer hover:text-emerald-400 transition-colors active:scale-95"
          >
            Séries
          </Link>
          <Link
            href="/categories"
            className="cursor-pointer hover:text-emerald-400 transition-colors active:scale-95"
          >
            Categorias
          </Link>

          <div className="h-5 w-px bg-zinc-800" />

          <SocialLinks />

          <div className="h-5 w-px bg-zinc-800" />

          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
}
