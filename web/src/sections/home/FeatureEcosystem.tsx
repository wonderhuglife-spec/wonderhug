'use client'

import { PROGRAMS } from '@/data/programs'
import { FEATURE_ECOSYSTEM } from '@/data/features'
import { Container } from '@/components/ui/Container'
import { Link } from '@/lib/navigation'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr } from '@/lib/constants'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { SectionHeader } from '@/components/editorial/SectionHeader'
import { useTranslation } from 'react-i18next'

export function FeatureEcosystem() {
  const locale = currentLocale()
  const { t } = useTranslation()
  return (
    <section className="py-20">
      <Container>
        <SectionHeader kicker={t('home.ecosystemKicker')} title={t('home.ecosystemTitle')} lede={t('home.ecosystemBody')} />
        <ol className="mt-12 grid gap-3 md:grid-cols-2">
          {FEATURE_ECOSYSTEM.map((item, index) => (
            <li key={item.id}>
              <Link to={item.href} className="flex gap-4 rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-purple/25 hover:shadow-lift">
                <span className="font-serif text-2xl text-purple">{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block font-semibold text-ink">{item.title}</span>
                  <span className="mt-1 block text-sm text-slate">{item.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((program) => (
            <Link
              key={program.id}
              to={`/programs/${program.slug}`}
              className="group overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-teal-soft to-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <HoverMedia src={program.coverImage} alt={program.coverImageAlt} className="aspect-[16/10] w-full" />
              <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">{program.durationWeeks} {t('home.weeks')}</p>
              <p className="mt-3 font-serif text-2xl text-ink group-hover:text-purple">{pick(program.name, locale)}</p>
              <p className="mt-2 text-sm text-slate">{pick(program.summary, locale)}</p>
              <p className="mt-6 text-lg font-semibold text-navy">{formatInr(program.pricePaise, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-8">
          <Link to="/shop" className="text-sm font-medium text-purple underline-offset-4 hover:underline">
            {t('home.browseShop')}
          </Link>
        </p>
      </Container>
    </section>
  )
}
