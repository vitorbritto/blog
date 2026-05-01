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
            className="font-mono text-base tracking-tight transition-colors group"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              vitorbritto
            </span>
            <span className="text-zinc-500"> - carreira, programação e inteligencia artificial</span>
          </Link>
          <LanguageSelector />
        </div>
      </nav>
    </header>
  )
}
