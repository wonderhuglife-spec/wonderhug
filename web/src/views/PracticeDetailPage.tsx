'use client'

import { useParams } from '@/lib/navigation'
import { PRACTICES } from '@/data/practices'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { PageHero } from '@/components/editorial/PageHero'

import type { Practice } from '@/types/domain'

export function PracticeDetailPage({ slug: slugProp, practice: practiceProp }: { slug?: string; practice?: Practice }) {
  const params = useParams()
  const slug = slugProp ?? String(params.slug ?? '')
  const practice = practiceProp ?? PRACTICES.find((item) => item.slug === slug)
  const locale = currentLocale()
  if (!practice) {
    return (
      <Container className="py-20">
        <EmptyState title="Practice not found" description="" />
      </Container>
    )
  }
  return (
    <>
      <Seo title={pick(practice.title, locale)} description={pick(practice.description, locale)} path={`/practices/${practice.slug}`} />
      <PageHero
        kicker={`${practice.durationMinutes} min · ${practice.mediaType}`}
        title={pick(practice.title, locale)}
        lede={pick(practice.description, locale)}
        src="/images/placeholder-ai-practice.png"
        alt="Quiet Garbh Sanskar rest with music and a lamp at home."
      />
      <Container narrow className="py-16">
        <p className="text-lg leading-relaxed text-slate">Official audio/video files are part of purchased packs. This page is the guided script you can use today.</p>
      </Container>
    </>
  )
}
