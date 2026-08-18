import { supabase } from '@/lib/supabase'
import { createServerSupabase } from '@/lib/supabase-server'
import { publishedOnly } from '@/cms/apply'
import { normalizeState } from '@/cms/store'
import {
  CMS_MEDIA_BLOCK,
  CMS_PUBLISHED_BLOCK,
  CMS_SETTINGS_BLOCK,
  CMS_STAFF_BLOCK,
  type CmsItem,
  type CmsState,
} from '@/cms/types'

function db() {
  return supabase ?? createServerSupabase()
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

export async function fetchRemoteCms(opts: { includeDrafts?: boolean } = {}): Promise<CmsState | null> {
  const client = db()
  if (!client) return null
  const key = opts.includeDrafts ? CMS_STAFF_BLOCK : CMS_PUBLISHED_BLOCK
  const { data, error } = await client.from('cms_blocks').select('payload').eq('block_key', key).maybeSingle()
  if (error || !data?.payload) {
    if (opts.includeDrafts) {
      const published = await client.from('cms_blocks').select('payload').eq('block_key', CMS_PUBLISHED_BLOCK).maybeSingle()
      return normalizeState(published.data?.payload)
    }
    return null
  }
  return normalizeState(data.payload)
}

export async function fetchRemoteSettingsAndMedia(): Promise<{ settings?: Partial<CmsState['settings']>; media?: CmsState['media'] }> {
  const client = db()
  if (!client) return {}
  const { data } = await client.from('cms_blocks').select('block_key, payload').in('block_key', [CMS_SETTINGS_BLOCK, CMS_MEDIA_BLOCK])
  const out: { settings?: Partial<CmsState['settings']>; media?: CmsState['media'] } = {}
  for (const row of data ?? []) {
    if (row.block_key === CMS_SETTINGS_BLOCK) {
      const payload = (row.payload ?? {}) as Record<string, unknown>
      out.settings = {
        heroBody: typeof payload.body === 'string' ? payload.body : typeof payload.heroBody === 'string' ? payload.heroBody : undefined,
        heroTitle: typeof payload.title === 'string' ? payload.title : typeof payload.heroTitle === 'string' ? payload.heroTitle : undefined,
        heroKicker: typeof payload.kicker === 'string' ? payload.kicker : undefined,
        heroImageUrl: typeof payload.imageUrl === 'string' ? payload.imageUrl : undefined,
        heroImageAlt: typeof payload.imageAlt === 'string' ? payload.imageAlt : undefined,
        siteTagline: typeof payload.siteTagline === 'string' ? payload.siteTagline : undefined,
      }
    }
    if (row.block_key === CMS_MEDIA_BLOCK) {
      out.media = (row.payload ?? {}) as CmsState['media']
    }
  }
  return out
}

export async function persistRemoteCms(state: CmsState): Promise<string | null> {
  const client = supabase
  if (!client) return 'Supabase is not configured. Content is saved in this browser until you add keys.'
  const published = publishedOnly(state)
  const writes = [
    client.from('cms_blocks').upsert({ block_key: CMS_STAFF_BLOCK, locale: 'en', payload: state }),
    client.from('cms_blocks').upsert({ block_key: CMS_PUBLISHED_BLOCK, locale: 'en', payload: published }),
    client.from('cms_blocks').upsert({
      block_key: CMS_SETTINGS_BLOCK,
      locale: 'en',
      payload: {
        body: state.settings.heroBody,
        title: state.settings.heroTitle,
        kicker: state.settings.heroKicker,
        heroBody: state.settings.heroBody,
        heroTitle: state.settings.heroTitle,
        imageUrl: state.settings.heroImageUrl,
        imageAlt: state.settings.heroImageAlt,
        siteTagline: state.settings.siteTagline,
      },
    }),
    client.from('cms_blocks').upsert({ block_key: CMS_MEDIA_BLOCK, locale: 'en', payload: state.media }),
  ]
  const results = await Promise.all(writes)
  const firstError = results.find((row) => row.error)?.error?.message
  if (firstError) return firstError
  const tableError = await persistTypedTables(state)
  return tableError
}

async function persistTypedTables(state: CmsState): Promise<string | null> {
  const client = supabase
  if (!client) return null
  const dbClient = client
  const errors: string[] = []

  async function upsert(table: string, rows: Record<string, unknown>[]) {
    if (rows.length === 0) return
    const { error } = await dbClient.from(table).upsert(rows, { onConflict: 'slug' })
    if (error) errors.push(`${table}: ${error.message}`)
  }

  await upsert(
    'blog_posts',
    state.items.filter((item) => item.collection === 'posts').map((item) => postRow(item)),
  )
  await upsert(
    'products',
    state.items.filter((item) => item.collection === 'products').map((item) => productRow(item)),
  )
  await upsert(
    'programs',
    state.items.filter((item) => item.collection === 'programs').map((item) => programRow(item)),
  )
  await upsert(
    'garbh_practices',
    state.items.filter((item) => item.collection === 'practices').map((item) => practiceRow(item)),
  )
  await upsert(
    'community_groups',
    state.items.filter((item) => item.collection === 'groups').map((item) => groupRow(item)),
  )
  await upsert(
    'experts',
    state.items.filter((item) => item.collection === 'experts').map((item) => expertRow(item)),
  )

  const pageRows = state.items
    .filter((item) => item.collection === 'pages')
    .map((item) => ({
      slug: item.slug.replace(/^\//, ''),
      locale: 'en',
      title: item.title,
      kicker: item.extra.kicker ?? '',
      intro: item.excerpt,
      body: [{ heading: item.title, body: item.body }],
      related: [],
      seo_title: item.extra.seoTitle ?? item.title,
      seo_description: item.extra.seoDescription ?? item.excerpt,
      is_published: item.status === 'published',
    }))
  if (pageRows.length > 0) {
    const { error } = await client.from('site_pages').upsert(pageRows, { onConflict: 'slug,locale' })
    if (error) errors.push(`site_pages: ${error.message}`)
  }

  return errors.length ? errors.join(' · ') : null
}

function postRow(item: CmsItem) {
  return {
    ...(isUuid(item.id) ? { id: item.id } : {}),
    slug: item.slug,
    title: item.title,
    title_te: item.titleTe,
    excerpt: item.excerpt,
    excerpt_te: item.excerptTe,
    content: item.body,
    content_te: item.bodyTe,
    featured_image: item.imageUrl,
    featured_image_alt: item.imageAlt,
    category: item.extra.category || 'Pregnancy',
    tags: item.extra.tags ? item.extra.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
    author_name: item.extra.authorName || 'WonderHug Editorial',
    is_published: item.status === 'published',
    is_featured: item.extra.featured === 'true',
    seo_title: item.extra.seoTitle || item.title,
    seo_description: item.extra.seoDescription || item.excerpt,
    published_at: item.status === 'published' ? item.updatedAt : null,
  }
}

function productRow(item: CmsItem) {
  return {
    ...(isUuid(item.id) ? { id: item.id } : {}),
    slug: item.slug,
    name: item.title,
    name_te: item.titleTe,
    description: item.excerpt || item.body,
    description_te: item.excerptTe || item.bodyTe,
    price_paise: Number(item.extra.pricePaise || 0),
    image: item.imageUrl,
    category: item.extra.category || 'digital',
    is_digital: item.extra.isDigital !== 'false',
    is_published: item.status === 'published',
  }
}

function programRow(item: CmsItem) {
  return {
    ...(isUuid(item.id) ? { id: item.id } : {}),
    slug: item.slug,
    name: item.title,
    name_te: item.titleTe,
    summary: item.excerpt,
    summary_te: item.excerptTe,
    description: item.body,
    description_te: item.bodyTe,
    price_paise: Number(item.extra.pricePaise || 0),
    duration_weeks: Number(item.extra.durationWeeks || 4),
    cover_image: item.imageUrl,
    cover_image_alt: item.imageAlt,
    level: item.extra.level || 'all',
    is_published: item.status === 'published',
  }
}

function practiceRow(item: CmsItem) {
  return {
    ...(isUuid(item.id) ? { id: item.id } : {}),
    slug: item.slug,
    title: item.title,
    title_te: item.titleTe,
    description: item.excerpt || item.body,
    duration_minutes: Number(item.extra.durationMinutes || 10),
    media_type: item.extra.mediaType || 'guide',
    trimester: item.extra.trimester || 'any',
    is_published: item.status === 'published',
  }
}

function groupRow(item: CmsItem) {
  return {
    ...(isUuid(item.id) ? { id: item.id } : {}),
    slug: item.slug,
    name: item.title,
    name_te: item.titleTe,
    description: item.excerpt || item.body,
    description_te: item.excerptTe,
    is_published: item.status === 'published',
  }
}

function expertRow(item: CmsItem) {
  return {
    ...(isUuid(item.id) ? { id: item.id } : {}),
    slug: item.slug,
    name: item.title,
    photo: item.imageUrl,
    speciality: item.extra.speciality || 'Garbh Sanskar Guides',
    qualification: item.extra.qualification || item.excerpt,
    bio: item.body,
    bio_te: item.bodyTe,
    availability: item.extra.availability || '',
    booking_url: item.extra.bookingUrl || null,
    is_faculty_seat: item.extra.isFacultySeat !== 'false',
    is_listed: item.status === 'published',
    review_status: 'in_review',
  }
}
