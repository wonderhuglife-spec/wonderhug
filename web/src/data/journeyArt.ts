import type { JourneyStage } from '@/types/domain'

export const JOURNEY_ART: Record<JourneyStage, { src: string; alt: string }> = {
  planning: {
    src: '/images/photo-chapter-expecting.png',
    alt: 'A couple planning pregnancy together at the kitchen table',
  },
  ttc: {
    src: '/images/placeholder-ai-program-beej.png',
    alt: 'A couple preparing to conceive with a quiet home ritual',
  },
  pregnant: {
    src: '/images/photo-chapter-growing.png',
    alt: 'A pregnant woman resting in a home courtyard',
  },
  birth_prep: {
    src: '/images/photo-chapter-preparing.png',
    alt: 'Packing a hospital bag and baby clothes at home',
  },
  new_parent: {
    src: '/images/photo-chapter-newborn.png',
    alt: 'A new parent holding a sleeping newborn',
  },
  parenting: {
    src: '/images/photo-chapter-parenting.png',
    alt: 'A parent playing on the floor with a toddler and baby',
  },
}

export const JOURNEY_HREF: Record<JourneyStage, string> = {
  planning: '/pregnancy-planning',
  ttc: '/pregnancy-planning',
  pregnant: '/pregnancy',
  birth_prep: '/pregnancy/birth-preparation',
  new_parent: '/parenting/newborn',
  parenting: '/parenting',
}
