import { loc } from '@/lib/locale'
import type { JourneyStage, LocalizedText } from '@/types/domain'

export interface JourneyOption {
  id: JourneyStage
  label: LocalizedText
  prompt: LocalizedText
}

export const JOURNEY_OPTIONS: JourneyOption[] = [
  {
    id: 'planning',
    label: loc('Planning pregnancy', 'గర్భ యోజన'),
    prompt: loc('Build shared rhythms before you try to conceive.', 'ప్రయత్నానికి ముందు ఉమ్మడి లయ.'),
  },
  {
    id: 'ttc',
    label: loc('Trying to conceive', 'గర్భం కోసం ప్రయత్నం'),
    prompt: loc('Steady support while you wait — without a score.', 'వేచి ఉన్నప్పుడు నిలకడైన సాంగత్యం.'),
  },
  {
    id: 'pregnant',
    label: loc('Pregnant', 'గర్భం'),
    prompt: loc('Week-aware guidance and Garbh Sanskar as practice.', 'వారపు మార్గదర్శకం, సాధనగా గర్భ సంస్కారం.'),
  },
  {
    id: 'birth_prep',
    label: loc('Preparing for birth', 'ప్రసవ సిద్ధత'),
    prompt: loc('Preferences and logistics without scare stories.', 'భయం లేని ప్రాధాన్యతలు మరియు లాజిస్టిక్స్.'),
  },
  {
    id: 'new_parent',
    label: loc('New parent', 'కొత్త తల్లిదండ్రులు'),
    prompt: loc('Fourth trimester: rest, feeding pointers, visitors.', 'నాలుగవ త్రైమాసికం: విశ్రాంతి, పాలు, అతిథులు.'),
  },
  {
    id: 'parenting',
    label: loc('Parenting', 'పెంపకం'),
    prompt: loc('Everyday conscious parenting in joint families.', 'ఉమ్మడి కుటుంబాల్లో రోజువారీ పెంపకం.'),
  },
]

export const ONBOARDING_JOURNEYS = JOURNEY_OPTIONS.filter((item) => item.id !== 'birth_prep')
export const DEFAULT_JOURNEY: JourneyStage = 'planning'
