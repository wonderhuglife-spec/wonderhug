import { applyExperts, applyGroups, applyHubs, applyPosts, applyPractices, applyProducts, applyPrograms } from '@/cms/apply'
import { fetchRemoteCms, fetchRemoteSettingsAndMedia } from '@/cms/remote'
import { seedCmsState } from '@/cms/seed'
import { mergeCmsState, normalizeState, readLocalCms } from '@/cms/store'
import type { CmsState } from '@/cms/types'
import type { BlogPost, CommunityGroup, Expert, HubPageContent, Practice, Product, Program } from '@/types/domain'

export interface Catalog {
  posts: BlogPost[]
  products: Product[]
  programs: Program[]
  experts: Expert[]
  practices: Practice[]
  groups: CommunityGroup[]
  hubs: HubPageContent[]
  settings: CmsState['settings']
  media: CmsState['media']
}

export function catalogFromState(state: CmsState): Catalog {
  return {
    posts: applyPosts(state),
    products: applyProducts(state),
    programs: applyPrograms(state),
    experts: applyExperts(state),
    practices: applyPractices(state),
    groups: applyGroups(state),
    hubs: applyHubs(state),
    settings: state.settings,
    media: state.media,
  }
}

export function seedCatalog(): Catalog {
  return catalogFromState(seedCmsState())
}

export async function loadMergedCms(opts: { includeDrafts?: boolean } = {}): Promise<CmsState> {
  const remote = await fetchRemoteCms(opts)
  const extras = await fetchRemoteSettingsAndMedia()
  let state = mergeCmsState(seedCmsState(), remote)
  if (extras.settings) state = { ...state, settings: { ...state.settings, ...extras.settings } }
  if (extras.media) state = { ...state, media: { ...state.media, ...extras.media } }
  const local = readLocalCms()
  if (local) state = mergeCmsState(state, local)
  return state
}

export async function loadCatalog(): Promise<Catalog> {
  return catalogFromState(await loadMergedCms())
}

export function catalogFromUnknown(raw: unknown): Catalog | null {
  const state = normalizeState(raw)
  return state ? catalogFromState(state) : null
}
