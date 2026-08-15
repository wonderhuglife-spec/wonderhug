import { render } from '@testing-library/react'
import type { ReactNode } from 'react'
import { AppProviders } from '@/app/providers'

export function renderWithProviders(ui: ReactNode) {
  return render(<AppProviders>{ui}</AppProviders>)
}

export { screen } from '@testing-library/react'
