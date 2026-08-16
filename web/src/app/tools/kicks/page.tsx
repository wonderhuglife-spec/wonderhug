import { pageMetadata } from '@/lib/seo'
import { KickToolPage } from '@/views/ToolsPage'

export const metadata = pageMetadata({
  title: 'Kick counter',
  description: 'Count movements the way your clinician taught.',
  path: '/tools/kicks',
})

export default function Page() {
  return <KickToolPage />
}
