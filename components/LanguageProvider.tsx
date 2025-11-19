'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/lib/hooks/useLanguage'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()

  useEffect(() => {
    document.documentElement.lang = language === 'pt-BR' ? 'pt-BR' : 'en'
  }, [language])

  return <>{children}</>
}
