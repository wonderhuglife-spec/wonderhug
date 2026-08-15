import { BLOG_POSTS } from '@/data/blog'
import { supabase, supabaseConfigStatus } from '@/lib/supabase'
import type { AsyncState, BlogCategory, BlogPost } from '@/types/domain'

export async function listPublishedPosts(category?: BlogCategory | 'all', query?: string): Promise<AsyncState<BlogPost[]>> {
  try {
    let posts = BLOG_POSTS.filter((post) => post.isPublished)
    if (supabase && supabaseConfigStatus === 'ready') {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('is_published', true)
      if (error) return { status: 'error', data: null, error: error.message }
      if (data && data.length > 0) {
        posts = BLOG_POSTS.filter((p) => data.some((row) => String(row.slug) === p.slug))
      }
    }
    if (category && category !== 'all') posts = posts.filter((p) => p.category === category)
    if (query) {
      const q = query.toLowerCase()
      posts = posts.filter(
        (p) =>
          p.title.en.toLowerCase().includes(q) ||
          p.title.te.includes(query) ||
          p.tags.some((t) => t.includes(q)) ||
          p.excerpt.en.toLowerCase().includes(q),
      )
    }
    if (posts.length === 0) return { status: 'empty', data: [], error: null }
    return { status: 'success', data: posts, error: null }
  } catch (error) {
    return { status: 'error', data: null, error: error instanceof Error ? error.message : 'Unable to load articles' }
  }
}

export async function getPostBySlug(slug: string): Promise<AsyncState<BlogPost>> {
  const post = BLOG_POSTS.find((item) => item.slug === slug && item.isPublished)
  if (!post) return { status: 'empty', data: null, error: null }
  return { status: 'success', data: post, error: null }
}

export const contentService = { listPublishedPosts, getPostBySlug }
