import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { publicSupabaseKey, publicSupabaseUrl } from '@/lib/supabaseKeys'

export type ConfigStatus = 'ready' | 'unconfigured'

const url = publicSupabaseUrl()
const anonKey = publicSupabaseKey()

export const supabaseConfigStatus: ConfigStatus =
  url.length > 0 && anonKey.length > 0 ? 'ready' : 'unconfigured'

export const supabase: SupabaseClient | null =
  supabaseConfigStatus === 'ready' ? createClient(url, anonKey) : null
