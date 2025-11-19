'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LanguageSelector } from './LanguageSelector'

export function Header() {
  return (
    <header className="border-b border-zinc-800/50 bg-zinc-950/90 backdrop-blur-sm sticky top-0 z-10">
      <nav className="mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold text-zinc-100 hover:text-emerald-400 transition-colors"
          >
            <Image src="/logo.png" alt="Vitor Britto" width={48} height={48} />
          </Link>
          <LanguageSelector />
        </div>
      </nav>
    </header>
  )
}
