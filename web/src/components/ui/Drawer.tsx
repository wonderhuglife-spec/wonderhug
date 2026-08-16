'use client'

import { useEffect, type ReactNode } from 'react'
import { Heading } from '@/components/ui/Typography'

export function Drawer({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close menu" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col bg-white p-6 shadow-lift"
      >
        <Heading as="h2" id="drawer-title" className="text-2xl">
          {title}
        </Heading>
        <div className="mt-6 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
