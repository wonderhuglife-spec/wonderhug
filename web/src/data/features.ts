import type { JourneyStage, RecommendedItem } from '@/types/domain'

export const FEATURE_ECOSYSTEM: RecommendedItem[] = [
  {
    id: 'feat-planning',
    kind: 'activity',
    title: 'Pregnancy Planning',
    description:
      'A calm sequence for couples who want to prepare body, mind and home before conception — education, not treatment.',
    href: '/pregnancy-planning',
    stageFit: ['planning', 'ttc'],
  },
  {
    id: 'feat-garbh',
    kind: 'activity',
    title: 'Garbh Sanskar',
    description:
      'Music, stories, rest and ritual offered as cultural practice. WonderHug does not claim clinical outcomes from tradition.',
    href: '/pregnancy',
    stageFit: ['pregnant', 'birth_prep', 'planning'],
  },
  {
    id: 'feat-activities',
    kind: 'activity',
    title: 'Pregnancy Planning Activities',
    description: 'Short daily practices you can actually finish — journaling, walks, couple check-ins.',
    href: '/tools',
    stageFit: ['planning', 'ttc'],
  },
  {
    id: 'feat-yoga',
    kind: 'activity',
    title: 'Fertility-Support Yoga',
    description:
      'Gentle movement sessions framed as wellbeing support. Not a fertility treatment or success-rate programme.',
    href: '/pregnancy-planning/lifestyle',
    stageFit: ['planning', 'ttc'],
  },
  {
    id: 'feat-diet',
    kind: 'article',
    title: 'Fertility-Support Diet',
    description:
      'Kitchen-level nutrition education from our content library. Personal medical diets belong with your clinician.',
    href: '/pregnancy-planning/nutrition',
    stageFit: ['planning', 'ttc', 'pregnant'],
  },
  {
    id: 'feat-sessions',
    kind: 'expert',
    title: 'Weekly Expert Sessions',
    description: 'Live education with named, verified specialists once those profiles are published.',
    href: '/experts',
    stageFit: ['planning', 'ttc', 'pregnant', 'birth_prep', 'new_parent', 'parenting'],
  },
  {
    id: 'feat-tools',
    kind: 'tool',
    title: 'Planning Tools',
    description: 'Checklists and trackers that stay on your device until you choose to sync an account.',
    href: '/tools',
    stageFit: ['planning', 'ttc', 'pregnant'],
  },
  {
    id: 'feat-couple',
    kind: 'activity',
    title: 'Couple Readiness Practices',
    description: 'Conversation prompts so both partners feel informed — without assigning blame or pressure.',
    href: '/pregnancy-planning/couple-readiness',
    stageFit: ['planning', 'ttc'],
  },
  {
    id: 'feat-counsellor',
    kind: 'expert',
    title: 'Counsellor Support',
    description: 'Space for anxiety, grief and relationship strain. Availability depends on verified counsellors.',
    href: '/experts',
    stageFit: ['ttc', 'pregnant', 'new_parent', 'parenting'],
  },
  {
    id: 'feat-parenting',
    kind: 'article',
    title: 'Parenting',
    description: 'Everyday guidance as your child grows — routines, language and emotional safety.',
    href: '/parenting',
    stageFit: ['new_parent', 'parenting'],
  },
]

export const STAGE_NARRATIVE: Record<JourneyStage, { title: string; body: string }> = {
  planning: {
    title: 'You are preparing, not rushing.',
    body: 'WonderHug will surface planning nutrition, couple practices and gentle lifestyle education first.',
  },
  ttc: {
    title: 'Trying is a season, not a test.',
    body: 'Recommendations stay practical and kind — yoga, diet education, counsellor access and community with people in the same chapter.',
  },
  pregnant: {
    title: 'This week can feel full. We will keep it simple.',
    body: 'Expect Garbh Sanskar practices, pregnancy education and tools that respect your clinician’s advice.',
  },
  birth_prep: {
    title: 'Birth preparation, without scare stories.',
    body: 'We will emphasise preferences, support people and recovery — not dramatic labour narratives.',
  },
  new_parent: {
    title: 'The fourth trimester is still a journey.',
    body: 'Feeding, rest, baby cues and your own recovery sit at the centre of what we recommend.',
  },
  parenting: {
    title: 'Raising with attention, not perfection.',
    body: 'Content shifts toward development, language and the everyday work of conscious parenting.',
  },
}
