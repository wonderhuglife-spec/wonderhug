'use client'

import { useJourney } from '@/hooks/useJourney'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'

export function PersonalizedExperience() {
  const { profile, recommendations } = useJourney()
  const primary = recommendations[0]

  return (
    <section className="bg-navy py-20 text-white">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Personalised later. Honest now.</p>
          <Heading as="h2" className="mt-4 text-white">
            A companion that can learn your stage, week and language — without guessing medical facts.
          </Heading>
          <Text className="mt-5 max-w-xl text-white/80">
            Today we remember the journey you select on this device. Next, a WonderHug profile can hold pregnancy week,
            baby age, saved articles and completed activities. The matching logic lives in a service, not in this layout.
          </Text>
        </div>
        <div className="rounded-2xl bg-white/10 p-6 lg:col-span-5">
          <p className="text-sm text-white/70">Currently showing for</p>
          <p className="mt-1 font-serif text-2xl capitalize">{profile.journeyStage.replace('_', ' ')}</p>
          {primary ? (
            <p className="mt-4 text-sm text-white/80">
              Suggested next step: <span className="text-white">{primary.title}</span>
            </p>
          ) : null}
          <ButtonLink to="/start" variant="secondary" className="mt-6">
            Save this on your journey
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
