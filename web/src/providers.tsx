'use client'

import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from '@/i18n'
import { AuthProvider } from '@/hooks/useAuth'
import { CartProvider } from '@/hooks/useCart'
import { JourneyProvider } from '@/hooks/useJourney'
import { ToastProvider } from '@/components/ui/Toast'
import { CmsImagesProvider } from '@/hooks/useCmsImages'
import { CatalogProvider } from '@/hooks/useCatalog'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <CartProvider>
          <JourneyProvider>
            <CatalogProvider>
              <CmsImagesProvider>
                <ToastProvider>{children}</ToastProvider>
              </CmsImagesProvider>
            </CatalogProvider>
          </JourneyProvider>
        </CartProvider>
      </AuthProvider>
    </I18nextProvider>
  )
}
