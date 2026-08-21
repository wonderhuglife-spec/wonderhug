import { pageMetadata } from '@/lib/seo'
import { JourneyPage } from '@/views/JourneyPage'

export const metadata = pageMetadata({
  title: 'Journey',
  description: 'Planning, Garbh Sanskar and parenting — a daily companion for Telugu-speaking homes.',
  path: '/journey',
})

export default function Page() {
  return <JourneyPage />
}
