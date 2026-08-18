import { loc } from '@/lib/locale'
import { BLOG_POSTS } from '@/data/blog'
import { COMMUNITY_GROUPS } from '@/data/community'
import { EXPERTS } from '@/data/experts'
import { HUB_PAGES, hubByPath } from '@/data/hubs'
import { PRACTICES } from '@/data/practices'
import { PRODUCTS } from '@/data/products'
import { PROGRAMS } from '@/data/programs'
import type {
  BlogPost,
  CommunityGroup,
  Expert,
  HubPageContent,
  Practice,
  Product,
  Program,
} from '@/types/domain'
import type { CmsItem, CmsState } from '@/cms/types'

function published(item: CmsItem) {
  return item.status === 'published'
}

function isDeleted(state: CmsState, collection: CmsItem['collection'], slug: string) {
  return (state.deletedKeys ?? []).includes(`${collection}:${slug}`)
}

function extra(item: CmsItem, key: string, fallback = '') {
  return item.extra[key]?.trim() || fallback
}

function parseSections(body: string): HubPageContent['sections'] {
  const chunks = body.split(/\n(?=## )/).map((chunk) => chunk.trim()).filter(Boolean)
  if (chunks.length === 0) {
    return [{ heading: loc('About', 'గురించి'), body: loc(body, body) }]
  }
  return chunks.map((chunk) => {
    const match = chunk.match(/^##\s+(.+)\n+([\s\S]*)$/)
    if (!match) return { heading: loc(chunk.slice(0, 40), chunk.slice(0, 40)), body: loc(chunk, chunk) }
    return { heading: loc(match[1].trim(), match[1].trim()), body: loc(match[2].trim(), match[2].trim()) }
  })
}

function parseRelated(raw: string, fallback: HubPageContent['related']): HubPageContent['related'] {
  const lines = raw.split('\n').map((line) => line.trim()).filter(Boolean)
  if (lines.length === 0) return fallback
  return lines.map((line) => {
    const [label, href] = line.split('|').map((part) => part.trim())
    return { label: loc(label || href || 'Link', label || 'లింక్'), href: href || '/' }
  })
}

export function itemsOf(state: CmsState, collection: CmsItem['collection']) {
  return state.items.filter((item) => item.collection === collection)
}

export function applyPosts(state: CmsState): BlogPost[] {
  const bySlug = new Map(BLOG_POSTS.map((post) => [post.slug, post]))
  const seen = new Set<string>()
  const out: BlogPost[] = []
  for (const item of itemsOf(state, 'posts')) {
    seen.add(item.slug)
    const local = bySlug.get(item.slug)
    const title = loc(item.title, item.titleTe || item.title)
    const excerpt = loc(item.excerpt, item.excerptTe || item.excerpt)
    const content = loc(item.body, item.bodyTe || item.body)
    const base: BlogPost = local
      ? { ...local }
      : {
          id: item.id,
          slug: item.slug,
          title,
          excerpt,
          content,
          featuredImage: item.imageUrl,
          featuredImageAlt: item.imageAlt || item.title,
          videoUrl: null,
          category: (extra(item, 'category', 'Pregnancy') as BlogPost['category']) || 'Pregnancy',
          tags: extra(item, 'tags').split(',').map((tag) => tag.trim()).filter(Boolean),
          authorId: 'editorial',
          authorName: extra(item, 'authorName', 'WonderHug Editorial'),
          expertReviewerId: null,
          expertReviewerName: null,
          expertReviewerQualification: null,
          reviewStatus: 'reviewed',
          publishedAt: item.updatedAt,
          updatedAt: item.updatedAt,
          lastReviewedAt: item.updatedAt,
          displayOrder: out.length + 1,
          readingTime: Number(extra(item, 'readingTime', '5')) || 5,
          isFeatured: extra(item, 'featured') === 'true',
          isPublished: published(item),
          seoTitle: loc(extra(item, 'seoTitle', item.title), extra(item, 'seoTitle', item.title)),
          seoDescription: loc(extra(item, 'seoDescription', item.excerpt), extra(item, 'seoDescription', item.excerpt)),
          canonicalUrl: null,
          relatedSlugs: [],
          relatedExpertSlug: null,
          relatedToolSlugs: [],
          references: [{ label: 'Medical disclaimer', href: '/medical-disclaimer' }],
        }
    out.push({
      ...base,
      id: item.id || base.id,
      slug: item.slug,
      title,
      excerpt,
      content,
      featuredImage: item.imageUrl || base.featuredImage,
      featuredImageAlt: item.imageAlt || base.featuredImageAlt,
      category: (extra(item, 'category', base.category) as BlogPost['category']) || base.category,
      tags: extra(item, 'tags') ? extra(item, 'tags').split(',').map((tag) => tag.trim()).filter(Boolean) : base.tags,
      authorName: extra(item, 'authorName', base.authorName),
      isFeatured: extra(item, 'featured') ? extra(item, 'featured') === 'true' : base.isFeatured,
      isPublished: published(item),
      updatedAt: item.updatedAt,
      seoTitle: loc(extra(item, 'seoTitle', title.en), extra(item, 'seoTitle', title.en)),
      seoDescription: loc(extra(item, 'seoDescription', excerpt.en), extra(item, 'seoDescription', excerpt.en)),
    })
  }
  for (const post of BLOG_POSTS) {
    if (!seen.has(post.slug) && !isDeleted(state, 'posts', post.slug)) out.push(post)
  }
  return out
}

export function applyProducts(state: CmsState): Product[] {
  const bySlug = new Map(PRODUCTS.map((row) => [row.slug, row]))
  const seen = new Set<string>()
  const out: Product[] = []
  for (const item of itemsOf(state, 'products')) {
    seen.add(item.slug)
    const local = bySlug.get(item.slug)
    const name = loc(item.title, item.titleTe || item.title)
    const description = loc(item.excerpt || item.body, item.excerptTe || item.bodyTe || item.excerpt || item.body)
    out.push({
      ...(local ?? {
        id: item.id,
        slug: item.slug,
        name,
        description,
        pricePaise: 0,
        currency: 'INR' as const,
        image: item.imageUrl,
        category: 'digital',
        journeyStages: [],
        goals: [],
        isDigital: true,
        isPublished: true,
      }),
      id: item.id,
      slug: item.slug,
      name,
      description,
      image: item.imageUrl || local?.image || '',
      pricePaise: Number(extra(item, 'pricePaise', String(local?.pricePaise ?? 0))) || 0,
      category: extra(item, 'category', local?.category ?? 'digital'),
      isDigital: extra(item, 'isDigital', local?.isDigital ? 'true' : 'false') !== 'false',
      isPublished: published(item),
    })
  }
  for (const row of PRODUCTS) {
    if (!seen.has(row.slug) && !isDeleted(state, 'products', row.slug)) out.push(row)
  }
  return out
}

export function applyPrograms(state: CmsState): Program[] {
  const bySlug = new Map(PROGRAMS.map((row) => [row.slug, row]))
  const seen = new Set<string>()
  const out: Program[] = []
  for (const item of itemsOf(state, 'programs')) {
    seen.add(item.slug)
    const local = bySlug.get(item.slug)
    const name = loc(item.title, item.titleTe || item.title)
    const summary = loc(item.excerpt, item.excerptTe || item.excerpt)
    const description = loc(item.body, item.bodyTe || item.body)
    out.push({
      ...(local ?? {
        id: item.id,
        slug: item.slug,
        name,
        summary,
        description,
        pricePaise: 0,
        durationWeeks: 4,
        level: 'all' as const,
        coverImage: item.imageUrl,
        coverImageAlt: item.imageAlt || item.title,
        instructorSlug: null,
        instructorName: extra(item, 'instructorName', 'WonderHug faculty'),
        journeyStages: [],
        goals: [],
        modules: [],
        lessons: [],
        isPublished: true,
      }),
      id: item.id,
      slug: item.slug,
      name,
      summary,
      description,
      coverImage: item.imageUrl || local?.coverImage || '',
      coverImageAlt: item.imageAlt || local?.coverImageAlt || item.title,
      pricePaise: Number(extra(item, 'pricePaise', String(local?.pricePaise ?? 0))) || 0,
      durationWeeks: Number(extra(item, 'durationWeeks', String(local?.durationWeeks ?? 4))) || 4,
      level: (extra(item, 'level', local?.level ?? 'all') as Program['level']) || 'all',
      instructorName: extra(item, 'instructorName', local?.instructorName ?? 'WonderHug faculty'),
      isPublished: published(item),
    })
  }
  for (const row of PROGRAMS) {
    if (!seen.has(row.slug) && !isDeleted(state, 'programs', row.slug)) out.push(row)
  }
  return out
}

export function applyExperts(state: CmsState): Expert[] {
  const bySlug = new Map(EXPERTS.map((row) => [row.slug, row]))
  const seen = new Set<string>()
  const out: Expert[] = []
  for (const item of itemsOf(state, 'experts')) {
    seen.add(item.slug)
    const local = bySlug.get(item.slug)
    const bio = loc(item.body, item.bodyTe || item.body)
    out.push({
      ...(local ?? {
        id: item.id,
        slug: item.slug,
        name: item.title,
        photo: item.imageUrl,
        speciality: 'Garbh Sanskar Guides' as Expert['speciality'],
        qualification: extra(item, 'qualification', item.excerpt),
        bio,
        languages: ['English'],
        reviewStatus: 'in_review',
        availability: extra(item, 'availability', 'WhatsApp desk'),
        bookingUrl: extra(item, 'bookingUrl', process.env.NEXT_PUBLIC_AISENSY_WHATSAPP_URL || 'https://wa.me/'),
        isFacultySeat: extra(item, 'isFacultySeat', 'true') !== 'false',
        specialties: [],
        isListed: true,
      }),
      id: item.id,
      slug: item.slug,
      name: item.title,
      photo: item.imageUrl || local?.photo || '',
      qualification: extra(item, 'qualification', local?.qualification ?? item.excerpt),
      bio,
      speciality: (extra(item, 'speciality', local?.speciality ?? 'Garbh Sanskar Guides') as Expert['speciality']) || 'Garbh Sanskar Guides',
      availability: extra(item, 'availability', local?.availability ?? 'WhatsApp desk'),
      bookingUrl: extra(item, 'bookingUrl', local?.bookingUrl ?? 'https://wa.me/'),
      isFacultySeat: extra(item, 'isFacultySeat', local?.isFacultySeat ? 'true' : 'false') !== 'false',
      isListed: published(item),
    })
  }
  for (const row of EXPERTS) {
    if (!seen.has(row.slug) && !isDeleted(state, 'experts', row.slug)) out.push(row)
  }
  return out
}

export function applyPractices(state: CmsState): Practice[] {
  const bySlug = new Map(PRACTICES.map((row) => [row.slug, row]))
  const seen = new Set<string>()
  const out: Practice[] = []
  for (const item of itemsOf(state, 'practices')) {
    seen.add(item.slug)
    const local = bySlug.get(item.slug)
    const title = loc(item.title, item.titleTe || item.title)
    const description = loc(item.excerpt || item.body, item.excerptTe || item.bodyTe || item.excerpt || item.body)
    out.push({
      ...(local ?? {
        id: item.id,
        slug: item.slug,
        title,
        description,
        durationMinutes: 10,
        mediaType: 'guide',
        trimester: 'any',
      }),
      id: item.id,
      slug: item.slug,
      title,
      description,
      durationMinutes: Number(extra(item, 'durationMinutes', String(local?.durationMinutes ?? 10))) || 10,
      mediaType: (extra(item, 'mediaType', local?.mediaType ?? 'guide') as Practice['mediaType']) || 'guide',
      trimester: (extra(item, 'trimester', local?.trimester ?? 'any') as Practice['trimester']) || 'any',
    })
  }
  for (const row of PRACTICES) {
    if (!seen.has(row.slug) && !isDeleted(state, 'practices', row.slug)) out.push(row)
  }
  return out.filter((row) => {
    if (isDeleted(state, 'practices', row.slug)) return false
    const item = itemsOf(state, 'practices').find((entry) => entry.slug === row.slug)
    return item ? published(item) : true
  })
}

export function applyGroups(state: CmsState): CommunityGroup[] {
  const bySlug = new Map(COMMUNITY_GROUPS.map((row) => [row.slug, row]))
  const seen = new Set<string>()
  const out: CommunityGroup[] = []
  for (const item of itemsOf(state, 'groups')) {
    if (!published(item)) continue
    seen.add(item.slug)
    const local = bySlug.get(item.slug)
    out.push({
      ...(local ?? {
        id: item.id,
        slug: item.slug,
        name: loc(item.title, item.titleTe || item.title),
        description: loc(item.excerpt, item.excerptTe || item.excerpt),
        journeyStages: [],
      }),
      id: item.id,
      slug: item.slug,
      name: loc(item.title, item.titleTe || item.title),
      description: loc(item.excerpt || item.body, item.excerptTe || item.bodyTe || item.excerpt),
    })
  }
  for (const row of COMMUNITY_GROUPS) {
    if (isDeleted(state, 'groups', row.slug)) continue
    if (!seen.has(row.slug)) {
      const item = itemsOf(state, 'groups').find((entry) => entry.slug === row.slug)
      if (item && !published(item)) continue
      out.push(row)
    }
  }
  return out
}

export function applyHubs(state: CmsState): HubPageContent[] {
  const byPath = new Map(HUB_PAGES.map((row) => [row.path, row]))
  const seen = new Set<string>()
  const out: HubPageContent[] = []
  for (const item of itemsOf(state, 'pages')) {
    if (!published(item)) continue
    seen.add(item.slug)
    const local = byPath.get(item.slug)
    const related = parseRelated(extra(item, 'related'), local?.related ?? [])
    out.push({
      path: item.slug.startsWith('/') ? item.slug : `/${item.slug}`,
      kicker: loc(extra(item, 'kicker', local?.kicker.en ?? ''), extra(item, 'kickerTe', local?.kicker.te ?? '')),
      title: loc(item.title, item.titleTe || item.title),
      intro: loc(item.excerpt, item.excerptTe || item.excerpt),
      seoTitle: loc(extra(item, 'seoTitle', item.title), extra(item, 'seoTitle', item.title)),
      seoDescription: loc(extra(item, 'seoDescription', item.excerpt), extra(item, 'seoDescription', item.excerpt)),
      sections: parseSections(item.body),
      related,
    })
  }
  for (const row of HUB_PAGES) {
    if (!seen.has(row.path) && !isDeleted(state, 'pages', row.path)) out.push(row)
  }
  return out
}

export function hubFromState(state: CmsState, path: string): HubPageContent | undefined {
  return applyHubs(state).find((hub) => hub.path === path) ?? hubByPath(path)
}

export function publishedOnly(state: CmsState): CmsState {
  return {
    ...state,
    items: state.items.filter((item) => item.status === 'published' && !isDeleted(state, item.collection, item.slug)),
    deletedKeys: state.deletedKeys ?? [],
  }
}
