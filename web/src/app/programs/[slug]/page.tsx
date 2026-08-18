import { notFound } from 'next/navigation'
import { PROGRAMS } from '@/data/programs'
import { pageMetadata } from '@/lib/seo'
import { ProgramDetailPage } from '@/views/ProgramDetailPage'
import { getProgramBySlug } from '@/services/content'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = true

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const program = (await getProgramBySlug(slug)) ?? PROGRAMS.find((item) => item.slug === slug)
  if (!program) return pageMetadata({ title: 'Programme', description: '', path: `/programs/${slug}` })
  return pageMetadata({
    title: program.name.en,
    description: program.summary.en,
    path: `/programs/${program.slug}`,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const program = await getProgramBySlug(slug)
  if (!program) notFound()
  return <ProgramDetailPage slug={slug} program={program} />
}
