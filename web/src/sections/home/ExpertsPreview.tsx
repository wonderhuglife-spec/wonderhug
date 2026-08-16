'use client'

import { EXPERTS } from '@/data/experts'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Link } from '@/lib/navigation'
import { Badge } from '@/components/ui/Badge'

export function ExpertsPreview() {
  const preview = EXPERTS.slice(0, 4)
  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Experts</p>
          <Heading as="h2" className="mt-3">
            Specialists you can verify — when we have names.
          </Heading>
          <Text muted className="mt-4">
            WonderHug will list gynecologists, fertility specialists, pediatricians, nutrition and yoga experts,
            lactation professionals, parenting specialists and counsellors. Until credentials are confirmed, this
            directory shows labelled placeholders only.
          </Text>
          <Link to="/experts" className="mt-6 inline-block text-sm font-medium text-navy underline-offset-4 hover:underline">
            Open the directory
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {preview.map((expert) => (
            <li key={expert.id} className="rounded-2xl border border-line p-5">
              <Badge tone="muted">{expert.speciality}</Badge>
              <p className="mt-3 font-medium text-ink">{expert.name}</p>
              <p className="mt-2 text-sm text-slate">{expert.qualification}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
