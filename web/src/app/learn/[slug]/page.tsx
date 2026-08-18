import { pageMetadata } from '@/lib/seo'
import { LearnPlayerPage } from '@/views/LearnPlayerPage'
import { programBySlug, PROGRAMS } from '@/data/programs'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }))
}

export const revalidate = 60

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const program = programBySlug(slug)
  return pageMetadata({
    title: program ? `${program.name.en} — learn` : 'Learn',
    description: program?.summary.en ?? 'Programme player',
    path: `/learn/${slug}`,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!programBySlug(slug)) notFound()
  return <LearnPlayerPage programSlug={slug} />
}
