'use client'

import { useParams } from '@/lib/navigation'
import { PRACTICES } from '@/data/practices'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Typography'
import { EmptyState } from '@/components/ui/EmptyState'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { Media } from '@/components/media/Media'

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
      <Container narrow className="py-16">
        <Media src="/images/placeholder-ai-practice.png" alt="placeholder-ai- Practice still life." className="mb-8 aspect-[16/9] w-full rounded-3xl object-cover" />
        <Heading as="h1">{pick(practice.title, locale)}</Heading>
        <p className="mt-6 text-lg leading-relaxed text-slate">{pick(practice.description, locale)}</p>
        <p className="mt-6 text-sm">Official audio/video files are part of purchased packs. This page is the guided script you can use today.</p>
      </Container>
    </>
  )
}
