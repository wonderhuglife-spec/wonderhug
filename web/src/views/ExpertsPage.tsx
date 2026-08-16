'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/lib/navigation'
import { EXPERTS } from '@/data/experts'
import { Seo } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Heading, Text } from '@/components/ui/Typography'
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
  const list = useMemo(() => {
    const rows = EXPERTS.filter((item) => item.isListed)
    return filter === 'all' ? rows : rows.filter((item) => item.speciality === filter)
  }, [filter])

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
        {list.length === 0 ? <EmptyState title="No seats in this speciality" description="" /> : null}
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
      </Container>
    </>
  )
}
