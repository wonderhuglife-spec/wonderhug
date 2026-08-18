import type { CmsCollection, CmsItem } from '@/cms/types'

export type FieldType = 'text' | 'textarea' | 'select' | 'number'

export interface EditorField {
  key: keyof CmsItem | `extra.${string}`
  label: string
  type: FieldType
  hint?: string
  options?: { value: string; label: string }[]
}

const CATEGORY_OPTIONS = [
  'Pregnancy',
  'Fertility',
  'Parenting',
  'Baby Development',
  'Nutrition',
  'Birth Preparation',
  'Postpartum',
  'Expert Advice',
  'Emotional Wellbeing',
  'Indian Traditions',
  'Garbh Sanskar',
].map((value) => ({ value, label: value }))

export function editorFields(collection: CmsCollection): EditorField[] {
  const common: EditorField[] = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'slug', label: 'Slug / URL', type: 'text', hint: 'Pages use a path like /pregnancy. Posts and products use a short slug.' },
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: 'draft', label: 'Draft' },
      { value: 'published', label: 'Published' },
    ] },
    { key: 'excerpt', label: 'Excerpt / summary', type: 'textarea' },
    { key: 'body', label: 'Body', type: 'textarea' },
    { key: 'imageUrl', label: 'Image URL', type: 'text' },
    { key: 'imageAlt', label: 'Image alt text', type: 'text' },
  ]

  if (collection === 'posts') {
    return [
      ...common,
      { key: 'extra.category', label: 'Category', type: 'select', options: CATEGORY_OPTIONS },
      { key: 'extra.tags', label: 'Tags (comma separated)', type: 'text' },
      { key: 'extra.authorName', label: 'Author name', type: 'text' },
      { key: 'extra.seoTitle', label: 'SEO title', type: 'text' },
      { key: 'extra.seoDescription', label: 'SEO description', type: 'textarea' },
      { key: 'titleTe', label: 'Title (Telugu, optional)', type: 'text' },
      { key: 'bodyTe', label: 'Body (Telugu, optional)', type: 'textarea' },
    ]
  }
  if (collection === 'pages') {
    return [
      ...common,
      { key: 'extra.kicker', label: 'Kicker', type: 'text' },
      { key: 'extra.seoTitle', label: 'SEO title', type: 'text' },
      { key: 'extra.seoDescription', label: 'SEO description', type: 'textarea' },
      { key: 'extra.related', label: 'Related links (Label|/path per line)', type: 'textarea' },
    ]
  }
  if (collection === 'products') {
    return [
      ...common,
      { key: 'extra.pricePaise', label: 'Price (paise, e.g. 49900 = ₹499)', type: 'number' },
      { key: 'extra.category', label: 'Category', type: 'text' },
    ]
  }
  if (collection === 'programs') {
    return [
      ...common,
      { key: 'extra.pricePaise', label: 'Price (paise)', type: 'number' },
      { key: 'extra.durationWeeks', label: 'Duration (weeks)', type: 'number' },
      { key: 'extra.level', label: 'Level', type: 'select', options: [
        { value: 'all', label: 'All' },
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
      ] },
      { key: 'extra.instructorName', label: 'Instructor label', type: 'text', hint: 'Use a faculty seat name unless a person is verified.' },
    ]
  }
  if (collection === 'experts') {
    return [
      ...common,
      { key: 'extra.speciality', label: 'Speciality', type: 'text' },
      { key: 'extra.qualification', label: 'Qualification', type: 'text', hint: 'Do not invent hospital names or medical degrees.' },
      { key: 'extra.availability', label: 'Availability', type: 'text' },
      { key: 'extra.bookingUrl', label: 'Booking URL', type: 'text' },
    ]
  }
  if (collection === 'practices') {
    return [
      ...common,
      { key: 'extra.durationMinutes', label: 'Duration (minutes)', type: 'number' },
      { key: 'extra.mediaType', label: 'Media type', type: 'select', options: [
        { value: 'guide', label: 'Guide' },
        { value: 'audio', label: 'Audio' },
        { value: 'video', label: 'Video' },
      ] },
      { key: 'extra.trimester', label: 'Trimester', type: 'select', options: [
        { value: 'any', label: 'Any' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
      ] },
    ]
  }
  return [
    ...common,
    { key: 'extra.journeyStages', label: 'Journey stages (comma separated)', type: 'text' },
  ]
}

export function readField(item: CmsItem, field: EditorField): string {
  if (field.key.startsWith('extra.')) {
    return item.extra[field.key.slice(6)] ?? ''
  }
  const value = item[field.key as keyof CmsItem]
  return typeof value === 'string' ? value : ''
}

export function writeField(item: CmsItem, field: EditorField, value: string): CmsItem {
  if (field.key.startsWith('extra.')) {
    return { ...item, extra: { ...item.extra, [field.key.slice(6)]: value } }
  }
  return { ...item, [field.key]: value }
}
