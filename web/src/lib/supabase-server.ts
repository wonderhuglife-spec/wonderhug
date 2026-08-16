import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client. Reads both the public Next.js keys and the
 * server-only aliases (SUPABASE_URL / SUPABASE_ANON_KEY) so App Router
 * data fetching does not depend on the old Vite VITE_ prefix.
 */
export function createServerSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  if (!url || !anon) return null
  return createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } })
}
