'use client'

import { PROGRAMS } from '@/data/programs'
import { FEATURE_ECOSYSTEM } from '@/data/features'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Link } from '@/lib/navigation'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr } from '@/lib/constants'
import { useTranslation } from 'react-i18next'

export function FeatureEcosystem() {
  const locale = currentLocale()
  const { t } = useTranslation()
  return (
    <section className="py-20">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple">{t('home.ecosystemKicker')}</p>
        <Heading as="h2" className="mt-3">
          {t('home.ecosystemTitle')}
        </Heading>
        <Text muted className="mt-4 max-w-2xl text-lg">
          {t('home.ecosystemBody')}
        </Text>
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
              className="group overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-teal-soft to-white p-6 shadow-sm transition hover:shadow-lift"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">{program.durationWeeks} {t('home.weeks')}</p>
              <p className="mt-3 font-serif text-2xl text-ink group-hover:text-purple">{pick(program.name, locale)}</p>
              <p className="mt-2 text-sm text-slate">{pick(program.summary, locale)}</p>
              <p className="mt-6 text-lg font-semibold text-navy">{formatInr(program.pricePaise, locale)}</p>
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
