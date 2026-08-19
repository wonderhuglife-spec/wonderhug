import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { publicSupabaseKey, publicSupabaseUrl } from '@/lib/supabaseKeys'

/**
 * Server-only Supabase client. Accepts the new publishable key
 * (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) as well as the legacy anon JWT.
 */
export function createServerSupabase(): SupabaseClient | null {
  const url = publicSupabaseUrl()
  const anon = publicSupabaseKey()
  if (!url || !anon) return null
  return createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } })
}
