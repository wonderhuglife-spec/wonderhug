import type { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { JourneyProvider } from '@/hooks/useJourney'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <JourneyProvider>{children}</JourneyProvider>
    </HelmetProvider>
  )
}
