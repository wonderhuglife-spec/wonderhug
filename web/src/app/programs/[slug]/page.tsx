import { notFound } from 'next/navigation'
import { PROGRAMS } from '@/data/programs'
import { pageMetadata } from '@/lib/seo'
import { ProgramDetailPage } from '@/views/ProgramDetailPage'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const program = PROGRAMS.find((item) => item.slug === slug)
  if (!program) return pageMetadata({ title: 'Programme', description: '', path: `/programs/${slug}` })
  return pageMetadata({
    title: program.name.en,
    description: program.summary.en,
    path: `/programs/${program.slug}`,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const program = PROGRAMS.find((item) => item.slug === slug)
  if (!program) notFound()
  return <ProgramDetailPage slug={slug} program={program} />
}
