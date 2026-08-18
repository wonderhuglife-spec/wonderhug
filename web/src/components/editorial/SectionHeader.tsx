'use client'

import type { ReactNode } from 'react'
import { Heading, Text } from '@/components/ui/Typography'
import { cn } from '@/lib/cn'

export function SectionHeader({
  kicker,
  title,
  lede,
  action,
  className,
  headingId,
}: {
  kicker?: string
  title: string
  lede?: string
  action?: ReactNode
  className?: string
  headingId?: string
}) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        {kicker ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">{kicker}</p> : null}
        <Heading as="h2" id={headingId} className={kicker ? 'mt-3' : undefined}>
          {title}
        </Heading>
        {lede ? (
          <Text muted className="mt-4 text-lg">
            {lede}
          </Text>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
