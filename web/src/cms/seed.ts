import { BLOG_POSTS } from '@/data/blog'
import { COMMUNITY_GROUPS } from '@/data/community'
import { EXPERTS } from '@/data/experts'
import { HUB_PAGES } from '@/data/hubs'
import { PRACTICES } from '@/data/practices'
import { PRODUCTS } from '@/data/products'
import { PROGRAMS } from '@/data/programs'
import type { CmsItem, CmsSettings, CmsState } from '@/cms/types'

function item(partial: Omit<CmsItem, 'titleTe' | 'excerptTe' | 'bodyTe' | 'imageAlt' | 'extra'> & Partial<CmsItem>): CmsItem {
  return {
    titleTe: '',
    excerptTe: '',
    bodyTe: '',
    imageAlt: '',
    extra: {},
    ...partial,
  }
}

export function defaultSettings(): CmsSettings {
  return {
    heroKicker: '',
    heroTitle: '',
    heroBody: '',
    heroImageUrl: '',
    heroImageAlt: '',
    siteTagline: '',
  }
}

export function seedCmsState(): CmsState {
  const posts: CmsItem[] = BLOG_POSTS.map((post) =>
    item({
      id: post.id,
      collection: 'posts',
      slug: post.slug,
      title: post.title.en,
      titleTe: post.title.te,
      excerpt: post.excerpt.en,
      excerptTe: post.excerpt.te,
      body: post.content.en,
      bodyTe: post.content.te,
      imageUrl: post.featuredImage,
      imageAlt: post.featuredImageAlt,
      status: post.isPublished ? 'published' : 'draft',
      updatedAt: post.updatedAt,
      extra: {
        category: post.category,
        tags: post.tags.join(', '),
        authorName: post.authorName,
        featured: post.isFeatured ? 'true' : 'false',
        readingTime: String(post.readingTime),
        seoTitle: post.seoTitle.en,
        seoDescription: post.seoDescription.en,
      },
    }),
  )

  const pages: CmsItem[] = HUB_PAGES.map((hub) =>
    item({
      id: `page-${hub.path.replace(/\//g, '-') || 'home'}`,
      collection: 'pages',
      slug: hub.path,
      title: hub.title.en,
      titleTe: hub.title.te,
      excerpt: hub.intro.en,
      excerptTe: hub.intro.te,
      body: hub.sections.map((section) => `## ${section.heading.en}\n\n${section.body.en}`).join('\n\n'),
      bodyTe: hub.sections.map((section) => `## ${section.heading.te}\n\n${section.body.te}`).join('\n\n'),
      imageUrl: '',
      status: 'published',
      updatedAt: '2026-08-01T00:00:00.000Z',
      extra: {
        kicker: hub.kicker.en,
        kickerTe: hub.kicker.te,
        seoTitle: hub.seoTitle.en,
        seoDescription: hub.seoDescription.en,
        related: hub.related.map((row) => `${row.label.en}|${row.href}`).join('\n'),
      },
    }),
  )

  const products: CmsItem[] = PRODUCTS.map((product) =>
    item({
      id: product.id,
      collection: 'products',
      slug: product.slug,
      title: product.name.en,
      titleTe: product.name.te,
      excerpt: product.description.en,
      excerptTe: product.description.te,
      body: product.description.en,
      bodyTe: product.description.te,
      imageUrl: product.image,
      status: product.isPublished ? 'published' : 'draft',
      updatedAt: '2026-08-01T00:00:00.000Z',
      extra: {
        pricePaise: String(product.pricePaise),
        category: product.category,
        isDigital: product.isDigital ? 'true' : 'false',
        journeyStages: product.journeyStages.join(', '),
      },
    }),
  )

  const programs: CmsItem[] = PROGRAMS.map((program) =>
    item({
      id: program.id,
      collection: 'programs',
      slug: program.slug,
      title: program.name.en,
      titleTe: program.name.te,
      excerpt: program.summary.en,
      excerptTe: program.summary.te,
      body: program.description.en,
      bodyTe: program.description.te,
      imageUrl: program.coverImage,
      imageAlt: program.coverImageAlt,
      status: program.isPublished ? 'published' : 'draft',
      updatedAt: '2026-08-01T00:00:00.000Z',
      extra: {
        pricePaise: String(program.pricePaise),
        durationWeeks: String(program.durationWeeks),
        level: program.level,
        instructorName: program.instructorName,
      },
    }),
  )

  const experts: CmsItem[] = EXPERTS.map((expert) =>
    item({
      id: expert.id,
      collection: 'experts',
      slug: expert.slug,
      title: expert.name,
      excerpt: expert.qualification,
      body: expert.bio.en,
      bodyTe: expert.bio.te,
      imageUrl: expert.photo,
      status: expert.isListed ? 'published' : 'draft',
      updatedAt: '2026-08-01T00:00:00.000Z',
      extra: {
        speciality: expert.speciality,
        qualification: expert.qualification,
        availability: expert.availability,
        bookingUrl: expert.bookingUrl,
        isFacultySeat: expert.isFacultySeat ? 'true' : 'false',
        languages: expert.languages.join(', '),
      },
    }),
  )

  const practices: CmsItem[] = PRACTICES.map((practice) =>
    item({
      id: practice.id,
      collection: 'practices',
      slug: practice.slug,
      title: practice.title.en,
      titleTe: practice.title.te,
      excerpt: practice.description.en,
      excerptTe: practice.description.te,
      body: practice.description.en,
      bodyTe: practice.description.te,
      imageUrl: '',
      status: 'published',
      updatedAt: '2026-08-01T00:00:00.000Z',
      extra: {
        durationMinutes: String(practice.durationMinutes),
        mediaType: practice.mediaType,
        trimester: practice.trimester,
      },
    }),
  )

  const groups: CmsItem[] = COMMUNITY_GROUPS.map((group) =>
    item({
      id: group.id,
      collection: 'groups',
      slug: group.slug,
      title: group.name.en,
      titleTe: group.name.te,
      excerpt: group.description.en,
      excerptTe: group.description.te,
      body: group.description.en,
      bodyTe: group.description.te,
      imageUrl: '',
      status: 'published',
      updatedAt: '2026-08-01T00:00:00.000Z',
      extra: {
        journeyStages: group.journeyStages.join(', '),
      },
    }),
  )

  return {
    version: 1,
    items: [...posts, ...pages, ...products, ...programs, ...experts, ...practices, ...groups],
    settings: defaultSettings(),
    media: {},
    deletedKeys: [],
  }
}
