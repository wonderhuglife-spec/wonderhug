import { pageMetadata } from '@/lib/seo'
import { LegalPage } from '@/views/LegalPage'

export const metadata = pageMetadata({
  title: 'Privacy',
  description: 'How WonderHug handles data today.',
  path: '/privacy',
})

export default function Page() {
  return <LegalPage kind='privacy' />
}
