'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { WhatsAppDock } from '@/components/layout/WhatsAppDock'
import { SkipLink } from '@/components/layout/SkipLink'

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? ''
  const isAdmin = pathname.startsWith('/admin')
  if (isAdmin) {
    return (
      <div className="min-h-svh bg-[#f0f0f1] text-ink">
        <SkipLink />
        {children}
      </div>
    )
  }
  return (
    <div className="flex min-h-svh flex-col bg-paper text-ink">
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
