import { notFound } from 'next/navigation'
import { EXPERTS } from '@/data/experts'
import { pageMetadata } from '@/lib/seo'
import { ExpertProfilePage } from '@/views/ExpertProfilePage'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationJsonLd } from '@/lib/jsonld'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return EXPERTS.filter((expert) => expert.isListed).map((expert) => ({ slug: expert.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const expert = EXPERTS.find((item) => item.slug === slug)
  if (!expert) return pageMetadata({ title: 'Expert', description: '', path: `/experts/${slug}` })
  return pageMetadata({
    title: expert.name,
    description: expert.bio.en,
    path: `/experts/${expert.slug}`,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const expert = EXPERTS.find((item) => item.slug === slug && item.isListed)
  if (!expert) notFound()
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: expert.name,
          description: expert.bio.en,
          jobTitle: expert.speciality,
        }}
      />
      <ExpertProfilePage slug={slug} expert={expert} />
    </>
  )
}
