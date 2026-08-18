'use client'

import { ONBOARDING_JOURNEYS } from '@/data/journeys'
import { useJourney } from '@/hooks/useJourney'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { cn } from '@/lib/cn'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import type { JourneyStage } from '@/types/domain'

export function StartPage() {
  const { profile, setJourneyStage, narrative } = useJourney()
  const locale = currentLocale()
  return (
    <>
      <Seo title="Start your journey" description="One question, then useful next steps." path="/start" />
      <Container className="py-16">
        <Heading as="h1">What describes your journey?</Heading>
        <Text muted className="mt-4 max-w-xl text-lg">
          One question. Then the homepage and shop follow you.
        </Text>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {ONBOARDING_JOURNEYS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={profile.journeyStage === option.id}
              className={cn(
                'min-h-14 rounded-2xl border px-5 py-4 text-left',
                profile.journeyStage === option.id ? 'border-teal bg-teal-soft' : 'border-line',
              )}
              onClick={() => setJourneyStage(option.id as JourneyStage)}
            >
              <span className="font-semibold">{pick(option.label, locale)}</span>
              <span className="mt-1 block text-sm text-slate">{pick(option.prompt, locale)}</span>
            </button>
          ))}
        </div>
        <div className="mt-10 max-w-xl rounded-2xl bg-canvas p-6">
          <p className="font-serif text-2xl">{narrative.title}</p>
          <p className="mt-3 text-slate">{narrative.body}</p>
          <ButtonLink to="/" className="mt-6">
            See your homepage
          </ButtonLink>
        </div>
      </Container>
    </>
  )
}
