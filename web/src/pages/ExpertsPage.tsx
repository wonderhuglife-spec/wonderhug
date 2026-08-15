import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { expertsService } from '@/services/experts'
import { useAsyncResource } from '@/hooks/useAsyncResource'
import { Seo } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Heading, Text } from '@/components/ui/Typography'
import { Loading } from '@/components/ui/Loading'
import { Tabs } from '@/components/ui/Tabs'
import { track } from '@/services/analytics'
import type { ExpertSpeciality } from '@/types/domain'

const SPECIALITIES: ExpertSpeciality[] = [
  'Gynecologists',
  'Obstetricians',
  'Fertility Specialists',
  'Pediatricians',
  'Nutrition Experts',
  'Yoga Experts',
  'Lactation Experts',
  'Parenting Specialists',
  'Counsellors',
]

type Filter = ExpertSpeciality | 'all'

export function ExpertsPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const { status, data, error, retry } = useAsyncResource(() => expertsService.listExperts(), 'experts')
  const list = useMemo(() => {
    const rows = data ?? []
    return filter === 'all' ? rows : rows.filter((item) => item.speciality === filter)
  }, [data, filter])

  return (
    <>
      <Seo
        title="Experts"
        description="WonderHug expert directory. Named clinicians appear only after credentials are verified."
        path="/experts"
      />
      <header className="border-b border-line py-16">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Experts</p>
          <Heading as="h1" className="mt-3">
            A directory that refuses to invent credentials.
          </Heading>
          <Text muted className="mt-4 max-w-2xl text-lg">
            Every row below is labelled REQUIRES_VERIFIED_DATA. It exists so the product can be designed — not so a
            hospital name can be guessed.
          </Text>
        </Container>
      </header>
      <Container className="py-12">
        <Tabs
          label="Specialities"
          value={filter}
          onChange={setFilter}
          tabs={[{ id: 'all' as Filter, label: 'All' }, ...SPECIALITIES.map((id) => ({ id: id as Filter, label: id }))]}
        />
        {status === 'loading' ? <Loading label="Loading experts" /> : null}
        {status === 'error' ? <ErrorState message={error ?? 'Could not load experts'} onRetry={retry} /> : null}
        {status === 'empty' || (status === 'success' && list.length === 0) ? (
          <div className="mt-10">
            <EmptyState title="No profiles in this speciality" description="Verified experts will appear after review." />
          </div>
        ) : null}
        {status === 'success' ? (
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {list.map((expert) => (
              <li key={expert.id} className="rounded-2xl border border-line p-6">
                <Badge tone="muted">{expert.speciality}</Badge>
                <h2 className="mt-4 font-serif text-2xl">
                  <Link
                    to={`/experts/${expert.slug}`}
                    className="hover:text-teal-dark"
                    onClick={() => track('expert_opened', { slug: expert.slug })}
                  >
                    {expert.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-slate">{expert.qualification}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-slate-muted">{expert.dataStatus}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </>
  )
}
