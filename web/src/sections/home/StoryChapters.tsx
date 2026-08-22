'use client'

import { Link } from '@/lib/navigation'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/editorial/SectionHeader'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { useCmsImage } from '@/hooks/useCmsImages'
import type { MediaAssetKey } from '@/data/mediaAssets'

const CHAPTERS: {
  title: string
  body: string
  href: string
  asset: MediaAssetKey
}[] = [
  {
    title: 'Expecting',
    body: 'Shared rhythms before a test. Planning without a score.',
    href: '/pregnancy-planning',
    asset: 'journal_planning',
  },
  {
    title: 'Preparing',
    body: 'Birth logistics without scare stories.',
    href: '/pregnancy/birth-preparation',
    asset: 'chapter_preparing',
  },
  {
    title: 'Growing',
    body: 'Week notes and Garbh Sanskar as practice, not a promise.',
    href: '/pregnancy',
    asset: 'journal_garbh',
  },
  {
    title: 'Learning',
    body: 'Programmes you can finish. Education, not a clinic.',
    href: '/programs',
    asset: 'chapter_learning',
  },
  {
    title: 'Connecting',
    body: 'Quieter rooms on the site. Daily conversation on WhatsApp.',
    href: '/community',
    asset: 'community',
  },
  {
    title: 'Parenting',
    body: 'The fourth trimester and everyday conscious parenting.',
    href: '/parenting',
    asset: 'journal_postpartum',
  },
]

function ChapterCard({
  chapter,
  featured = false,
}: {
  chapter: (typeof CHAPTERS)[number]
  featured?: boolean
}) {
  const art = useCmsImage(chapter.asset)
  return (
    <Link
      to={chapter.href}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4"
    >
      <HoverMedia
        src={art.src}
        alt={art.alt}
        className={featured ? 'aspect-[16/10] w-full rounded-2xl bg-canvas' : 'aspect-[16/10] w-full rounded-2xl bg-canvas'}
        width={1200}
        height={featured ? 750 : 640}
      />
      <h3 className="mt-4 font-serif text-2xl text-ink group-hover:text-purple">{chapter.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate">{chapter.body}</p>
    </Link>
  )
}

export function StoryChapters() {
  const [lead, second, third, ...rest] = CHAPTERS
  return (
    <section className="py-16 md:py-24" aria-labelledby="chapters-heading">
      <Container>
        <SectionHeader
          headingId="chapters-heading"
          kicker="The companion"
          title="A journey that already has a name."
          lede="WonderHug stays with Telugu-speaking homes from the first conversation about a baby through the years of raising one — without pretending to be a hospital."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ChapterCard chapter={lead} featured />
          </div>
          <ul className="flex flex-col justify-between gap-8 lg:col-span-5">
            {[second, third].map((chapter) => (
              <li key={chapter.title}>
                <ChapterCard chapter={chapter} />
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-10 flex gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {rest.map((chapter) => (
            <li key={chapter.title} className="min-w-[16rem] lg:min-w-0">
              <ChapterCard chapter={chapter} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
