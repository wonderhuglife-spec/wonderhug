import type { JourneyStage } from '@/types/domain'

export const JOURNEY_ART: Record<JourneyStage, { src: string; alt: string }> = {
  planning: { src: '/images/placeholder-ai-journal-planning.png', alt: 'placeholder-ai- Planning pregnancy' },
  ttc: { src: '/images/placeholder-ai-program-beej.png', alt: 'placeholder-ai- Trying to conceive' },
  pregnant: { src: '/images/placeholder-ai-program-womb.png', alt: 'placeholder-ai- Pregnancy' },
  birth_prep: { src: '/images/placeholder-ai-tool-contractions.png', alt: 'placeholder-ai- Birth preparation' },
  new_parent: { src: '/images/placeholder-ai-journal-postpartum.png', alt: 'placeholder-ai- New parent' },
  parenting: { src: '/images/placeholder-ai-program-parenting.png', alt: 'placeholder-ai- Parenting' },
}

export const JOURNEY_HREF: Record<JourneyStage, string> = {
  planning: '/pregnancy-planning',
  ttc: '/pregnancy-planning',
  pregnant: '/pregnancy',
  birth_prep: '/pregnancy/birth-preparation',
  new_parent: '/parenting/newborn',
  parenting: '/parenting',
}
