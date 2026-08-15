import type { TeamMember } from '@/types/domain'

/** Named people are not invented. Slots exist for the interactive About section. */
export const TEAM: TeamMember[] = [
  {
    id: 'team-founding',
    name: 'To be announced',
    role: 'Founding team',
    description:
      'WonderHug will publish named founders here with verified biographies. This portrait slot is a design placeholder, not a real person.',
    portrait: '/images/portrait-placeholder.svg',
    dataStatus: 'REQUIRES_VERIFIED_DATA',
  },
  {
    id: 'team-clinical',
    name: 'To be announced',
    role: 'Clinical advisory',
    description:
      'Medical reviewers will be listed with qualification and last-reviewed dates. No clinician is named until WonderHug supplies credentials.',
    portrait: '/images/portrait-placeholder.svg',
    dataStatus: 'REQUIRES_VERIFIED_DATA',
  },
  {
    id: 'team-experience',
    name: 'To be announced',
    role: 'Product & experience',
    description:
      'The people shaping the daily companion — website, app and tools — will appear with real photos when available.',
    portrait: '/images/portrait-placeholder.svg',
    dataStatus: 'REQUIRES_VERIFIED_DATA',
  },
  {
    id: 'team-community',
    name: 'To be announced',
    role: 'Community & care',
    description:
      'Moderation and community design sit with humans. Names will be added after verification, not invented for launch mock-ups.',
    portrait: '/images/portrait-placeholder.svg',
    dataStatus: 'REQUIRES_VERIFIED_DATA',
  },
]
