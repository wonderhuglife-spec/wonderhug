'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { WhatsAppDock } from '@/components/layout/WhatsAppDock'
import { SkipLink } from '@/components/layout/SkipLink'

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  return (
    <div className="flex min-h-svh flex-col bg-paper text-ink">
      <SkipLink />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={pathname}
          className="flex-1"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduce ? 0 : 0.28 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppDock />
    </div>
  )
}
