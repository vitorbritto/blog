import { useLanguage } from './useLanguage'
import en from '../translations/en.json'
import ptBR from '../translations/pt-BR.json'

const translations = {
  en,
  'pt-BR': ptBR
} as const

// Mapeamento entre slugs de categorias e chaves de tradução
const categorySlugToTranslationKey: Record<string, string> = {
  'front-end': 'frontend',
  'back-end': 'backend',
  'architecture': 'architecture',
  'devops': 'devops',
  'databases': 'databases',
  'security': 'security',
  'performance': 'performance',
  'algorithms': 'algorithms'
}

export function useTranslation() {
  const { language } = useLanguage()

  function t(key: string): string {
    const keys = key.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  function translateCategory(slug: string): string {
    const translationKey = categorySlugToTranslationKey[slug] || slug
    return t(`categories.${translationKey}.name`) || slug
  }

  return { t, translateCategory }
}
