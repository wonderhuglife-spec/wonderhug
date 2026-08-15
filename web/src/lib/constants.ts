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

export const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/pregnancy', label: 'Pregnancy' },
  { to: '/pregnancy-planning', label: 'Pregnancy Planning' },
  { to: '/parenting', label: 'Parenting' },
  { to: '/experts', label: 'Experts' },
  { to: '/community', label: 'Community' },
  { to: '/tools', label: 'Tools' },
  { to: '/blog', label: 'Blogs' },
  { to: '/about', label: 'About' },
] as const

export const PRIMARY_CTA = { to: '/start', label: 'Start Your Journey' } as const
export const SECONDARY_CTA = { to: '/download', label: 'Download App' } as const

export const MEDICAL_DISCLAIMER =
  'WonderHug.Life shares educational information. It is not a substitute for personal medical advice, diagnosis, or treatment. Please speak with a qualified clinician for decisions about your health, fertility, pregnancy, or your child.'
