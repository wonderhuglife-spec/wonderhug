import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

serve(async (req) => {
  const api = Deno.env.get('AISENSY_API_KEY')
  const body = await req.json()
  if (!api) return Response.json({ ok: true, mode: 'logged-only', body })
  const res = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: api, campaignName: 'wonderhug-optin', destination: body.phone, userName: 'WonderHug', templateParams: [] }),
  })
  return new Response(await res.text(), { status: res.status })
})
