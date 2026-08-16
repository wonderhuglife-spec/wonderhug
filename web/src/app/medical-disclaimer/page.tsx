import { pageMetadata } from '@/lib/seo'
import { LegalPage } from '@/views/LegalPage'

export const metadata = pageMetadata({
  title: 'Medical disclaimer',
  description: 'Education is not diagnosis.',
  path: '/medical-disclaimer',
})

export default function Page() {
  return <LegalPage kind='disclaimer' />
}
