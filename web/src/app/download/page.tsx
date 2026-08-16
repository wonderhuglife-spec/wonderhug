import { pageMetadata } from '@/lib/seo'
import { DownloadPage } from '@/views/DownloadPage'

export const metadata = pageMetadata({
  title: 'Download the app',
  description: 'Native Flutter companion for daily practice.',
  path: '/download',
})

export default function Page() {
  return <DownloadPage />
}
