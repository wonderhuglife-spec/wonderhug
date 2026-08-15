import { BLOG_POSTS } from '@/data/blog'
import { supabase, supabaseConfigStatus } from '@/lib/supabase'
import type { AsyncState, BlogCategory, BlogPost } from '@/types/domain'

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export async function listPublishedPosts(category?: BlogCategory | 'all'): Promise<AsyncState<BlogPost[]>> {
  try {
    if (supabase && supabaseConfigStatus === 'ready') {
      const query = supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
      const { data, error } = await query
      if (error) {
        return { status: 'error', data: null, error: error.message }
      }
      const mapped = (data ?? []).map(mapRow)
      const filtered =
        !category || category === 'all' ? mapped : mapped.filter((post) => post.category === category)
      if (filtered.length === 0) return { status: 'empty', data: [], error: null }
      return { status: 'success', data: filtered, error: null }
    }

    await delay(120)
    const posts = BLOG_POSTS.filter((post) => post.isPublished).filter(
      (post) => !category || category === 'all' || post.category === category,
    )
    if (posts.length === 0) return { status: 'empty', data: [], error: null }
    return { status: 'success', data: posts, error: null }
  } catch (error) {
    return { status: 'error', data: null, error: error instanceof Error ? error.message : 'Unable to load articles' }
  }
}

export async function getPostBySlug(slug: string): Promise<AsyncState<BlogPost>> {
  try {
    if (supabase && supabaseConfigStatus === 'ready') {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle()
      if (error) return { status: 'error', data: null, error: error.message }
      if (!data) return { status: 'empty', data: null, error: null }
      return { status: 'success', data: mapRow(data), error: null }
    }
    await delay(80)
    const post = BLOG_POSTS.find((item) => item.slug === slug && item.isPublished)
    if (!post) return { status: 'empty', data: null, error: null }
    return { status: 'success', data: post, error: null }
  } catch (error) {
    return { status: 'error', data: null, error: error instanceof Error ? error.message : 'Unable to load article' }
  }
}

function mapRow(row: Record<string, unknown>): BlogPost {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    excerpt: String(row.excerpt ?? ''),
    content: String(row.content ?? ''),
    featuredImage: String(row.featured_image ?? '/images/editorial-placeholder.svg'),
    featuredImageAlt: String(row.seo_title ?? row.title),
    videoUrl: row.video_url ? String(row.video_url) : null,
    category: row.category as BlogPost['category'],
    authorId: String(row.author_id ?? ''),
    authorName: 'WonderHug Editorial',
    expertReviewerId: row.expert_reviewer_id ? String(row.expert_reviewer_id) : null,
    expertReviewerName: null,
    expertReviewerQualification: null,
    reviewStatus: (row.review_status as BlogPost['reviewStatus']) ?? 'draft',
    publishedAt: String(row.published_at ?? row.created_at ?? ''),
    updatedAt: String(row.updated_at ?? ''),
    lastReviewedAt: row.published_at ? String(row.published_at) : null,
    displayOrder: Number(row.display_order ?? 0),
    readingTime: Number(row.reading_time ?? 1),
    isFeatured: Boolean(row.is_featured),
    isPublished: Boolean(row.is_published),
    seoTitle: String(row.seo_title ?? row.title),
    seoDescription: String(row.seo_description ?? row.excerpt ?? ''),
    canonicalUrl: row.canonical_url ? String(row.canonical_url) : null,
    relatedSlugs: [],
    relatedExpertSlug: null,
    relatedToolSlugs: [],
    references: [],
    dataStatus: 'CONTENT_PLACEHOLDER',
  }
}

export const contentService = { listPublishedPosts, getPostBySlug }
