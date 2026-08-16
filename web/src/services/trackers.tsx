import { supabase } from '@/lib/supabase'

const KEY = 'wonderhug.trackerHistory'

export type TrackerKind = 'due' | 'kicks' | 'contractions' | 'weight'

export interface TrackerEvent {
  id: string
  kind: TrackerKind
  at: string
  payload: Record<string, unknown>
}

function read(): TrackerEvent[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as TrackerEvent[]
  } catch {
    return []
  }
}

function write(rows: TrackerEvent[]) {
  localStorage.setItem(KEY, JSON.stringify(rows.slice(0, 200)))
}

export function listTracker(kind: TrackerKind): TrackerEvent[] {
  return read()
    .filter((row) => row.kind === kind)
    .sort((a, b) => a.at.localeCompare(b.at))
}

export function appendTracker(kind: TrackerKind, payload: Record<string, unknown>, signedIn: boolean) {
  const row: TrackerEvent = { id: crypto.randomUUID(), kind, at: new Date().toISOString(), payload }
  write([...read(), row])
  if (signedIn && supabase) {
    void supabase.from('tracker_entries').insert({ kind, payload })
  }
  return row
}

export function SignInToSaveNote({ signedIn }: { signedIn: boolean }) {
  if (signedIn) return null
  return (
    <p className="mt-4 text-sm text-slate">
      Saved on this device for now.{' '}
      <a className="underline" href="/signin">
        Sign in
      </a>{' '}
      to keep history across the website and the app.
    </p>
  )
}
