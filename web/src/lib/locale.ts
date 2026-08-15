import type { Locale, LocalizedText } from '@/types/domain'

export function pick(text: LocalizedText, locale: Locale): string {
  return locale === 'te' ? text.te : text.en
}

export function loc(en: string, te: string): LocalizedText {
  return { en, te }
}
