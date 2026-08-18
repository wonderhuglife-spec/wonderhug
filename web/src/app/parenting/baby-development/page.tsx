import { pageMetadata } from '@/lib/seo'
import { hubByPath } from '@/data/hubs'
import { HubPage } from '@/views/HubPage'

const PATH = '/parenting/baby-development'
const hub = hubByPath(PATH)

export const metadata = pageMetadata({
  title: hub?.seoTitle.en ?? 'WonderHug.Life',
  description: hub?.seoDescription.en ?? '',
  path: PATH,
})

export default function Page() {
  return <HubPage path={PATH} />
}
