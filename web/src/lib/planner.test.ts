import { describe, expect, it } from 'vitest'
import { emiPaise, programForPlanner } from '@/lib/planner'

describe('planner programmes', () => {
  it('maps planning, pregnancy and parenting to published programmes', () => {
    expect(programForPlanner('planning').slug).toBe('beej-sanskar')
    expect(programForPlanner('pregnant').slug).toBe('womb-care')
    expect(programForPlanner('parenting').slug).toBe('super-parenting')
  })

  it('splits a full price into three EMI amounts', () => {
    expect(emiPaise(499900)).toBe(166634)
    expect(emiPaise(249900)).toBe(83300)
  })
})
