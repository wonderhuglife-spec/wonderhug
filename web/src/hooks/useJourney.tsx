'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_JOURNEY } from '@/data/journeys'
import { defaultProfile, narrativeFor, recommend } from '@/services/personalization'
import { readStoredJourney, readStoredProfile, writeStoredJourney, writeStoredProfile } from '@/services/journeyStorage'
import { track } from '@/services/analytics'
import { currentLocale } from '@/i18n'
import type { Goal, JourneyStage, PersonalizationProfile, RecommendedItem } from '@/types/domain'

interface JourneyContextValue {
  profile: PersonalizationProfile
  setJourneyStage: (stage: JourneyStage) => void
  setGoals: (goals: Goal[]) => void
  setPregnancyWeek: (week: number | null) => void
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
  const { i18n } = useTranslation()
  const locale = i18n.language?.startsWith('te') ? 'te' : currentLocale()
  const [profile, setProfile] = useState<PersonalizationProfile>(() => {
    const stored = typeof window === 'undefined' ? null : readStoredProfile<PersonalizationProfile>()
    return stored ? { ...defaultProfile(stored.journeyStage ?? initialStage()), ...stored } : defaultProfile(initialStage())
  })

  const setJourneyStage = useCallback((stage: JourneyStage) => {
    setProfile((current) => {
      const next = { ...current, journeyStage: stage }
      writeStoredProfile(next)
      return next
    })
    writeStoredJourney(stage)
    track('journey_selected', { stage })
  }, [])

  const setGoals = useCallback((goals: Goal[]) => {
    setProfile((current) => {
      const next = { ...current, goals: goals.slice(0, 2) }
      writeStoredProfile(next)
      return next
    })
  }, [])

  const setPregnancyWeek = useCallback((week: number | null) => {
    setProfile((current) => {
      const next = { ...current, pregnancyWeek: week }
      writeStoredProfile(next)
      return next
    })
  }, [])

  const value = useMemo<JourneyContextValue>(() => {
    const next = { ...profile, language: locale }
    return {
      profile: next,
      setJourneyStage,
      setGoals,
      setPregnancyWeek,
      recommendations: recommend(next, locale),
      narrative: narrativeFor(next.journeyStage, locale),
    }
  }, [profile, setJourneyStage, setGoals, setPregnancyWeek, locale])

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
}

export function useJourney() {
  const ctx = useContext(JourneyContext)
  if (!ctx) throw new Error('useJourney must be used within JourneyProvider')
  return ctx
}
