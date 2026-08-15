import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '@/i18n/en.json'
import te from '@/i18n/te.json'
import type { Locale } from '@/types/domain'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      te: { translation: te },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'te'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'querystring', 'navigator'],
      lookupLocalStorage: 'wonderhug.locale',
      caches: ['localStorage'],
    },
  })

export function currentLocale(): Locale {
  return i18n.language?.startsWith('te') ? 'te' : 'en'
}

export { i18n }
