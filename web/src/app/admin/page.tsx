import { pageMetadata } from '@/lib/seo'
import { AdminPage } from '@/views/AdminPage'

export const metadata = pageMetadata({
  title: 'Admin CMS',
  description: 'Manage homepage, journal, products and faculty without a deploy.',
  path: '/admin',
})

export default function Page() {
  return <AdminPage />
}
