import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors })
  const secret = Deno.env.get('RAZORPAY_KEY_SECRET')
  const keyId = Deno.env.get('RAZORPAY_KEY_ID')
  if (!secret || !keyId) {
    return Response.json({ mode: 'demo', message: 'Razorpay secrets not configured' }, { status: 200, headers: cors })
  }
  const { amountPaise } = await req.json()
  const auth = btoa(`${keyId}:${secret}`)
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amountPaise, currency: 'INR', receipt: `wh_${Date.now()}` }),
  })
  const json = await res.json()
  return Response.json(json, { status: res.status, headers: cors })
})
