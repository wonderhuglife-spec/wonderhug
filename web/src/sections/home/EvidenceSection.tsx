'use client'

import { Container } from '@/components/ui/Container'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { SectionHeader } from '@/components/editorial/SectionHeader'
import { useCmsImage } from '@/hooks/useCmsImages'

export function EvidenceSection() {
  const art = useCmsImage('journal_garbh')
  return (
    <section className="bg-white py-16 md:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <HoverMedia
          src={art.src}
          alt={art.alt}
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
