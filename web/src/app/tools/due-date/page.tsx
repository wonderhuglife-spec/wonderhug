import { pageMetadata } from '@/lib/seo'
import { DueDateToolPage } from '@/views/ToolsPage'

export const metadata = pageMetadata({
  title: 'Due date calculator',
  description: 'Estimate a due date from the last period.',
  path: '/tools/due-date',
})

export default function Page() {
  return <DueDateToolPage />
}
