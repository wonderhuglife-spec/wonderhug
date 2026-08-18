import { notFound } from 'next/navigation'
import { WEEK_GUIDES } from '@/data/weeks'
import { pageMetadata } from '@/lib/seo'
import { WeekPage } from '@/views/WeekPage'

type Props = { params: Promise<{ week: string }> }

export function generateStaticParams() {
  return WEEK_GUIDES.map((guide) => ({ week: String(guide.week) }))
}

export async function generateMetadata({ params }: Props) {
  const { week } = await params
  const guide = WEEK_GUIDES.find((item) => item.week === Number(week))
  if (!guide) return pageMetadata({ title: 'Week', description: '', path: `/pregnancy/week/${week}` })
  return pageMetadata({
    title: guide.title.en,
    description: guide.body.en.slice(0, 150),
    path: `/pregnancy/week/${guide.week}`,
  })
}

export default async function Page({ params }: Props) {
  const { week } = await params
  const guide = WEEK_GUIDES.find((item) => item.week === Number(week))
  if (!guide) notFound()
  return <WeekPage week={week} />
}
