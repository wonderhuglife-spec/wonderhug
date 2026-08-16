import type { Locale } from '@/types/domain'

export const SITE_NAME = 'WonderHug.Life'
export const SITE_TAGLINE =
  'A trusted daily companion for the journey from preparing for pregnancy to raising a child.'

export const BRAND = {
  purple: '#79409B',
  teal: '#309292',
  navy: '#2F4275',
  tealSoft: '#F0FDFA',
  white: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E5E7EB',
  softBg: '#F8FAFA',
} as const

export const NAV_GROUPS = [
  {
    id: 'journey',
    items: [
      { to: '/pregnancy-planning', key: 'nav.planning' },
      { to: '/pregnancy', key: 'nav.pregnancy' },
      { to: '/garbh-sanskar', key: 'nav.garbh' },
      { to: '/pregnancy/birth-preparation', key: 'nav.birth' },
      { to: '/parenting', key: 'nav.parenting' },
    ],
  },
] as const

export const NAV_ITEMS = [
  { to: '/programs', key: 'nav.programs' },
  { to: '/shop', key: 'nav.shop' },
  { to: '/community', key: 'nav.community' },
  { to: '/blog', key: 'nav.blog' },
  { to: '/experts', key: 'nav.experts' },
] as const

export const PRIMARY_CTA = { to: '/start', key: 'cta.start' } as const
export const SECONDARY_CTA = { to: '/download', key: 'cta.download' } as const

export const MEDICAL_DISCLAIMER =
  'WonderHug.Life shares educational information. It is not a substitute for personal medical advice, diagnosis, or treatment. Please speak with a qualified clinician for decisions about your health, fertility, pregnancy, or your child.'

export const MEDICAL_DISCLAIMER_TE =
  'WonderHug.Life విద్యా సమాచారం పంచుకుంటుంది. ఇది వ్యక్తిగత వైద్య సలహా, నిర్ధారణ లేదా చికిత్సకు ప్రత్యామ్నాయం కాదు. మీ ఆరోగ్యం, ఫర్టిలిటీ, గర్భం లేదా మీ బిడ్డ గురించి నిర్ణయాల కోసం అర్హత కలిగిన వైద్యునితో మాట్లాడండి.'

export const LOCALES: { id: Locale; label: string; native: string }[] = [
  { id: 'en', label: 'English', native: 'English' },
]

export const GOALS = [
  { id: 'reduce_anxiety', key: 'goals.anxiety' },
  { id: 'prepare_birth', key: 'goals.birth' },
  { id: 'postpartum_recovery', key: 'goals.postpartum' },
  { id: 'garbh_sanskar', key: 'goals.garbh' },
  { id: 'nutrition', key: 'goals.nutrition' },
  { id: 'couple', key: 'goals.couple' },
] as const

export function formatInr(paise: number, locale: Locale = 'en') {
  const amount = paise / 100
  return new Intl.NumberFormat(locale === 'te' ? 'te-IN' : 'en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(iso: string, locale: Locale = 'en') {
  return new Intl.DateTimeFormat(locale === 'te' ? 'te-IN' : 'en-IN', {
    dateStyle: 'medium',
  }).format(new Date(iso))
}
