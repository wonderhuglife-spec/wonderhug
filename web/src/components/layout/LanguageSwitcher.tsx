'use client'

import { useTranslation } from 'react-i18next'
import { LOCALES } from '@/lib/constants'
import type { Locale } from '@/types/domain'

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n, t } = useTranslation()
  const current: Locale = i18n.language?.startsWith('te') ? 'te' : 'en'

  return (
    <div className="inline-flex rounded-full border border-line p-0.5" role="group" aria-label={t('nav.language')}>
      {LOCALES.map((locale) => (
        <button
          key={locale.id}
          type="button"
          aria-pressed={current === locale.id}
          className={
            current === locale.id
              ? 'min-h-11 rounded-full bg-navy px-3 text-xs font-semibold text-white'
              : 'min-h-11 rounded-full px-3 text-xs font-medium text-slate'
          }
          onClick={() => {
            document.cookie = `wonderhug.locale=${locale.id};path=/;max-age=31536000;SameSite=Lax`
            void i18n.changeLanguage(locale.id)
          }}
        >
          {compact ? (locale.id === 'te' ? 'తెలుగు' : 'EN') : locale.native}
        </button>
      ))}
    </div>
  )
}
