import type { JourneyStage } from '@/types/domain'

export const JOURNEY_ART: Record<JourneyStage, { src: string; alt: string }> = {
  planning: { src: '/images/photo-chapter-expecting.png', alt: 'A couple planning pregnancy together at home' },
  ttc: { src: '/images/placeholder-ai-program-beej.png', alt: 'A couple preparing to conceive together' },
  pregnant: { src: '/images/photo-chapter-growing.png', alt: 'A pregnant woman resting at home' },
  birth_prep: { src: '/images/photo-chapter-preparing.png', alt: 'A pregnant woman packing a hospital bag' },
  new_parent: { src: '/images/photo-chapter-parenting.png', alt: 'A parent holding a newborn' },
  parenting: { src: '/images/placeholder-ai-program-parenting.png', alt: 'A parent with a toddler and a baby at home' },
}

export const JOURNEY_HREF: Record<JourneyStage, string> = {
  planning: '/pregnancy-planning',
  ttc: '/pregnancy-planning',
  pregnant: '/pregnancy',
  birth_prep: '/pregnancy/birth-preparation',
  new_parent: '/parenting/newborn',
  parenting: '/parenting',
}
