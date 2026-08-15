'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CartItem } from '@/types/domain'

const KEY = 'wonderhug.cart'

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

interface CartContextValue {
  items: CartItem[]
  add: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  remove: (id: string) => void
  clear: () => void
  totalPaise: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => (typeof window === 'undefined' ? [] : readCart()))

  const persist = (next: CartItem[]) => {
    setItems(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }

  const add = useCallback((item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((row) => row.id === item.id)
      const next = existing
        ? current.map((row) => (row.id === item.id ? { ...row, quantity: row.quantity + quantity } : row))
        : [...current, { ...item, quantity }]
      try {
        localStorage.setItem(KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    persist(items.filter((row) => row.id !== id))
  }, [items])

  const clear = useCallback(() => persist([]), [])

  const value = useMemo(() => {
    const totalPaise = items.reduce((sum, row) => sum + row.unitPaise * row.quantity, 0)
    const count = items.reduce((sum, row) => sum + row.quantity, 0)
    return { items, add, remove, clear, totalPaise, count }
  }, [items, add, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, row) => sum + row.unitPaise * row.quantity, 0)
}
