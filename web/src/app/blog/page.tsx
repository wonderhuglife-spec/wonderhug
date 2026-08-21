import { pageMetadata } from '@/lib/seo'
import { BlogIndexPage } from '@/views/BlogIndexPage'
import { listPublishedPosts } from '@/services/content'
import { parsePageParam } from '@/lib/blogPagination'

export const revalidate = 60

export const metadata = pageMetadata({
  title: 'Journal',
  description: 'Educational articles for Telugu-speaking families.',
  path: '/blog',
})

type Props = { searchParams: Promise<{ page?: string | string[] }> }

export default async function Page({ searchParams }: Props) {
  const result = await listPublishedPosts()
  const posts = result.data ?? []
  const params = await searchParams
  const raw = Array.isArray(params.page) ? params.page[0] : params.page
  return <BlogIndexPage posts={posts} initialPage={parsePageParam(raw)} />
}
