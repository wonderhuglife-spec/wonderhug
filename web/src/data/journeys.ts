import type { JourneyStage } from '@/types/domain'

export interface JourneyOption {
  id: JourneyStage
  label: string
  prompt: string
}

export const JOURNEY_OPTIONS: JourneyOption[] = [
  {
    id: 'planning',
    label: 'Planning Pregnancy',
    prompt: 'Build shared rhythms, nutrition habits and calm before you try to conceive.',
  },
  {
    id: 'ttc',
    label: 'Trying to Conceive',
    prompt: 'Steady, practical support while you wait, hope and look after yourselves.',
  },
  {
    id: 'pregnant',
    label: 'Pregnant',
    prompt: 'Week-aware guidance, Garbh Sanskar practices and expert-reviewed education.',
  },
  {
    id: 'birth_prep',
    label: 'Preparing for Birth',
    prompt: 'Birth preferences, body preparation and emotional readiness — without fear-based language.',
  },
  {
    id: 'new_parent',
    label: 'New Parent',
    prompt: 'Postpartum recovery, feeding support and the first months with your baby.',
  },
  {
    id: 'parenting',
    label: 'Parenting',
    prompt: 'Conscious parenting tools for everyday moments as your child grows.',
  },
]

export const ONBOARDING_JOURNEYS: JourneyOption[] = JOURNEY_OPTIONS.filter(
  (item) => item.id !== 'birth_prep',
)

export const DEFAULT_JOURNEY: JourneyStage = 'planning'
