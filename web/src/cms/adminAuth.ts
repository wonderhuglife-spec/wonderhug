'use client'

import { supabase } from '@/lib/supabase'

const KEY = 'wonderhug_admin_session'

export type AdminSession = {
  token: string
  username: string
  displayName: string
  source: 'supabase' | 'bootstrap'
}

export function readAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as AdminSession) : null
  } catch {
    return null
  }
}

function writeAdminSession(session: AdminSession | null) {
  if (typeof window === 'undefined') return
  if (!session) window.sessionStorage.removeItem(KEY)
  else window.sessionStorage.setItem(KEY, JSON.stringify(session))
  window.dispatchEvent(new Event('wonderhug-admin-session'))
}

type RpcLogin = { ok?: boolean; token?: string; username?: string; displayName?: string; error?: string }

export async function loginAdmin(username: string, password: string): Promise<string | null> {
  const user = username.trim().toLowerCase()
  if (supabase) {
    const { data, error } = await supabase.rpc('cms_admin_login', { p_username: user, p_password: password })
    const payload = data as RpcLogin | null
    if (payload?.ok && payload.token && payload.username) {
      writeAdminSession({
        token: String(payload.token),
        username: payload.username,
        displayName: payload.displayName || payload.username,
        source: 'supabase',
      })
      return null
    }
    if (error && !/could not find|schema cache|function/i.test(error.message)) {
      return payload?.error || error.message || 'Unable to sign in.'
    }
    if (payload && payload.ok === false) return payload.error || 'Invalid username or password.'
  }

  if (user === 'adminmani' && password === 'maniadmin') {
    writeAdminSession({
      token: 'bootstrap',
      username: 'adminmani',
      displayName: 'WonderHug admin',
      source: 'bootstrap',
    })
    return null
  }

  if (!supabase) return 'Supabase is not connected, and that is not the starter admin account.'
  return 'Invalid username or password.'
}

export function logoutAdmin() {
  writeAdminSession(null)
}

export async function verifyAdminSession(session: AdminSession | null): Promise<AdminSession | null> {
  if (!session) return null
  if (supabase) {
    if (session.token === 'bootstrap' || session.source === 'bootstrap') return null
    const { data } = await supabase.rpc('cms_admin_verify', { p_token: session.token })
    const payload = data as RpcLogin | null
    if (payload?.ok) {
      return {
        ...session,
        username: payload.username || session.username,
        displayName: payload.displayName || session.displayName,
      }
    }
    return null
  }
  if (session.source === 'bootstrap' || session.token === 'bootstrap') return session
  return null
}

export async function listAdminUsers(session: AdminSession) {
  if (!supabase || session.source === 'bootstrap') {
    return { ok: true as const, users: [{ id: 'local', username: session.username, displayName: session.displayName, createdAt: new Date().toISOString() }], notice: supabase ? 'Apply the cms_admin_auth migration to add more admins in Supabase.' : 'Connect Supabase to add more admin users.' }
  }
  const { data, error } = await supabase.rpc('cms_admin_list', { p_token: session.token })
  const payload = data as { ok?: boolean; users?: { id: string; username: string; displayName: string; createdAt: string }[]; error?: string } | null
  if (error) return { ok: false as const, error: error.message }
  if (!payload?.ok) return { ok: false as const, error: payload?.error || 'Unable to list admins.' }
  return { ok: true as const, users: payload.users ?? [] }
}

export async function createAdminUser(session: AdminSession, username: string, password: string, displayName: string) {
  if (!supabase || session.source === 'bootstrap') {
    return { ok: false as const, error: 'Connect Supabase and apply the cms_admin_auth migration before adding more admins.' }
  }
  const { data, error } = await supabase.rpc('cms_admin_create', {
    p_token: session.token,
    p_username: username,
    p_password: password,
    p_display_name: displayName,
  })
  const payload = data as { ok?: boolean; error?: string } | null
  if (error) return { ok: false as const, error: error.message }
  if (!payload?.ok) return { ok: false as const, error: payload?.error || 'Unable to create admin.' }
  return { ok: true as const }
}
