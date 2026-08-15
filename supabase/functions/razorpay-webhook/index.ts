import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const secret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET')
  if (!secret) {
    return Response.json({ ok: false, message: 'Webhook secret not configured' }, { status: 501 })
  }
  const body = await req.text()
  const signature = req.headers.get('x-razorpay-signature') ?? ''
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ])
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(body))
  const expected = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  if (expected !== signature) return Response.json({ ok: false }, { status: 401 })

  const payload = JSON.parse(body) as { payload?: { payment?: { entity?: { id?: string; status?: string } } } }
  const payment = payload.payload?.payment?.entity
  const url = Deno.env.get('SUPABASE_URL')
  const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (url && service && payment?.id) {
    const supabase = createClient(url, service)
    await supabase.from('orders').update({ status: payment.status === 'captured' ? 'paid' : payment.status }).eq('id', payment.id)
  }
  return Response.json({ ok: true })
})
