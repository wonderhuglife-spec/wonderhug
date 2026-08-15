import { useParams } from 'react-router-dom'
import { expertsService } from '@/services/experts'
import { useAsyncResource } from '@/hooks/useAsyncResource'
import { Seo } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Heading } from '@/components/ui/Typography'
import { Loading } from '@/components/ui/Loading'
import { ButtonLink } from '@/components/ui/Button'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'

export function ExpertProfilePage() {
  const { slug = '' } = useParams()
  const locale = currentLocale()
  const { status, data, error, retry } = useAsyncResource(() => expertsService.getExpertBySlug(slug), slug)

  if (status === 'loading') {
    return (
      <Container className="py-20">
        <Loading />
      </Container>
    )
  }
  if (status === 'error') {
    return (
      <Container className="py-20">
        <ErrorState message={error ?? ''} onRetry={retry} />
      </Container>
    )
  }
  if (status === 'empty' || !data) {
    return (
      <Container className="py-20">
        <EmptyState title="Profile not found" description="" />
      </Container>
    )
  }

  return (
    <>
      <Seo title={data.name} description={pick(data.bio, locale)} path={`/experts/${data.slug}`} />
      <Container className="grid gap-10 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <img src={data.photo} alt="" className="aspect-[4/5] w-full rounded-2xl bg-canvas object-cover" />
        </div>
        <div className="lg:col-span-8">
          <Badge>{data.speciality}</Badge>
          <Heading as="h1" className="mt-4">
            {data.name}
          </Heading>
          <p className="mt-3 text-slate">{data.qualification}</p>
          <p className="mt-6 max-w-2xl leading-relaxed">{pick(data.bio, locale)}</p>
          <p className="mt-4 text-sm">Languages: {data.languages.join(', ')}</p>
          <p className="mt-2 text-sm">Availability: {data.availability}</p>
          <ButtonLink to={data.bookingUrl} className="mt-8" variant="teal">
            Book via WhatsApp
          </ButtonLink>
        </div>
      </Container>
    </>
  )
}
