import type { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import { i18n } from '@/i18n'
import { AuthProvider } from '@/hooks/useAuth'
import { CartProvider } from '@/hooks/useCart'
import { JourneyProvider } from '@/hooks/useJourney'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        <AuthProvider>
          <CartProvider>
            <JourneyProvider>{children}</JourneyProvider>
          </CartProvider>
        </AuthProvider>
      </HelmetProvider>
    </I18nextProvider>
  )
}
