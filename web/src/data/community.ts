import type { CommunityGroup, CommunityPost } from '@/types/domain'

export const COMMUNITY_GROUPS: CommunityGroup[] = [
  {
    id: 'grp-planning',
    slug: 'planning-pregnancy',
    name: 'Planning Pregnancy',
    description: 'A quiet room for couples preparing — questions about lifestyle, timing and support, not comparison.',
    journeyStages: ['planning'],
  },
  {
    id: 'grp-ttc',
    slug: 'trying-to-conceive',
    name: 'Trying to Conceive',
    description: 'Companionship for the wait. Medical protocols stay with your clinic; this space is for feelings and practical tips.',
    journeyStages: ['ttc'],
  },
  {
    id: 'grp-pregnancy',
    slug: 'pregnancy',
    name: 'Pregnancy',
    description: 'Week-to-week conversation with moderation. Symptom questions are redirected toward clinicians when needed.',
    journeyStages: ['pregnant', 'birth_prep'],
  },
  {
    id: 'grp-new',
    slug: 'new-parents',
    name: 'New Parents',
    description: 'Fourth-trimester company: sleep, feeding and asking for help without guilt.',
    journeyStages: ['new_parent'],
  },
  {
    id: 'grp-breastfeeding',
    slug: 'breastfeeding',
    name: 'Breastfeeding',
    description: 'Peer support plus pointers to lactation experts. Not a replacement for in-person feeding help.',
    journeyStages: ['new_parent'],
  },
  {
    id: 'grp-dev',
    slug: 'baby-development',
    name: 'Baby Development',
    description: 'Milestones discussed as ranges, not races.',
    journeyStages: ['new_parent', 'parenting'],
  },
  {
    id: 'grp-parenting',
    slug: 'parenting',
    name: 'Parenting',
    description: 'Conscious parenting in Indian family contexts — in-laws, language, festivals and everyday limits.',
    journeyStages: ['parenting'],
  },
]

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-placeholder-1',
    groupSlug: 'planning-pregnancy',
    title: 'How are you pacing conversations with family? (CONTENT_PLACEHOLDER)',
    body: 'This is a sample thread to design the calm community layout. It is not a real member story.',
    authorLabel: 'Community member (placeholder)',
    isExpertAnswer: false,
    createdAt: '2026-08-01T09:00:00.000Z',
    dataStatus: 'CONTENT_PLACEHOLDER',
  },
  {
    id: 'post-placeholder-2',
    groupSlug: 'pregnancy',
    title: 'Garbh Sanskar in a busy week (CONTENT_PLACEHOLDER)',
    body: 'Placeholder for an expert-moderated reply pattern. No clinical instruction is implied.',
    authorLabel: 'Education note (placeholder)',
    isExpertAnswer: true,
    createdAt: '2026-08-03T09:00:00.000Z',
    dataStatus: 'CONTENT_PLACEHOLDER',
  },
]
