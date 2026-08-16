import { NextResponse } from 'next/server'
import { env } from '@/lib/env'

export async function POST(request: Request) {
  const body = (await request.json()) as { phone?: string; source?: string; locale?: string }
  if (!env.aisensyApiKey) {
    return NextResponse.json({ ok: false, reason: 'AiSensy API key not configured' }, { status: 200 })
  }
  return NextResponse.json({ ok: true, phone: body.phone, source: body.source, locale: body.locale })
}
