'use client'

import { Link } from '@/lib/navigation'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/editorial/SectionHeader'
import { BadgeCheck, HeartHandshake, Link2, MessageCircle, ScrollText, ShieldCheck } from 'lucide-react'
import { formatDate } from '@/lib/constants'
import { currentLocale } from '@/i18n'
import { cn } from '@/lib/cn'
import type { BlogPost } from '@/types/domain'

export type TrustSignal = {
  id: string
  icon: 'shield' | 'review' | 'consent' | 'source' | 'support' | 'legal'
  label: string
  detail: string
  href?: string
}

const ICONS = {
  shield: ShieldCheck,
  review: BadgeCheck,
  consent: HeartHandshake,
  source: Link2,
  support: MessageCircle,
  legal: ScrollText,
} as const

function SignalIcon({ name }: { name: TrustSignal['icon'] }) {
  const Icon = ICONS[name]
  return <Icon className="h-5 w-5 shrink-0 text-teal-dark" strokeWidth={1.5} aria-hidden />
}

export function TrustSignals({
  signals,
  variant = 'section',
  flush = false,
}: {
  signals: TrustSignal[]
  variant?: 'section' | 'bar'
  flush?: boolean
}) {
  if (signals.length === 0) return null

  if (variant === 'bar') {
    const items = (
      <div className={cn('flex flex-wrap items-center gap-x-10 gap-y-4 py-6', flush ? 'justify-start' : 'justify-center')}>
        {signals.map((signal) => {
          const inner = (
            <span className="flex items-center gap-2 text-sm text-slate">
              <SignalIcon name={signal.icon} />
              {signal.label}
            </span>
          )
          return signal.href ? (
            <Link key={signal.id} to={signal.href} className="hover:text-ink">
              {inner}
            </Link>
          ) : (
            <span key={signal.id}>{inner}</span>
          )
        })}
      </div>
    )
    if (flush) return <div className="border-y border-line bg-canvas/60 px-1">{items}</div>
    return (
      <div className="border-y border-line bg-canvas/60">
        <Container>{items}</Container>
      </div>
    )
  }

  return (
    <section className="bg-white py-16 md:py-20" aria-labelledby="trust-heading">
      <Container>
        <SectionHeader
          headingId="trust-heading"
          kicker="Why families trust WonderHug"
          title="Nothing here is invented"
          lede="Every claim on this page is either sourced, reviewed, or explicitly labeled as tradition rather than evidence."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {signals.map((signal) => {
            const body = (
              <>
                <SignalIcon name={signal.icon} />
                <h3 className="mt-4 font-serif text-lg text-ink">{signal.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{signal.detail}</p>
              </>
            )
            return signal.href ? (
              <Link
                key={signal.id}
                to={signal.href}
                className="rounded-2xl border border-line bg-white p-6 transition hover:shadow-lift"
              >
                {body}
              </Link>
            ) : (
              <article key={signal.id} className="rounded-2xl border border-line bg-white p-6">
                {body}
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

/** Inline reuse of review + tradition signals on journal articles — not the full section. */
export function ArticleTrustByline({ post }: { post: BlogPost }) {
  const locale = currentLocale()
  const reviewed = post.lastReviewedAt ? formatDate(post.lastReviewedAt, locale) : null
  return (
    <div className="mt-6 space-y-2 rounded-2xl border border-line bg-canvas px-5 py-4 text-sm leading-relaxed text-slate">
      <p>
        <span className="font-medium text-ink">{post.authorName}</span>
        {' · '}
        Review status: {post.reviewStatus}
        {post.expertReviewerName ? ` · Reviewer: ${post.expertReviewerName}` : ' · No named clinician until credentials are verified'}
        {reviewed ? ` · Last reviewed ${reviewed}` : ''}
      </p>
      <p>
        Clinical education is labelled as such. Garbh Sanskar and family custom are hosted as practice, not as proof of a medical result.{' '}
        <Link to="/medical-disclaimer" className="text-teal-dark underline-offset-2 hover:underline">
          Education, not diagnosis
        </Link>
        .
      </p>
    </div>
  )
}
