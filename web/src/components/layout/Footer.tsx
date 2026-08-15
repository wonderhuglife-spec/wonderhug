'use client'

import { Link } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/brand/Logo'
import { MEDICAL_DISCLAIMER, MEDICAL_DISCLAIMER_TE } from '@/lib/constants'
import { currentLocale } from '@/i18n'
import { whatsappUrl } from '@/services/whatsapp'

const explore = [
  { to: '/pregnancy', key: 'nav.pregnancy' },
  { to: '/garbh-sanskar', key: 'nav.garbh' },
  { to: '/programs', key: 'nav.programs' },
  { to: '/shop', key: 'nav.shop' },
  { to: '/community', key: 'nav.community' },
  { to: '/blog', key: 'nav.blog' },
]

const legal = [
  { to: '/privacy', key: 'Privacy' },
  { to: '/terms', key: 'Terms' },
  { to: '/medical-disclaimer', key: 'Disclaimer' },
]

export function Footer() {
  const { t } = useTranslation()
  const locale = currentLocale()
  return (
    <footer className="mt-24 border-t border-line bg-canvas">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate">
            {locale === 'te' ? MEDICAL_DISCLAIMER_TE : MEDICAL_DISCLAIMER}
          </p>
          <a href={whatsappUrl()} className="mt-4 inline-block text-sm font-medium text-teal-dark">
            {t('cta.whatsapp')}
          </a>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">{t('footer.explore')}</p>
          <ul className="mt-4 space-y-2">
            {explore.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-ink hover:text-teal-dark">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">{t('footer.legal')}</p>
          <ul className="mt-4 space-y-2">
            {legal.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-ink hover:text-teal-dark">
                  {item.key}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-slate-muted">
        © {new Date().getFullYear()} WonderHug.Life
      </div>
    </footer>
  )
}
