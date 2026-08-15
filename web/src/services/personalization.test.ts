import { describe, expect, it } from 'vitest'
import { defaultProfile, recommend } from '@/services/personalization'

describe('personalizationService', () => {
  it('returns planning-oriented recommendations for planning stage', () => {
    const items = recommend(defaultProfile('planning'))
    expect(items.length).toBeGreaterThan(0)
    expect(items.some((item) => item.title.includes('Pregnancy Planning'))).toBe(true)
    expect(items.some((item) => item.href.includes('/parenting/newborn'))).toBe(false)
  })

  it('returns newborn-oriented tools for new parents', () => {
    const items = recommend(defaultProfile('new_parent'))
    expect(items.some((item) => item.title.toLowerCase().includes('postpartum'))).toBe(true)
  })

  it('does not hard-code empty recommendations for parenting', () => {
    const items = recommend(defaultProfile('parenting'))
    expect(items.length).toBeGreaterThan(0)
  })
})
