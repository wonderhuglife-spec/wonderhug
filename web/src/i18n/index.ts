'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/i18n/en.json'
import type { Locale } from '@/types/domain'

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: { en: { translation: en } },
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en'],
    interpolation: { escapeValue: false },
  })
}

export function currentLocale(): Locale {
  return 'en'
}

export { i18n }
