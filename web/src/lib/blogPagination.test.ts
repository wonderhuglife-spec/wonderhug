import { describe, expect, it } from 'vitest'
import { paginatePosts, parsePageParam } from '@/lib/blogPagination'

describe('paginatePosts', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  it('puts the first item of a page in featured and the rest in a two-column list', () => {
    const first = paginatePosts(items, 1, 5)
    expect(first.featured).toBe(1)
    expect(first.rest).toEqual([2, 3, 4, 5])
    expect(first.pageCount).toBe(2)

    const second = paginatePosts(items, 2, 5)
    expect(second.featured).toBe(6)
    expect(second.rest).toEqual([7, 8, 9])
  })

  it('clamps out-of-range pages', () => {
    expect(paginatePosts(items, 99, 5).page).toBe(2)
    expect(paginatePosts(items, 0, 5).page).toBe(1)
  })
})

describe('parsePageParam', () => {
  it('defaults to page 1', () => {
    expect(parsePageParam(null)).toBe(1)
    expect(parsePageParam('nope')).toBe(1)
    expect(parsePageParam('3')).toBe(3)
  })
})
