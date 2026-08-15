import { pageMetadata } from '@/lib/seo'
import { BlogIndexPage } from '@/views/BlogIndexPage'

export const metadata = pageMetadata({
  title: 'Journal',
  description: 'Educational articles for Telugu-speaking families.',
  path: '/blog',
})

export default function Page() {
  return <BlogIndexPage />
}
