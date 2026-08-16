import { pageMetadata } from '@/lib/seo'
import { LearnPlayerPage } from '@/views/LearnPlayerPage'
import { lessonBySlug, PROGRAMS, programBySlug } from '@/data/programs'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string; lessonSlug: string }> }

export function generateStaticParams() {
  return PROGRAMS.flatMap((program) =>
    program.lessons.map((lesson) => ({ slug: program.slug, lessonSlug: lesson.slug })),
  )
}

export const revalidate = 60

export async function generateMetadata({ params }: Props) {
  const { slug, lessonSlug } = await params
  const program = programBySlug(slug)
  const lesson = program ? lessonBySlug(program, lessonSlug) : undefined
  return pageMetadata({
    title: lesson?.title.en ?? 'Lesson',
    description: program?.summary.en ?? '',
    path: `/learn/${slug}/${lessonSlug}`,
  })
}

export default async function Page({ params }: Props) {
  const { slug, lessonSlug } = await params
  const program = programBySlug(slug)
  if (!program || !lessonBySlug(program, lessonSlug)) notFound()
  return <LearnPlayerPage programSlug={slug} lessonSlug={lessonSlug} />
}
