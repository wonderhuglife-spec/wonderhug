import { notFound } from 'next/navigation'
import { CMS_COLLECTIONS, type CmsCollection } from '@/cms/types'
import { AdminCollectionPage } from '@/views/admin/AdminCollectionPage'
import { AdminMediaPage } from '@/views/admin/AdminMediaPage'
import { AdminSettingsPage } from '@/views/admin/AdminSettingsPage'

type Props = { params: Promise<{ section: string }> }

const COLLECTIONS = new Set(CMS_COLLECTIONS.map((item) => item.id))

export default async function Page({ params }: Props) {
  const { section } = await params
  if (section === 'media') return <AdminMediaPage />
  if (section === 'settings') return <AdminSettingsPage />
  if (!COLLECTIONS.has(section as CmsCollection)) notFound()
  return <AdminCollectionPage collection={section as CmsCollection} />
}
