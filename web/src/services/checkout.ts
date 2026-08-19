import type { CartItem, Order } from '@/types/domain'
import { cartTotal } from '@/hooks/useCart'
import { supabase } from '@/lib/supabase'
import { publicSupabaseKey, publicSupabaseUrl } from '@/lib/supabaseKeys'
import { track } from '@/services/analytics'
import { enrollLocal } from '@/services/lms'

const KEY = 'wonderhug.orders'

function loadOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as Order[]
  } catch {
    return []
  }
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(KEY, JSON.stringify(orders))
}

export function listLocalOrders(): Order[] {
  return loadOrders()
}

export function programAccessFromOrders(): string[] {
  return loadOrders()
    .filter((order) => order.status === 'paid')
    .flatMap((order) => order.items.filter((item) => item.kind === 'program').map((item) => item.slug))
}

export async function placeOrder(items: CartItem[], email?: string, phone?: string): Promise<Order> {
  if (items.length === 0) throw new Error('Cart is empty')
  const amountPaise = cartTotal(items)
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''
  const mode = key ? 'razorpay' : 'demo'

  if (mode === 'razorpay' && typeof window !== 'undefined') {
    await loadRazorpay()
    const razorpayOrderId = await createServerOrder(amountPaise)
    const order = await openRazorpay({ amountPaise, key, items, email, phone, razorpayOrderId })
    await persistRemote(order, email, phone)
    persist(order)
    return order
  }

  const order: Order = {
    id: `demo_${crypto.randomUUID()}`,
    status: 'paid',
    amountPaise,
    items,
    createdAt: new Date().toISOString(),
    checkoutMode: 'demo',
  }
  await persistRemote(order, email, phone)
  persist(order)
  track('tool_used', { tool: 'checkout', mode: 'demo' })
  return order
}

async function persistRemote(order: Order, email?: string, phone?: string) {
  if (!supabase) return
  await supabase.from('orders').insert({
    id: order.id,
    status: order.status,
    amount_paise: order.amountPaise,
    checkout_mode: order.checkoutMode,
    email,
    phone,
  })
}

function persist(order: Order) {
  saveOrders([order, ...loadOrders().filter((row) => row.id !== order.id)])
  for (const item of order.items) {
    if (item.kind === 'program') enrollLocal(item.slug)
  }
}

async function createServerOrder(amountPaise: number): Promise<string | undefined> {
  const url = publicSupabaseUrl()
  const anon = publicSupabaseKey()
  if (!url || !anon) return undefined
  try {
    const res = await fetch(`${url}/functions/v1/create-razorpay-order`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${anon}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountPaise }),
    })
    const json = (await res.json()) as { id?: string; mode?: string }
    return json.id
  } catch {
    return undefined
  }
}

async function loadRazorpay() {
  if (document.querySelector('script[data-razorpay]')) return
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.dataset.razorpay = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Razorpay failed to load'))
    document.body.appendChild(script)
  })
}

async function openRazorpay(opts: {
  amountPaise: number
  key: string
  items: CartItem[]
  email?: string
  phone?: string
  razorpayOrderId?: string
}): Promise<Order> {
  return new Promise((resolve, reject) => {
    const RazorpayCtor = (window as unknown as { Razorpay: new (o: Record<string, unknown>) => { open: () => void } })
      .Razorpay
    const rz = new RazorpayCtor({
      key: opts.key,
      amount: opts.amountPaise,
      currency: 'INR',
      name: 'WonderHug.Life',
      description: opts.items.map((i) => i.title).join(', '),
      order_id: opts.razorpayOrderId,
      prefill: { email: opts.email, contact: opts.phone },
      handler: (response: { razorpay_payment_id: string }) => {
        resolve({
          id: response.razorpay_payment_id,
          status: 'paid',
          amountPaise: opts.amountPaise,
          items: opts.items,
          createdAt: new Date().toISOString(),
          checkoutMode: 'razorpay',
        })
      },
    })
    rz.open()
    window.setTimeout(() => reject(new Error('Checkout closed')), 15 * 60 * 1000)
  })
}
