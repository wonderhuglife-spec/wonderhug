import { pageMetadata } from '@/lib/seo'
import { ToolsPage } from '@/views/ToolsPage'

export const metadata = pageMetadata({
  title: 'Tools',
  description: 'Due date, kicks, contractions and weight notes.',
  path: '/tools',
})

export default function Page() {
  return <ToolsPage />
}
