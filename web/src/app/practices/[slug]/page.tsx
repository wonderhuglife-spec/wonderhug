import { notFound } from 'next/navigation'
import { PRACTICES } from '@/data/practices'
import { pageMetadata } from '@/lib/seo'
import { PracticeDetailPage } from '@/views/PracticeDetailPage'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PRACTICES.map((practice) => ({ slug: practice.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const practice = PRACTICES.find((item) => item.slug === slug)
  if (!practice) return pageMetadata({ title: 'Practice', description: '', path: `/practices/${slug}` })
  return pageMetadata({
    title: practice.title.en,
    description: practice.description.en,
    path: `/practices/${practice.slug}`,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const practice = PRACTICES.find((item) => item.slug === slug)
  if (!practice) notFound()
  return <PracticeDetailPage slug={slug} practice={practice} />
}
