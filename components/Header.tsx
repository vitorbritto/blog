'use client'

import Link from 'next/link'
import { LanguageSelector } from './LanguageSelector'

export function Header() {
  return (
    <header className="border-b border-zinc-800/50 bg-[#161718] sticky top-0 z-10">
      <nav className="mx-auto px-10 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-base text-zinc-100 hover:text-emerald-400 transition-colors tracking-tight"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            vitorbritto - carreira, programação e inteligencia artificial
          </Link>
          <LanguageSelector />
        </div>
      </nav>
    </header>
  )
}
