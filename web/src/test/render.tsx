import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import type { ReactNode } from 'react'
import { JourneyProvider } from '@/hooks/useJourney'

export function renderWithProviders(ui: ReactNode) {
  return render(
    <HelmetProvider>
      <JourneyProvider>{ui}</JourneyProvider>
    </HelmetProvider>,
  )
}

export { screen }
