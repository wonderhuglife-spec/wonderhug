'use client'

import { Link } from '@/lib/navigation'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/editorial/SectionHeader'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { Reveal } from '@/components/motion/Reveal'

const CHAPTERS = [
  {
    title: 'Expecting',
    body: 'Shared rhythms before a test. Planning without a score.',
    href: '/pregnancy-planning',
    src: '/images/placeholder-ai-journal-planning.png',
    span: true,
  },
  {
    title: 'Preparing',
    body: 'Birth logistics without scare stories.',
    href: '/pregnancy/birth-preparation',
    src: '/images/placeholder-ai-tool-contractions.png',
    span: false,
  },
  {
    title: 'Growing',
    body: 'Week notes and Garbh Sanskar as practice, not a promise.',
    href: '/pregnancy',
    src: '/images/placeholder-ai-program-womb.png',
    span: false,
  },
  {
    title: 'Learning',
    body: 'Programmes you can finish. Education, not a clinic.',
    href: '/programs',
    src: '/images/placeholder-ai-program-beej.png',
    span: false,
  },
  {
    title: 'Connecting',
    body: 'Fifty thousand mothers already in WhatsApp rooms.',
    href: '/community',
    src: '/images/placeholder-ai-community.png',
    span: false,
  },
  {
    title: 'Parenting',
    body: 'The fourth trimester and everyday conscious parenting.',
    href: '/parenting',
    src: '/images/placeholder-ai-program-parenting.png',
    span: false,
  },
] as const

export function StoryChapters() {
  return (
    <section className="py-20" aria-labelledby="chapters-heading">
      <Container>
        <SectionHeader
          kicker="The companion"
          title="A journey that already has a name."
          lede="WonderHug stays with Telugu-speaking homes from the first conversation about a baby through the years of raising one — without pretending to be a hospital."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((chapter, index) => (
            <li key={chapter.title} className={chapter.span ? 'md:col-span-2 lg:col-span-2' : undefined}>
              <Reveal delay={index * 0.05}>
                <Link
                  to={chapter.href}
                  className="group relative block min-h-[16rem] overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                >
                  <HoverMedia
                    src={chapter.src}
                    alt={`placeholder-ai- ${chapter.title}`}
                    className={chapter.span ? 'aspect-[16/8] h-full min-h-[16rem]' : 'aspect-[4/5] h-full min-h-[16rem]'}
                    width={chapter.span ? 1200 : 720}
                    height={chapter.span ? 600 : 900}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#1A1220]/80 via-[#1A1220]/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <span className="font-serif text-3xl">{chapter.title}</span>
                    <span className="mt-2 block max-w-md text-sm text-white/80">{chapter.body}</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
