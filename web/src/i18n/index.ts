'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '@/i18n/en.json'
import te from '@/i18n/te.json'
import type { Locale } from '@/types/domain'

if (!i18n.isInitialized) {
  const browser = typeof window !== 'undefined'
  if (browser) i18n.use(LanguageDetector)
  void i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      te: { translation: te },
    },
    lng: browser ? undefined : 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'te'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'cookie', 'querystring', 'navigator'],
      lookupLocalStorage: 'wonderhug.locale',
      lookupCookie: 'wonderhug.locale',
      caches: ['localStorage', 'cookie'],
    },
  })
}

export function currentLocale(): Locale {
  return i18n.language?.startsWith('te') ? 'te' : 'en'
}

export { i18n }
