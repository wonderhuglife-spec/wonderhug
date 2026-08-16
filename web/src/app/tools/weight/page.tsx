import { pageMetadata } from '@/lib/seo'
import { WeightToolPage } from '@/views/ToolsPage'

export const metadata = pageMetadata({
  title: 'Weight tracker',
  description: 'A personal log, not a medical chart.',
  path: '/tools/weight',
})

export default function Page() {
  return <WeightToolPage />
}
