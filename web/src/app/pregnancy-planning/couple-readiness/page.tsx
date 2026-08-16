import { pageMetadata } from '@/lib/seo'
import { hubByPath } from '@/data/hubs'
import { HubPage } from '@/views/HubPage'

const PATH = '/pregnancy-planning/couple-readiness'
const hub = hubByPath(PATH)

export const metadata = pageMetadata({
  title: hub?.seoTitle.en ?? 'WonderHug.Life',
  description: hub?.seoDescription.en ?? '',
  path: PATH,
})

export default function Page() {
  return <HubPage path={PATH} />
}
