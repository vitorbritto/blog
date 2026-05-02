'use client'

import Link from 'next/link'
import * as Tooltip from '@radix-ui/react-tooltip'
import { LanguageSelector } from './LanguageSelector'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { socialLinks } from '@/config/socialLinks'

export function Header() {
  const { t } = useTranslation()
  return (
    <header className="border-b border-zinc-800/50 bg-[#161718] sticky top-0 z-10">
      <nav className="mx-auto px-10 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-mono tracking-tight transition-colors group flex flex-col items-start gap-0.5"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="text-xl font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              vitorbritto
            </span>
            <span className="text-xs text-zinc-500">{t('nav.tagline')}</span>
          </Link>
          <div className="flex items-center gap-12">
            <Tooltip.Provider delayDuration={150}>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Tooltip.Root key={href}>
                    <Tooltip.Trigger asChild>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="flex h-9 w-9 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-emerald-400 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="bottom"
                        sideOffset={8}
                        className="z-50 rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-200 shadow-lg"
                      >
                        {label}
                        <Tooltip.Arrow className="fill-zinc-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                ))}
              </div>
            </Tooltip.Provider>
            <LanguageSelector />
          </div>
        </div>
      </nav>
    </header>
  )
}
