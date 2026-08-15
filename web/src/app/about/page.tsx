import { pageMetadata } from '@/lib/seo'
import { AboutPage } from '@/views/AboutPage'

export const metadata = pageMetadata({
  title: 'About',
  description: 'WonderHug.Life team and purpose.',
  path: '/about',
})

export default function Page() {
  return <AboutPage />
}
