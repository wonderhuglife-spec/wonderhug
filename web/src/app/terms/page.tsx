import { pageMetadata } from '@/lib/seo'
import { LegalPage } from '@/views/LegalPage'

export const metadata = pageMetadata({
  title: 'Terms',
  description: 'Operational terms until counsel copy arrives.',
  path: '/terms',
})

export default function Page() {
  return <LegalPage kind='terms' />
}
