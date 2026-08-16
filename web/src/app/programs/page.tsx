import { pageMetadata } from '@/lib/seo'
import { ProgramsPage } from '@/views/ProgramsPage'

export const metadata = pageMetadata({
  title: 'Wellness programs',
  description: 'Beej Sanskar, Womb Care and Super Parenting.',
  path: '/programs',
})

export default function Page() {
  return <ProgramsPage />
}
