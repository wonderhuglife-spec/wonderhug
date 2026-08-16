import { notFound } from 'next/navigation'
import { COMMUNITY_GROUPS } from '@/data/community'
import { pageMetadata } from '@/lib/seo'
import { CommunityGroupPage } from '@/views/CommunityGroupPage'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return COMMUNITY_GROUPS.map((group) => ({ slug: group.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const group = COMMUNITY_GROUPS.find((item) => item.slug === slug)
  if (!group) return pageMetadata({ title: 'Community', description: '', path: `/community/${slug}` })
  return pageMetadata({
    title: group.name.en,
    description: group.description.en,
    path: `/community/${group.slug}`,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const group = COMMUNITY_GROUPS.find((item) => item.slug === slug)
  if (!group) notFound()
  return <CommunityGroupPage slug={slug} />
}
