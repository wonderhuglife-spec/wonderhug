'use client'

import { Link, useParams } from '@/lib/navigation'
import { WEEK_GUIDES } from '@/data/weeks'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Typography'
import { EmptyState } from '@/components/ui/EmptyState'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { Media } from '@/components/media/Media'

export function WeekPage({ week: weekProp }: { week?: string }) {
  const params = useParams()
  const week = weekProp ?? String(params.week ?? '')
  const n = Number(week)
  const guide = WEEK_GUIDES.find((item) => item.week === n)
  const locale = currentLocale()
  if (!guide) {
    return (
      <Container className="py-20">
        <EmptyState title="Week not found" description="Weeks run from 1 to 40." />
      </Container>
    )
  }
  return (
    <>
      <Seo title={pick(guide.title, locale)} description={pick(guide.body, locale).slice(0, 150)} path={`/pregnancy/week/${guide.week}`} />
      <Container narrow className="py-16">
        <Media src="/images/placeholder-ai-program-womb.png" alt="placeholder-ai- Week guide atmosphere." className="mb-8 aspect-[16/9] w-full rounded-3xl object-cover" />
        <Heading as="h1">{pick(guide.title, locale)}</Heading>
        <p className="mt-6 text-lg leading-relaxed">{pick(guide.body, locale)}</p>
        <p className="mt-6 rounded-2xl bg-teal-soft p-5">{pick(guide.garbhFocus, locale)}</p>
        <p className="mt-8 text-xs text-slate-muted">{MEDICAL_DISCLAIMER}</p>
        <p className="mt-6 text-sm">
          {guide.week > 1 ? <Link to={`/pregnancy/week/${guide.week - 1}`}>Previous</Link> : null}
          {guide.week < 40 ? (
            <Link className="ml-4" to={`/pregnancy/week/${guide.week + 1}`}>
              Next
            </Link>
          ) : null}
        </p>
      </Container>
    </>
  )
}
