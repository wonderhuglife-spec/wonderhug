import { describe, expect, it } from 'vitest'
import { dueDateFromLmp, gestationalWeek, parseIsoDate } from '@/utils/dueDate'
import { cartTotal } from '@/hooks/useCart'
import { recommend, defaultProfile } from '@/services/personalization'

describe('due date calculator', () => {
  it('adds 280 days', () => {
    const lmp = parseIsoDate('2026-01-01')!
    expect(dueDateFromLmp(lmp).toISOString().slice(0, 10)).toBe('2026-10-08')
  })

  it('computes gestational week', () => {
    const lmp = new Date()
    lmp.setDate(lmp.getDate() - 20)
    expect(gestationalWeek(lmp)).toBeGreaterThanOrEqual(3)
  })
})

describe('cart', () => {
  it('sums paise', () => {
    expect(
      cartTotal([
        { kind: 'product', id: 'a', slug: 'a', title: 'A', unitPaise: 10000, quantity: 2 },
        { kind: 'program', id: 'b', slug: 'b', title: 'B', unitPaise: 5000, quantity: 1 },
      ]),
    ).toBe(25000)
  })
})

describe('recommendation engine week window', () => {
  it('still returns items when week is set in third trimester', () => {
    const items = recommend({ ...defaultProfile('pregnant'), pregnancyWeek: 34, goals: ['prepare_birth'] })
    expect(items.some((i) => i.kind === 'tool' || i.kind === 'program')).toBe(true)
  })
})
