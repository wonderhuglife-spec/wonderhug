import type { JourneyStage } from '@/types/domain'

export const JOURNEY_ART: Record<JourneyStage, { src: string; alt: string }> = {
  planning: { src: '/images/photo-chapter-expecting.png', alt: 'Photoreal still — planning at a kitchen table' },
  ttc: { src: '/images/photo-chapter-learning.png', alt: 'Photoreal still — seeds and flowers' },
  pregnant: { src: '/images/photo-chapter-growing.png', alt: 'Photoreal still — courtyard rest' },
  birth_prep: { src: '/images/photo-chapter-preparing.png', alt: 'Photoreal still — packed bag' },
  new_parent: { src: '/images/photo-chapter-parenting.png', alt: 'Photoreal still — newborn rest' },
  parenting: { src: '/images/photo-chapter-parenting.png', alt: 'Photoreal still — parenting at home' },
}

export const JOURNEY_HREF: Record<JourneyStage, string> = {
  planning: '/pregnancy-planning',
  ttc: '/pregnancy-planning',
  pregnant: '/pregnancy',
  birth_prep: '/pregnancy/birth-preparation',
  new_parent: '/parenting/newborn',
  parenting: '/parenting',
}
