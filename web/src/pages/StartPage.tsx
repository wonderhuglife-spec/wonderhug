import { ONBOARDING_JOURNEYS } from '@/data/journeys'
import { useJourney } from '@/hooks/useJourney'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { cn } from '@/lib/cn'
import { track } from '@/services/analytics'
import type { JourneyStage } from '@/types/domain'

export function StartPage() {
  const { profile, setJourneyStage, narrative } = useJourney()

  return (
    <>
      <Seo
        title="Start your journey"
        description="Tell WonderHug what describes your journey. One question, then useful next steps."
        path="/start"
      />
      <Container className="py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Start</p>
        <Heading as="h1" className="mt-3">
          What describes your journey?
        </Heading>
        <Text muted className="mt-4 max-w-xl text-lg">
          One question. No extra forms before you see something useful. Accounts (signup) will use Supabase Auth when
          CONFIG_REQUIRED keys are present.
        </Text>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {ONBOARDING_JOURNEYS.map((option) => {
            const selected = profile.journeyStage === option.id || (option.id === 'pregnant' && profile.journeyStage === 'birth_prep')
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={profile.journeyStage === option.id}
                className={cn(
                  'min-h-14 rounded-2xl border px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                  selected ? 'border-teal bg-teal-soft' : 'border-line hover:border-teal/40',
                )}
                onClick={() => {
                  setJourneyStage(option.id as JourneyStage)
                  track('signup_started', { stage: option.id })
                }}
              >
                <span className="font-semibold">{option.label}</span>
                <span className="mt-1 block text-sm text-slate">{option.prompt}</span>
              </button>
            )
          })}
        </div>
        <div className="mt-10 max-w-xl rounded-2xl bg-canvas p-6">
          <p className="font-serif text-2xl">{narrative.title}</p>
          <p className="mt-3 text-slate">{narrative.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink to="/">See your homepage</ButtonLink>
            <ButtonLink to="/download" variant="secondary">
              Continue in the app
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  )
}
