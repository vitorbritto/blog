'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Menu, SlidersHorizontal, X } from 'lucide-react'
import { LanguageSelector } from './LanguageSelector'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { socialLinks } from '@/config/socialLinks'

const MOBILE_FILTERS_EVENT = 'blog:toggle-mobile-filters'

export function Header() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const showMobileFilters = pathname === '/'

  useEffect(() => {
    if (!isMenuOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  function toggleMobileFilters() {
    window.dispatchEvent(new CustomEvent(MOBILE_FILTERS_EVENT))
  }

  return (
    <header className="border-b border-zinc-800/50 bg-[#161718] sticky top-0 z-30">
      <nav className="mx-auto px-4 py-3 sm:px-6 lg:px-10 lg:py-4">
        <div className="grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-2 lg:flex lg:justify-between">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label={t('nav.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation-drawer"
            className="flex h-11 w-11 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-emerald-400 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>

          <Link
            href="/"
            className="group flex min-w-0 flex-col items-center gap-0.5 font-mono tracking-tight transition-colors lg:items-start"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="text-lg font-semibold text-zinc-100 transition-colors group-hover:text-emerald-400 sm:text-xl">
              vitorbritto
            </span>
            <span className="max-w-full truncate text-center text-[11px] text-zinc-500 sm:text-xs">
              {t('nav.tagline')}
            </span>
          </Link>

          <button
            type="button"
            onClick={toggleMobileFilters}
            disabled={!showMobileFilters}
            aria-hidden={!showMobileFilters}
            aria-label={t('filters.open')}
            className={`flex h-11 w-11 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-emerald-400 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent lg:hidden ${
              showMobileFilters ? '' : 'invisible'
            }`}
          >
            <SlidersHorizontal className="h-5 w-5" aria-hidden />
          </button>

          <div className="hidden items-center gap-12 lg:flex">
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

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label={t('nav.closeMenu')}
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            className="absolute left-0 top-0 flex h-full w-[min(20rem,calc(100vw-3rem))] flex-col border-r border-zinc-800 bg-[#161718] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
              <div>
                <p
                  id="mobile-navigation-title"
                  className="font-mono text-sm font-semibold text-zinc-100"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  vitorbritto
                </p>
                <p className="text-xs text-zinc-500">{t('nav.tagline')}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label={t('nav.closeMenu')}
                className="flex h-10 w-10 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-emerald-400 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-4 py-6">
              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {t('common.connect')}
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-emerald-400 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      <span className="truncate">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {t('nav.language')}
                </h2>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
