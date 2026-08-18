import { pageMetadata } from '@/lib/seo'
import { WeekIndexPage } from '@/views/WeekIndexPage'

export const metadata = pageMetadata({
  title: 'Pregnancy week by week',
  description: 'Forty educational week notes for Indian calendars.',
  path: '/pregnancy/week-by-week',
})

export default function Page() {
  return <WeekIndexPage />
}
