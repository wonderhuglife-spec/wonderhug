'use client'

import { Link } from '@/lib/navigation'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/editorial/SectionHeader'
import { HoverMedia } from '@/components/editorial/HoverMedia'

const CHAPTERS = [
  {
    title: 'Expecting',
    body: 'Shared rhythms before a test. Planning without a score.',
    href: '/pregnancy-planning',
    src: '/images/photo-chapter-expecting.png',
    alt: 'A couple planning pregnancy together over chai and a notebook.',
  },
  {
    title: 'Preparing',
    body: 'Birth logistics without scare stories.',
    href: '/pregnancy/birth-preparation',
    src: '/images/photo-chapter-preparing.png',
    alt: 'A pregnant parent packing a hospital bag and baby clothes at home.',
  },
  {
    title: 'Growing',
    body: 'Week notes and Garbh Sanskar as practice, not a promise.',
    href: '/pregnancy',
    src: '/images/photo-chapter-growing.png',
    alt: 'A pregnant woman resting in a home courtyard with a hand on her belly.',
  },
  {
    title: 'Learning',
    body: 'Programmes you can finish. Education, not a clinic.',
    href: '/programs',
    src: '/images/photo-chapter-learning.png',
    alt: 'A pregnant woman reading a parenting book and journal at home.',
  },
  {
    title: 'Connecting',
    body: 'Fifty thousand mothers already in WhatsApp rooms.',
    href: '/community',
    src: '/images/photo-chapter-connecting.png',
    alt: 'Mothers and babies sitting together in a bright community room.',
  },
  {
    title: 'Parenting',
    body: 'The fourth trimester and everyday conscious parenting.',
    href: '/parenting',
    src: '/images/photo-chapter-parenting.png',
    alt: 'A parent playing on the floor with a toddler while a baby rests nearby.',
  },
] as const

export function StoryChapters() {
  return (
    <section className="py-20" aria-labelledby="chapters-heading">
      <Container>
        <SectionHeader
          headingId="chapters-heading"
          kicker="The companion"
          title="A journey that already has a name."
          lede="WonderHug stays with Telugu-speaking homes from the first conversation about a baby through the years of raising one — without pretending to be a hospital."
        />
        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((chapter) => (
            <li key={chapter.title}>
              <Link
                to={chapter.href}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4"
              >
                <HoverMedia
                  src={chapter.src}
                  alt={chapter.alt}
                  className="aspect-[4/3] w-full rounded-2xl bg-canvas"
                  width={1200}
                  height={900}
                />
                <h3 className="mt-4 font-serif text-2xl text-ink group-hover:text-purple">{chapter.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{chapter.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
