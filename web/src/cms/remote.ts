import { readAdminSession } from '@/cms/adminAuth'
import { supabase } from '@/lib/supabase'
import { createServerSupabase } from '@/lib/supabase-server'
import { publishedOnly } from '@/cms/apply'
import { normalizeState } from '@/cms/store'
import {
  CMS_MEDIA_BLOCK,
  CMS_PUBLISHED_BLOCK,
  CMS_SETTINGS_BLOCK,
  CMS_STAFF_BLOCK,
  type CmsState,
} from '@/cms/types'

function db() {
  return supabase ?? createServerSupabase()
}

export async function fetchRemoteCms(opts: { includeDrafts?: boolean } = {}): Promise<CmsState | null> {
  const client = db()
  if (!client) return null
  const key = opts.includeDrafts ? CMS_STAFF_BLOCK : CMS_PUBLISHED_BLOCK
  const { data, error } = await client.from('cms_blocks').select('payload').eq('block_key', key).maybeSingle()
  if (error || !data?.payload) {
    if (opts.includeDrafts) {
      const published = await client.from('cms_blocks').select('payload').eq('block_key', CMS_PUBLISHED_BLOCK).maybeSingle()
      return normalizeState(published.data?.payload)
    }
    return null
  }
  return normalizeState(data.payload)
}

export async function fetchRemoteSettingsAndMedia(): Promise<{ settings?: Partial<CmsState['settings']>; media?: CmsState['media'] }> {
  const client = db()
  if (!client) return {}
  const { data } = await client.from('cms_blocks').select('block_key, payload').in('block_key', [CMS_SETTINGS_BLOCK, CMS_MEDIA_BLOCK])
  const out: { settings?: Partial<CmsState['settings']>; media?: CmsState['media'] } = {}
  for (const row of data ?? []) {
    if (row.block_key === CMS_SETTINGS_BLOCK) {
      const payload = (row.payload ?? {}) as Record<string, unknown>
      out.settings = {
        heroBody: typeof payload.body === 'string' ? payload.body : typeof payload.heroBody === 'string' ? payload.heroBody : undefined,
        heroTitle: typeof payload.title === 'string' ? payload.title : typeof payload.heroTitle === 'string' ? payload.heroTitle : undefined,
        heroKicker: typeof payload.kicker === 'string' ? payload.kicker : undefined,
        heroImageUrl: typeof payload.imageUrl === 'string' ? payload.imageUrl : undefined,
        heroImageAlt: typeof payload.imageAlt === 'string' ? payload.imageAlt : undefined,
        siteTagline: typeof payload.siteTagline === 'string' ? payload.siteTagline : undefined,
      }
    }
    if (row.block_key === CMS_MEDIA_BLOCK) {
      out.media = (row.payload ?? {}) as CmsState['media']
    }
  }
  return out
}

export async function persistRemoteCms(state: CmsState): Promise<string | null> {
  const client = supabase
  if (!client) return 'Supabase is not configured. Content is saved in this browser until you add keys.'
  const published = publishedOnly(state)
  const settingsPayload = {
    body: state.settings.heroBody,
    title: state.settings.heroTitle,
    kicker: state.settings.heroKicker,
    heroBody: state.settings.heroBody,
    heroTitle: state.settings.heroTitle,
    imageUrl: state.settings.heroImageUrl,
    imageAlt: state.settings.heroImageAlt,
    siteTagline: state.settings.siteTagline,
  }
  const session = readAdminSession()
  if (session?.token && session.token !== 'bootstrap') {
    const { data, error } = await client.rpc('cms_save_state', {
      p_token: session.token,
      p_staff: state,
      p_published: published,
      p_settings: settingsPayload,
      p_media: state.media,
    })
    const payload = data as { ok?: boolean; error?: string } | null
    if (payload?.ok) return null
    if (error && !/could not find|schema cache|function/i.test(error.message)) return error.message
    if (payload && payload.ok === false) return payload.error ?? 'Could not save to Supabase.'
    return 'Apply supabase/migrations/20260821120000_cms_save_catalog.sql in the SQL editor (paste the file contents, not the path), then sign in again. Catalogue tables cannot be written with the public key.'
  }
  return 'Sign in again with your CMS username (any admin from Admin users). Local-only starter sessions cannot write catalogue tables.'
}
