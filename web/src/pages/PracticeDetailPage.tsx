import { useParams } from 'react-router-dom'
import { PRACTICES } from '@/data/practices'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Typography'
import { EmptyState } from '@/components/ui/EmptyState'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'

export function PracticeDetailPage() {
  const { slug = '' } = useParams()
  const practice = PRACTICES.find((item) => item.slug === slug)
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
        <Heading as="h1">{pick(practice.title, locale)}</Heading>
        <p className="mt-6 text-lg leading-relaxed text-slate">{pick(practice.description, locale)}</p>
        <p className="mt-6 text-sm">Official audio/video files are part of purchased packs. This page is the guided script you can use today.</p>
      </Container>
    </>
  )
}
