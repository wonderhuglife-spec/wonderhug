import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type ConfigStatus = 'ready' | 'unconfigured'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabaseConfigStatus: ConfigStatus =
  url.length > 0 && anonKey.length > 0 ? 'ready' : 'unconfigured'

export const supabase: SupabaseClient | null =
  supabaseConfigStatus === 'ready' ? createClient(url, anonKey) : null
