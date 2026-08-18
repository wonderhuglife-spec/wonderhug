import { notFound } from 'next/navigation'
import { CMS_COLLECTIONS, type CmsCollection } from '@/cms/types'
import { AdminEditPage } from '@/views/admin/AdminEditPage'

type Props = { params: Promise<{ section: string; id: string }> }

const COLLECTIONS = new Set(CMS_COLLECTIONS.map((item) => item.id))

export default async function Page({ params }: Props) {
  const { section, id } = await params
  if (!COLLECTIONS.has(section as CmsCollection)) notFound()
  return <AdminEditPage collection={section as CmsCollection} id={id} />
}
