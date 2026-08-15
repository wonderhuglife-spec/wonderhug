import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type ConfigStatus = 'ready' | 'CONFIG_REQUIRED'

const url = import.meta.env.VITE_SUPABASE_URL ?? ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabaseConfigStatus: ConfigStatus =
  url.length > 0 && anonKey.length > 0 ? 'ready' : 'CONFIG_REQUIRED'

export const supabase: SupabaseClient | null =
  supabaseConfigStatus === 'ready' ? createClient(url, anonKey) : null
