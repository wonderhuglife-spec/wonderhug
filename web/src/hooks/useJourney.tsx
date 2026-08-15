import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_JOURNEY } from '@/data/journeys'
import { defaultProfile, narrativeFor, recommend } from '@/services/personalization'
import { readStoredJourney, writeStoredJourney } from '@/services/journeyStorage'
import { track } from '@/services/analytics'
import type { JourneyStage, PersonalizationProfile, RecommendedItem } from '@/types/domain'

interface JourneyContextValue {
  profile: PersonalizationProfile
  setJourneyStage: (stage: JourneyStage) => void
  recommendations: RecommendedItem[]
  narrative: { title: string; body: string }
}

const JourneyContext = createContext<JourneyContextValue | null>(null)

function initialStage(): JourneyStage {
  const stored = typeof window === 'undefined' ? null : readStoredJourney()
  const allowed: JourneyStage[] = ['planning', 'ttc', 'pregnant', 'birth_prep', 'new_parent', 'parenting']
  if (stored && (allowed as string[]).includes(stored)) return stored as JourneyStage
  return DEFAULT_JOURNEY
}

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<PersonalizationProfile>(() => defaultProfile(initialStage()))

  const setJourneyStage = useCallback((stage: JourneyStage) => {
    setProfile((current) => ({ ...current, journeyStage: stage }))
    writeStoredJourney(stage)
    track('journey_selected', { stage })
  }, [])

  const value = useMemo<JourneyContextValue>(() => {
    return {
      profile,
      setJourneyStage,
      recommendations: recommend(profile),
      narrative: narrativeFor(profile.journeyStage),
    }
  }, [profile, setJourneyStage])

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
}

export function useJourney() {
  const ctx = useContext(JourneyContext)
  if (!ctx) throw new Error('useJourney must be used within JourneyProvider')
  return ctx
}
