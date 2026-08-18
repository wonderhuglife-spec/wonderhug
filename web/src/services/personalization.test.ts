import { describe, expect, it } from 'vitest'
import { defaultProfile, recommend } from '@/services/personalization'

describe('personalizationService', () => {
  it('returns planning-oriented recommendations for planning stage', () => {
    const items = recommend(defaultProfile('planning'))
    expect(items.length).toBeGreaterThan(0)
    expect(items.some((item) => /beej|couple|planning|kitchen/i.test(item.title))).toBe(true)
  })

  it('boosts postpartum products when that goal is set', () => {
    const profile = { ...defaultProfile('new_parent'), goals: ['postpartum_recovery' as const] }
    const items = recommend(profile)
    expect(items[0]?.href).toMatch(/postpartum|super-parenting|newborn|breastfeeding/)
  })

  it('boosts Garbh Sanskar practices when that goal is set', () => {
    const items = recommend({ ...defaultProfile('pregnant'), goals: ['garbh_sanskar'] })
    expect(items.some((item) => item.kind === 'practice' || /garbh/i.test(item.title))).toBe(true)
  })

  it('surfaces birth tools in late pregnancy', () => {
    const items = recommend({ ...defaultProfile('birth_prep'), pregnancyWeek: 36, goals: ['prepare_birth'] })
    expect(items.some((item) => item.kind === 'tool' || item.href.includes('contraction'))).toBe(true)
  })
})
