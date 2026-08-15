'use client'

import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { track } from '@/services/analytics'

export function FinalCta() {
  return (
    <section className="pb-8">
      <Container className="border-t border-line py-20 text-center">
        <Heading as="h2">Begin where you are.</Heading>
        <Text muted className="mx-auto mt-4 max-w-xl text-lg">
          Tell us your journey. We will keep the next step small, kind and free of invented medical certainty.
        </Text>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/start" size="lg" onClick={() => track('hero_cta_click', { placement: 'final' })}>
            Start Your Journey
          </ButtonLink>
          <ButtonLink to="/blog" variant="secondary" size="lg">
            Read the journal
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
