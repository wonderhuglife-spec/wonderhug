'use client'

import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { cn } from '@/lib/cn'

export function PageHero({
  kicker,
  title,
  lede,
  src,
  alt,
  children,
  tone = 'dark',
}: {
  kicker?: string
  title: string
  lede?: string
  src: string
  alt: string
  children?: ReactNode
  tone?: 'dark' | 'light'
}) {
  const dark = tone === 'dark'
  return (
    <header className="relative min-h-[min(52vh,28rem)] overflow-hidden">
      <HoverMedia src={src} alt={alt} fill className="absolute inset-0" sizes="100vw" priority zoomOnHover={false} />
      <div
        className={cn(
          'absolute inset-0',
          dark
            ? 'bg-gradient-to-t from-[#1A1220]/88 via-[#1A1220]/45 to-[#1A1220]/15'
            : 'bg-gradient-to-r from-paper/94 via-paper/78 to-paper/35',
        )}
      />
      <Container className={cn('relative flex min-h-[min(52vh,28rem)] items-end pb-12 pt-28', dark ? 'text-white' : 'text-ink')}>
        <div className="max-w-2xl">
          {kicker ? (
            <p
              className={cn(
                'text-xs font-semibold uppercase tracking-[0.16em]',
                dark ? 'text-white/70' : 'text-teal-dark',
              )}
            >
              {kicker}
            </p>
          ) : null}
          <Heading as="h1" className={cn('mt-4', dark && 'text-white')}>
            {title}
          </Heading>
          {lede ? (
            <Text className={cn('mt-5 max-w-xl text-lg', dark ? 'text-white/80' : 'text-slate')}>{lede}</Text>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </header>
  )
}
