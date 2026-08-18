import { pageMetadata } from '@/lib/seo'
import { BlogIndexPage } from '@/views/BlogIndexPage'
import { listPublishedPosts } from '@/services/content'

export const revalidate = 60

export const metadata = pageMetadata({
  title: 'Journal',
  description: 'Educational articles for Telugu-speaking families.',
  path: '/blog',
})

export default async function Page() {
  const result = await listPublishedPosts()
  const posts = result.data ?? []
  return <BlogIndexPage posts={posts} />
}
