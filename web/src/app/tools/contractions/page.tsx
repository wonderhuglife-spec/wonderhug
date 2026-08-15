import { pageMetadata } from '@/lib/seo'
import { ContractionToolPage } from '@/views/ToolsPage'

export const metadata = pageMetadata({
  title: 'Contraction timer',
  description: 'A notebook for contraction timing.',
  path: '/tools/contractions',
})

export default function Page() {
  return <ContractionToolPage />
}
