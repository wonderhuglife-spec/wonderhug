import { describe, expect, it, beforeEach } from 'vitest'
import { placeOrder, listLocalOrders, programAccessFromOrders } from '@/services/checkout'
import type { CartItem } from '@/types/domain'

const items: CartItem[] = [
  { kind: 'product', id: 'p1', slug: 'garbh-sanskar-daily-pack', title: 'Pack', unitPaise: 49900, quantity: 1 },
  { kind: 'program', id: 'pr1', slug: 'womb-care', title: 'Womb Care', unitPaise: 199900, quantity: 1 },
]

describe('checkout', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('records a demo paid order and program access', async () => {
    const order = await placeOrder(items, 'test@wonderhug.life', '+919999999999')
    expect(order.checkoutMode).toBe('demo')
    expect(order.status).toBe('paid')
    expect(order.amountPaise).toBe(249800)
    expect(listLocalOrders()[0]?.id).toBe(order.id)
    expect(programAccessFromOrders()).toContain('womb-care')
  })

  it('rejects an empty cart', async () => {
    await expect(placeOrder([])).rejects.toThrow(/empty/i)
  })
})
