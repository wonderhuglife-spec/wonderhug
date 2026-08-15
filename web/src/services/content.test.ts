import { describe, expect, it } from 'vitest'
import { listPublishedPosts, getPostBySlug } from '@/services/content'

describe('contentService fallback', () => {
  it('lists published local articles when Supabase is unconfigured', async () => {
    const result = await listPublishedPosts()
    expect(result.status).toBe('success')
    expect(result.data?.length).toBeGreaterThan(0)
    expect(result.data?.every((post) => post.isPublished)).toBe(true)
  })

  it('returns empty for unknown slugs', async () => {
    const result = await getPostBySlug('not-a-real-article')
    expect(result.status).toBe('empty')
  })

  it('loads a known article', async () => {
    const result = await getPostBySlug('garbh-sanskar-as-practice-not-promise')
    expect(result.status).toBe('success')
    expect(result.data?.title).toMatch(/Garbh Sanskar/i)
  })
})
