import { publicSupabaseKey, publicSupabaseUrl } from '@/lib/supabaseKeys'

export type ConfigStatus = 'ready' | 'unconfigured'

function read(name: string, fallback = '') {
  return process.env[name] ?? fallback
}

export const env = {
  supabaseUrl: publicSupabaseUrl(),
  supabaseAnonKey: publicSupabaseKey(),
  siteUrl: read('NEXT_PUBLIC_SITE_URL', 'https://wonderhug.life'),
  razorpayKeyId: read('NEXT_PUBLIC_RAZORPAY_KEY_ID'),
  aisensyWhatsappUrl: read('NEXT_PUBLIC_AISENSY_WHATSAPP_URL', 'https://wa.me/'),
  aisensyApiKey: read('NEXT_PUBLIC_AISENSY_API_KEY'),
}

export const supabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey)
export const razorpayConfigured = Boolean(env.razorpayKeyId)
export const isDev = process.env.NODE_ENV !== 'production'
