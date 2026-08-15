'use client'

import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { WhatsAppDock } from '@/components/layout/WhatsAppDock'
import { SkipLink } from '@/components/layout/SkipLink'

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-white text-ink">
      <SkipLink />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppDock />
    </div>
  )
}
