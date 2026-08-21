import { pageMetadata } from '@/lib/seo'
import { JourneyPlannerPage } from '@/views/JourneyPlannerPage'

export const metadata = pageMetadata({
  title: 'Journey planner',
  description: 'Choose planning, pregnancy or parenting and enrol in the matching WonderHug programme.',
  path: '/journey/planner',
})

export default function Page() {
  return <JourneyPlannerPage />
}
