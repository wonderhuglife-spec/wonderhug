import { pageMetadata } from '@/lib/seo'
import { ExpertsPage } from '@/views/ExpertsPage'

export const metadata = pageMetadata({
  title: 'Experts',
  description: 'Faculty directory. Named clinicians publish after verification.',
  path: '/experts',
})

export default function Page() {
  return <ExpertsPage />
}
