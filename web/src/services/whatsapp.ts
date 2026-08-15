import { supabase } from '@/lib/supabase'
import { track } from '@/services/analytics'

export function whatsappUrl(text?: string) {
  const base = import.meta.env.VITE_AISENSY_WHATSAPP_URL || 'https://wa.me/'
  if (!text) return base
  const joiner = base.includes('?') ? '&' : '?'
  return `${base}${joiner}text=${encodeURIComponent(text)}`
}

export async function captureWhatsappLead(phone: string, source: string, locale: string) {
  track('community_opened', { channel: 'whatsapp', source })
  if (supabase) {
    await supabase.from('whatsapp_leads').insert({ phone, source, locale })
  }
  const api = import.meta.env.VITE_AISENSY_API_KEY
  if (api) {
    await fetch('/api/aisensy-optin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, source, locale }),
    }).catch(() => undefined)
  }
}
