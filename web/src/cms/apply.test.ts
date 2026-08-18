import { describe, expect, it } from 'vitest'
import { applyPosts, applyProducts } from '@/cms/apply'
import { seedCmsState } from '@/cms/seed'
import { mergeCmsState } from '@/cms/store'
import type { CmsItem } from '@/cms/types'

describe('cms merge', () => {
  it('overlays an edited product name onto the seed catalogue', () => {
    const seed = seedCmsState()
    const product = seed.items.find((item) => item.collection === 'products') as CmsItem
    const overlay = {
      ...seed,
      items: [{ ...product, title: 'Edited daily pack', status: 'published' as const }],
    }
    const merged = mergeCmsState(seed, overlay)
    const products = applyProducts(merged)
    expect(products.find((row) => row.slug === product.slug)?.name.en).toBe('Edited daily pack')
  })

  it('keeps unpublished posts out of the public list', () => {
    const seed = seedCmsState()
    const post = seed.items.find((item) => item.collection === 'posts') as CmsItem
    const overlay = {
      ...seed,
      items: seed.items.map((item) => (item.id === post.id ? { ...item, status: 'draft' as const } : item)),
    }
    const posts = applyPosts(overlay).filter((row) => row.isPublished)
    expect(posts.some((row) => row.slug === post.slug)).toBe(false)
  })

  it('honours deleted slugs so seed items do not return', () => {
    const seed = seedCmsState()
    const post = seed.items.find((item) => item.collection === 'posts') as CmsItem
    const overlay = {
      ...seed,
      items: seed.items.filter((item) => item.id !== post.id),
      deletedKeys: [`posts:${post.slug}`],
    }
    const merged = mergeCmsState(seed, overlay)
    expect(applyPosts(merged).some((row) => row.slug === post.slug)).toBe(false)
  })
})
