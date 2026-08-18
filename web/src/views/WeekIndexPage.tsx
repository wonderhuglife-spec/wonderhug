'use client'

import { Link } from '@/lib/navigation'
import { WEEK_GUIDES } from '@/data/weeks'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { PageHero } from '@/components/editorial/PageHero'
import { Reveal } from '@/components/motion/Reveal'

export function WeekIndexPage() {
  const locale = currentLocale()
  return (
    <>
      <Seo title="Week-by-week" description="Forty educational week notes." path="/pregnancy/week-by-week" />
      <PageHero
        kicker="Pregnancy"
        title={locale === 'te' ? 'వారం వారం' : 'Week by week'}
        lede="Educational notes. Not a scan report."
        src="/images/placeholder-ai-program-womb.png"
        alt="A pregnant woman resting in a home courtyard for week-by-week notes."
      />
      <Container className="py-16">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WEEK_GUIDES.map((week, index) => (
            <Reveal key={week.week} delay={Math.min(index, 8) * 0.02}>
              <li>
                <Link
                  to={`/pregnancy/week/${week.week}`}
                  className="block min-h-14 rounded-2xl border border-line bg-white px-4 py-4 transition hover:-translate-y-0.5 hover:border-teal hover:shadow-lift"
                >
                  <span className="text-xs uppercase tracking-[0.14em] text-teal-dark">Week {week.week}</span>
                  <span className="mt-1 block text-sm text-ink">{pick(week.title, locale)}</span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </>
  )
}
