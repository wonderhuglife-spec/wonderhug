import { useEffect } from 'react'
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
import { track } from '@/services/analytics'

export function ExpertProfilePage() {
  const { slug = '' } = useParams()
  const { status, data, error, retry } = useAsyncResource(() => expertsService.getExpertBySlug(slug), slug)

  useEffect(() => {
    if (data) track('expert_opened', { slug: data.slug, view: 'profile' })
  }, [data])

  if (status === 'loading') {
    return (
      <Container className="py-20">
        <Loading label="Loading profile" />
      </Container>
    )
  }
  if (status === 'error') {
    return (
      <Container className="py-20">
        <ErrorState message={error ?? 'Could not load profile'} onRetry={retry} />
      </Container>
    )
  }
  if (status === 'empty' || !data) {
    return (
      <Container className="py-20">
        <EmptyState title="Profile not found" description="This expert slug is not published." />
      </Container>
    )
  }

  return (
    <>
      <Seo title={`${data.speciality} | Experts`} description={data.bio} path={`/experts/${data.slug}`} />
      <Container className="grid gap-10 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <img src={data.photo} alt="" className="aspect-[4/5] w-full rounded-2xl bg-canvas object-cover" />
          <p className="mt-3 text-xs text-slate-muted">Portrait placeholder. Not a photograph of a real clinician.</p>
        </div>
        <div className="lg:col-span-8">
          <Badge>{data.speciality}</Badge>
          <Heading as="h1" className="mt-4">
            {data.name}
          </Heading>
          <p className="mt-3 text-slate">{data.qualification}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink">{data.bio}</p>
          <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-muted">Languages</dt>
              <dd>{data.languages.join(', ')}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-muted">Availability</dt>
              <dd>{data.availability}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-muted">Review status</dt>
              <dd>{data.reviewStatus}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-muted">Data status</dt>
              <dd>{data.dataStatus}</dd>
            </div>
          </dl>
        </div>
      </Container>
    </>
  )
}
