export type CmsCollection =
  | 'posts'
  | 'pages'
  | 'products'
  | 'programs'
  | 'experts'
  | 'practices'
  | 'groups'

export type CmsStatus = 'draft' | 'published'

export interface CmsItem {
  id: string
  collection: CmsCollection
  slug: string
  title: string
  titleTe: string
  excerpt: string
  excerptTe: string
  body: string
  bodyTe: string
  imageUrl: string
  imageAlt: string
  status: CmsStatus
  extra: Record<string, string>
  updatedAt: string
}

export interface CmsSettings {
  heroKicker: string
  heroTitle: string
  heroBody: string
  heroImageUrl: string
  heroImageAlt: string
  siteTagline: string
}

export interface CmsMediaOverride {
  src: string
  alt: string
}

export interface CmsState {
  version: 1
  items: CmsItem[]
  settings: CmsSettings
  media: Record<string, CmsMediaOverride>
  deletedKeys: string[]
}

export const CMS_COLLECTIONS: { id: CmsCollection; label: string; singular: string; description: string }[] = [
  { id: 'posts', label: 'Posts', singular: 'Post', description: 'Journal articles on the public blog.' },
  { id: 'pages', label: 'Pages', singular: 'Page', description: 'Topic hubs such as Pregnancy and Garbh Sanskar.' },
  { id: 'products', label: 'Products', singular: 'Product', description: 'Shop catalogue with INR prices.' },
  { id: 'programs', label: 'Programmes', singular: 'Programme', description: 'Beej Sanskar, Womb Care, Super Parenting.' },
  { id: 'experts', label: 'Faculty', singular: 'Faculty seat', description: 'Named people only after verification — seats are placeholders.' },
  { id: 'practices', label: 'Practices', singular: 'Practice', description: 'Garbh Sanskar practice library.' },
  { id: 'groups', label: 'Community', singular: 'Room', description: 'Moderated community rooms.' },
]

export const CMS_STORAGE_KEY = 'wonderhug_cms_v1'
export const CMS_EVENT = 'wonderhug-cms-changed'
export const CMS_PUBLISHED_BLOCK = 'cms_published'
export const CMS_STAFF_BLOCK = 'staff_cms'
export const CMS_SETTINGS_BLOCK = 'homepage_hero'
export const CMS_MEDIA_BLOCK = 'media_assets'
