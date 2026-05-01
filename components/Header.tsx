'use client'

import Link from 'next/link'
import { LanguageSelector } from './LanguageSelector'
import { useTranslation } from '@/lib/hooks/useTranslation'

export function Header() {
  const { t } = useTranslation()
  return (
    <header className="border-b border-zinc-800/50 bg-[#161718] sticky top-0 z-10">
      <nav className="mx-auto px-10 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-mono tracking-tight transition-colors group flex items-baseline gap-2"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="text-xl font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              vitorbritto
            </span>
            <span className="text-xs italic text-zinc-500">— {t('nav.tagline')}</span>
          </Link>
          <LanguageSelector />
        </div>
      </nav>
    </header>
  )
}
