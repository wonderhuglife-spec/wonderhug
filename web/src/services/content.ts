import { BLOG_POSTS } from '@/data/blog'
import { loadCatalog } from '@/cms/catalog'
import { loc } from '@/lib/locale'
import { supabase, supabaseConfigStatus } from '@/lib/supabase'
import { createServerSupabase } from '@/lib/supabase-server'
import type { AsyncState, BlogCategory, BlogPost, LocalizedText, Expert, HubPageContent, Practice, Product, Program } from '@/types/domain'

function textField(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}

function locField(en: unknown, te: unknown, fallback: LocalizedText): LocalizedText {
  return loc(textField(en, fallback.en), textField(te, fallback.te))
}

function stubFromRow(row: Record<string, unknown>): BlogPost {
  const slug = String(row.slug ?? 'article')
  const title = String(row.title ?? 'Article')
  const excerpt = String(row.excerpt ?? '')
  const content = String(row.content ?? excerpt)
  return {
    id: String(row.id ?? slug),
    slug,
    title: loc(title, String(row.title_te ?? title)),
    excerpt: loc(excerpt, String(row.excerpt_te ?? excerpt)),
    content: loc(content, String(row.content_te ?? content)),
    featuredImage: textField(row.featured_image, ''),
    featuredImageAlt: textField(row.featured_image_alt, title),
    videoUrl: typeof row.video_url === 'string' ? row.video_url : null,
    category: (row.category as BlogPost['category']) ?? 'Pregnancy',
    tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    authorId: String(row.author_id ?? 'editorial'),
    authorName: String(row.author_name ?? 'WonderHug Editorial'),
    expertReviewerId: row.expert_reviewer_id ? String(row.expert_reviewer_id) : null,
    expertReviewerName: row.expert_reviewer_name ? String(row.expert_reviewer_name) : null,
    expertReviewerQualification: row.expert_reviewer_qualification ? String(row.expert_reviewer_qualification) : null,
    reviewStatus: (row.review_status as BlogPost['reviewStatus']) ?? 'reviewed',
    publishedAt: String(row.published_at ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
    lastReviewedAt: row.last_reviewed_at ? String(row.last_reviewed_at) : null,
    displayOrder: Number(row.display_order ?? 0),
    readingTime: Number(row.reading_time ?? 1),
    isFeatured: Boolean(row.is_featured),
    isPublished: Boolean(row.is_published ?? true),
    seoTitle: loc(String(row.seo_title ?? title), String(row.seo_title_te ?? title)),
    seoDescription: loc(String(row.seo_description ?? excerpt), String(row.seo_description_te ?? excerpt)),
    canonicalUrl: typeof row.canonical_url === 'string' ? row.canonical_url : null,
    relatedSlugs: [],
    relatedExpertSlug: null,
    relatedToolSlugs: [],
    references: [{ label: 'Medical disclaimer', href: '/medical-disclaimer' }],
  }
}

/** Map a CMS row onto local catalogue fields instead of dropping local copy. */
export function mergeCmsPost(row: Record<string, unknown>, local?: BlogPost): BlogPost {
  const base = local ?? stubFromRow(row)
  const cmsContent = textField(row.content, '')
  const cmsImage = textField(row.featured_image, '')
  return {
    ...base,
    id: String(row.id ?? base.id),
    slug: String(row.slug ?? base.slug),
    title: locField(row.title, row.title_te, base.title),
    excerpt: locField(row.excerpt, row.excerpt_te, base.excerpt),
    content: cmsContent.length > 80 ? locField(row.content, row.content_te, base.content) : base.content,
    featuredImage: cmsImage || base.featuredImage,
    featuredImageAlt: textField(row.featured_image_alt, base.featuredImageAlt),
    videoUrl: typeof row.video_url === 'string' ? row.video_url : base.videoUrl,
    category: (row.category as BlogPost['category']) ?? base.category,
    isPublished: row.is_published == null ? base.isPublished : Boolean(row.is_published),
    isFeatured: row.is_featured == null ? base.isFeatured : Boolean(row.is_featured),
    readingTime: Number(row.reading_time ?? base.readingTime),
    publishedAt: String(row.published_at ?? base.publishedAt),
    seoTitle: locField(row.seo_title, row.seo_title_te, base.seoTitle),
    seoDescription: locField(row.seo_description, row.seo_description_te, base.seoDescription),
  }
}

function client() {
  return supabase ?? createServerSupabase()
}

export async function listPublishedPosts(category?: BlogCategory | 'all', query?: string): Promise<AsyncState<BlogPost[]>> {
  try {
    const catalog = await loadCatalog()
    let posts = catalog.posts.filter((post) => post.isPublished)
    const db = client()
    if (db && (supabaseConfigStatus === 'ready' || process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)) {
      const { data, error } = await db.from('blog_posts').select('*').eq('is_published', true)
      if (error) {
        // Keep local catalogue if the project has no reachable CMS — do not bake an empty journal.
      } else if (data && data.length > 0) {
        const bySlug = new Map(posts.map((post) => [post.slug, post]))
        const merged = data.map((row) => mergeCmsPost(row as Record<string, unknown>, bySlug.get(String(row.slug))))
        for (const local of posts) {
          if (!merged.some((item) => item.slug === local.slug)) merged.push(local)
        }
        posts = merged.filter((post) => post.isPublished)
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
          p.excerpt.en.toLowerCase().includes(q) ||
          p.content.en.toLowerCase().includes(q),
      )
    }
    posts.sort((a, b) => a.displayOrder - b.displayOrder)
    if (posts.length === 0) return { status: 'empty', data: [], error: null }
    return { status: 'success', data: posts, error: null }
  } catch (error) {
    return { status: 'error', data: null, error: error instanceof Error ? error.message : 'Unable to load articles' }
  }
}

export async function getPostBySlug(slug: string): Promise<AsyncState<BlogPost>> {
  const catalog = await loadCatalog()
  const local = catalog.posts.find((item) => item.slug === slug && item.isPublished) ?? BLOG_POSTS.find((item) => item.slug === slug && item.isPublished)
  const db = client()
  if (db) {
    try {
      const { data, error } = await db.from('blog_posts').select('*').eq('slug', slug).eq('is_published', true).maybeSingle()
      if (!error && data) {
        return { status: 'success', data: mergeCmsPost(data as Record<string, unknown>, local), error: null }
      }
    } catch {
      /* fall through to local catalogue */
    }
  }
  if (!local) return { status: 'empty', data: null, error: null }
  return { status: 'success', data: local, error: null }
}

export async function listPublishedProducts(): Promise<Product[]> {
  const catalog = await loadCatalog()
  return catalog.products.filter((item) => item.isPublished)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const catalog = await loadCatalog()
  return catalog.products.find((item) => item.slug === slug && item.isPublished) ?? null
}

export async function listPublishedPrograms(): Promise<Program[]> {
  const catalog = await loadCatalog()
  return catalog.programs.filter((item) => item.isPublished)
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const catalog = await loadCatalog()
  return catalog.programs.find((item) => item.slug === slug && item.isPublished) ?? null
}

export async function listListedExperts(): Promise<Expert[]> {
  const catalog = await loadCatalog()
  return catalog.experts.filter((item) => item.isListed)
}

export async function getExpertBySlug(slug: string): Promise<Expert | null> {
  const catalog = await loadCatalog()
  return catalog.experts.find((item) => item.slug === slug && item.isListed) ?? null
}

export async function listPublishedPractices(): Promise<Practice[]> {
  const catalog = await loadCatalog()
  return catalog.practices
}

export async function getPracticeBySlug(slug: string): Promise<Practice | null> {
  const catalog = await loadCatalog()
  return catalog.practices.find((item) => item.slug === slug) ?? null
}

export async function getHubByPath(path: string): Promise<HubPageContent | null> {
  const catalog = await loadCatalog()
  return catalog.hubs.find((item) => item.path === path) ?? null
}

export const contentService = {
  listPublishedPosts,
  getPostBySlug,
  listPublishedProducts,
  getProductBySlug,
  listPublishedPrograms,
  getProgramBySlug,
}
