'use client'

import { Container } from '@/components/ui/Container'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { SectionHeader } from '@/components/editorial/SectionHeader'

export function EvidenceSection() {
  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <HoverMedia
          src="/images/placeholder-ai-journal-garbh.png"
          alt="A pregnant woman resting by a window for Garbh Sanskar practice."
          className="aspect-[4/5] w-full rounded-3xl"
          width={720}
          height={900}
        />
        <div>
          <SectionHeader
            kicker="Science and tradition"
            title="Evidence-aware, culturally at home."
            lede="WonderHug holds two kinds of knowledge with different jobs. Clinical education is labelled, reviewed and never a diagnosis. Indian practices such as Garbh Sanskar are hosted as living tradition — not as proof of a medical result."
          />
          <div className="mt-10 grid gap-6">
            <blockquote className="border-l-2 border-purple pl-5">
              <p className="font-serif text-xl text-ink">Education</p>
              <p className="mt-2 text-slate">
                Articles name an author, a reviewer when one exists, a last-reviewed date, and references. If those fields are empty, we say so.
              </p>
            </blockquote>
            <blockquote className="border-l-2 border-teal pl-5">
              <p className="font-serif text-xl text-ink">Practice</p>
              <p className="mt-2 text-slate">
                Ritual, music and family custom can still matter to a day. We will not invent laboratory evidence around them.
              </p>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  )
}
