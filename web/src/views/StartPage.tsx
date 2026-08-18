'use client'

import { ONBOARDING_JOURNEYS } from '@/data/journeys'
import { JOURNEY_ART } from '@/data/journeyArt'
import { useJourney } from '@/hooks/useJourney'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import type { JourneyStage } from '@/types/domain'
import { PageHero } from '@/components/editorial/PageHero'
import { HoverMedia } from '@/components/editorial/HoverMedia'

export function StartPage() {
  const { profile, setJourneyStage, narrative } = useJourney()
  const locale = currentLocale()
  return (
    <>
      <Seo title="Start your journey" description="One question, then useful next steps." path="/start" />
      <PageHero
        kicker="Begin here"
        title="What describes your journey?"
        lede="One question. Then the homepage and shop follow you."
        src="/images/placeholder-ai-journal-planning.png"
        alt="A couple planning pregnancy together at the kitchen table."
      />
      <Container className="py-16">
        <div className="grid gap-3 sm:grid-cols-2">
          {ONBOARDING_JOURNEYS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={profile.journeyStage === option.id}
              className={cn(
                'overflow-hidden rounded-2xl border text-left transition',
                profile.journeyStage === option.id ? 'border-teal ring-2 ring-teal' : 'border-line hover:border-purple/30',
              )}
              onClick={() => setJourneyStage(option.id as JourneyStage)}
            >
              <HoverMedia src={JOURNEY_ART[option.id as JourneyStage].src} alt="" className="aspect-[16/8] w-full" width={640} height={320} />
              <span className="block px-5 py-4">
                <span className="font-semibold">{pick(option.label, locale)}</span>
                <span className="mt-1 block text-sm text-slate">{pick(option.prompt, locale)}</span>
              </span>
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
