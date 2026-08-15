import { EmptyState } from '@/components/ui/EmptyState'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { ButtonLink } from '@/components/ui/Button'

export function StoriesSection() {
  return (
    <section className="bg-canvas py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Stories</p>
          <Heading as="h2" className="mt-3">
            Family voices, when they are real.
          </Heading>
          <Text muted className="mt-4 text-lg">
            WonderHug will not invent testimonials, success rates, or “50,000 mothers” claims. When families consent to
            share, their stories will sit here with names they approve.
          </Text>
        </div>
        <div className="mt-10">
          <EmptyState
            title="No published stories yet"
            description="This space is empty on purpose. Placeholder quotes would look finished and be untrue."
            action={
              <ButtonLink to="/community" variant="secondary">
                Visit community rooms
              </ButtonLink>
            }
          />
        </div>
      </Container>
    </section>
  )
}
