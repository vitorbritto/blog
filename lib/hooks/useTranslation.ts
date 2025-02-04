import { useLanguage } from "./useLanguage";
import en from "../translations/en.json";
import ptBR from "../translations/pt-BR.json";

const translations = {
  en,
  "pt-BR": ptBR,
} as const;

export function useTranslation() {
  const { language } = useLanguage();

  function t(key: string): string {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  }

  return { t };
}
