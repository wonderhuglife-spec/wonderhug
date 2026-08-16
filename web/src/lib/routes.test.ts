import { describe, expect, it } from 'vitest'
import { allAppRoutes } from '@/lib/routes'

describe('route manifest', () => {
  it('includes admin, shop, telugu-critical surfaces', () => {
    const paths = allAppRoutes().map((route) => route.path)
    expect(paths).toContain('/admin')
    expect(paths).toContain('/shop')
    expect(paths).toContain('/tools/due-date')
    expect(paths).toContain('/blog/garbh-sanskar-as-practice-not-promise')
    expect(paths).toContain('/learn/beej-sanskar')
    expect(paths).toContain('/learn/beej-sanskar/week-1-shared-rhythm')
  })
})
