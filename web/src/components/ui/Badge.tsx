'use client'

import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

export function Badge({
  children,
  tone = 'teal',
  className,
}: {
  children: ReactNode
  tone?: 'teal' | 'purple' | 'navy' | 'muted'
  className?: string
}) {
  const tones = {
    teal: 'bg-teal-soft text-teal-dark',
    purple: 'bg-purple/10 text-purple-dark',
    navy: 'bg-navy/10 text-navy',
    muted: 'bg-canvas text-slate',
  }
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide', tones[tone], className)}>
      {children}
    </span>
  )
}
