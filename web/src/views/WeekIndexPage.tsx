'use client'

import { Link } from '@/lib/navigation'
import { WEEK_GUIDES } from '@/data/weeks'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'

export function WeekIndexPage() {
  const locale = currentLocale()
  return (
    <>
      <Seo title="Week-by-week" description="Forty educational week notes." path="/pregnancy/week-by-week" />
      <Container className="py-16">
        <Heading as="h1">{locale === 'te' ? 'వారం వారం' : 'Week by week'}</Heading>
        <Text muted className="mt-4 max-w-xl">
          Educational notes. Not a scan report.
        </Text>
        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WEEK_GUIDES.map((week) => (
            <li key={week.week}>
              <Link to={`/pregnancy/week/${week.week}`} className="block min-h-14 rounded-xl border border-line px-4 py-3 hover:border-teal">
                {pick(week.title, locale)}
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </>
  )
}
