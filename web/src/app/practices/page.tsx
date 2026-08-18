import { pageMetadata } from '@/lib/seo'
import { PracticesPage } from '@/views/PracticesPage'

export const metadata = pageMetadata({
  title: 'Garbh Sanskar practices',
  description: 'Guided scripts you can use today.',
  path: '/practices',
})

export default function Page() {
  return <PracticesPage />
}
