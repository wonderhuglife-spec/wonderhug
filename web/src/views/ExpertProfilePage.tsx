'use client'

import { useParams } from '@/lib/navigation'
import type { Expert } from '@/types/domain'
import { useCatalog } from '@/hooks/useCatalog'
import { Seo } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Heading } from '@/components/ui/Typography'
import { ButtonLink } from '@/components/ui/Button'
import { Media } from '@/components/media/Media'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'

export function ExpertProfilePage({ slug: slugProp, expert }: { slug?: string; expert?: Expert }) {
  const params = useParams()
  const { experts } = useCatalog()
  const slug = slugProp ?? String(params.slug ?? '')
  const data = expert ?? experts.find((item) => item.slug === slug && item.isListed)
  const locale = currentLocale()

  if (!data) {
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
          <Media src={data.photo} alt="Faculty seat atmosphere, not a verified portrait." className="aspect-[4/5] w-full rounded-2xl bg-canvas object-cover" width={640} height={800} />
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
          <p className="mt-2 text-sm">Specialties: {data.specialties.join(', ')}</p>
          <ButtonLink to={data.bookingUrl} className="mt-8" variant="teal">
            Book via WhatsApp
          </ButtonLink>
        </div>
      </Container>
    </>
  )
}
