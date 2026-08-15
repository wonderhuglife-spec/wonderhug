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
  'Garbh Sanskar Guides',
  'Nutrition Experts',
  'Yoga Experts',
  'Lactation Experts',
  'Counsellors',
  'Parenting Specialists',
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
      <Seo title="Experts" description="WonderHug faculty seats and booking via WhatsApp." path="/experts" />
      <header className="border-b border-line py-16">
        <Container>
          <Heading as="h1">Faculty and booking</Heading>
          <Text muted className="mt-4 max-w-2xl text-lg">
            Named clinicians publish after WonderHug verifies credentials. Until then, each speciality is a faculty seat that books through the WhatsApp care desk (AiSensy). We do not invent hospitals or degrees.
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
        {status === 'loading' ? <Loading /> : null}
        {status === 'error' ? <ErrorState message={error ?? ''} onRetry={retry} /> : null}
        {status === 'empty' || (status === 'success' && list.length === 0) ? (
          <EmptyState title="No seats in this speciality" description="" />
        ) : null}
        {status === 'success' ? (
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {list.map((expert) => (
              <li key={expert.id} className="rounded-2xl border border-line p-6">
                <Badge>{expert.speciality}</Badge>
                <h2 className="mt-4 font-serif text-2xl">
                  <Link to={`/experts/${expert.slug}`} onClick={() => track('expert_opened', { slug: expert.slug })}>
                    {expert.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-slate">{expert.qualification}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </>
  )
}
