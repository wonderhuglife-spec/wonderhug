import { seedCmsState } from '@/cms/seed'
import {
  CMS_EVENT,
  CMS_STORAGE_KEY,
  type CmsCollection,
  type CmsItem,
  type CmsMediaOverride,
  type CmsSettings,
  type CmsState,
} from '@/cms/types'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export function emptyItem(collection: CmsCollection): CmsItem {
  const now = new Date().toISOString()
  return {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `new-${Date.now()}`,
    collection,
    slug: '',
    title: '',
    titleTe: '',
    excerpt: '',
    excerptTe: '',
    body: '',
    bodyTe: '',
    imageUrl: '',
    imageAlt: '',
    status: 'draft',
    extra: {},
    updatedAt: now,
  }
}

export function normalizeState(raw: unknown): CmsState | null {
  if (!raw || typeof raw !== 'object') return null
  const value = raw as Partial<CmsState>
  if (value.version !== 1 || !Array.isArray(value.items)) return null
  return {
    version: 1,
    items: value.items as CmsItem[],
    settings: { ...seedCmsState().settings, ...(value.settings ?? {}) },
    media: value.media ?? {},
    deletedKeys: value.deletedKeys ?? [],
  }
}

export function mergeCmsState(base: CmsState, overlay: CmsState | null): CmsState {
  if (!overlay) return clone(base)
  const byKey = new Map(base.items.map((item) => [`${item.collection}:${item.slug}`, item]))
  for (const item of overlay.items) {
    byKey.set(`${item.collection}:${item.slug}`, item)
  }
  const deletedKeys = Array.from(new Set([...(base.deletedKeys ?? []), ...(overlay.deletedKeys ?? [])]))
  return {
    version: 1,
    items: Array.from(byKey.values()).filter((item) => !deletedKeys.includes(`${item.collection}:${item.slug}`)),
    settings: { ...base.settings, ...overlay.settings },
    media: { ...base.media, ...overlay.media },
    deletedKeys,
  }
}

export function readLocalCms(): CmsState | null {
  if (!canUseStorage()) return null
  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY)
    if (!raw) return null
    return normalizeState(JSON.parse(raw))
  } catch {
    return null
  }
}

export function writeLocalCms(state: CmsState) {
  if (!canUseStorage()) return
  window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(state))
  window.dispatchEvent(new Event(CMS_EVENT))
}

export function getWorkingCms(): CmsState {
  return mergeCmsState(seedCmsState(), readLocalCms())
}

export function saveCmsItem(item: CmsItem): CmsState {
  const next = getWorkingCms()
  const updated: CmsItem = { ...item, updatedAt: new Date().toISOString(), slug: item.slug.trim() }
  const index = next.items.findIndex((row) => row.id === updated.id || (row.collection === updated.collection && row.slug === updated.slug))
  if (index >= 0) next.items[index] = updated
  else next.items.push(updated)
  next.deletedKeys = (next.deletedKeys ?? []).filter((key) => key !== cmsKey(updated.collection, updated.slug))
  writeLocalCms(next)
  return next
}

export function cmsKey(collection: CmsCollection, slug: string) {
  return `${collection}:${slug}`
}

export function deleteCmsItem(id: string): CmsState {
  const next = getWorkingCms()
  const item = next.items.find((row) => row.id === id)
  next.items = next.items.filter((row) => row.id !== id)
  if (item) next.deletedKeys = Array.from(new Set([...(next.deletedKeys ?? []), cmsKey(item.collection, item.slug)]))
  writeLocalCms(next)
  return next
}

export function saveCmsSettings(settings: CmsSettings): CmsState {
  const next = getWorkingCms()
  next.settings = settings
  writeLocalCms(next)
  return next
}

export function saveCmsMedia(key: string, override: CmsMediaOverride): CmsState {
  const next = getWorkingCms()
  next.media = { ...next.media, [key]: override }
  writeLocalCms(next)
  return next
}

export function resetLocalCms() {
  if (!canUseStorage()) return
  window.localStorage.removeItem(CMS_STORAGE_KEY)
  window.dispatchEvent(new Event(CMS_EVENT))
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}
