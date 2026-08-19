'use client'

import { useParams } from '@/lib/navigation'
import { useCatalog } from '@/hooks/useCatalog'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { PageHero } from '@/components/editorial/PageHero'

import type { Practice } from '@/types/domain'

export function PracticeDetailPage({ slug: slugProp, practice: practiceProp }: { slug?: string; practice?: Practice }) {
  const params = useParams()
  const { practices } = useCatalog()
  const slug = slugProp ?? String(params.slug ?? '')
  const practice = practiceProp ?? practices.find((item) => item.slug === slug)
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
        src="/images/photo-garbh-rest.png"
        alt="Practice still life."
      />
      <Container narrow className="py-16">
        <p className="text-lg leading-relaxed text-slate">Official audio/video files are part of purchased packs. This page is the guided script you can use today.</p>
      </Container>
    </>
  )
}
