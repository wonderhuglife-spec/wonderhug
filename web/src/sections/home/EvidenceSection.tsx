import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'

export function EvidenceSection() {
  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Science and tradition</p>
          <Heading as="h2" className="mt-3">
            Evidence-aware, culturally at home.
          </Heading>
          <Text muted className="mt-4 text-lg">
            WonderHug holds two kinds of knowledge with different jobs. Clinical education is labelled, reviewed and
            never a diagnosis. Indian practices such as Garbh Sanskar are hosted as living tradition — not as proof of
            a medical result.
          </Text>
        </div>
        <div className="grid gap-6">
          <blockquote className="border-l-2 border-purple pl-5">
            <p className="font-serif text-xl text-ink">Education</p>
            <p className="mt-2 text-slate">
              Articles name an author, a reviewer when one exists, a last-reviewed date, and references. If those
              fields are empty, we say so.
            </p>
          </blockquote>
          <blockquote className="border-l-2 border-teal pl-5">
            <p className="font-serif text-xl text-ink">Practice</p>
            <p className="mt-2 text-slate">
              Ritual, music and family custom can still matter to a day. We will not invent laboratory evidence around
              them.
            </p>
          </blockquote>
        </div>
      </Container>
    </section>
  )
}
