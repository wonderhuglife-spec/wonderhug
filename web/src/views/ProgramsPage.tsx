'use client'

import type { ReactNode } from 'react'
import { Link } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { PROGRAMS } from '@/data/programs'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Media } from '@/components/media/Media'
import { Reveal } from '@/components/motion/Reveal'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr } from '@/lib/constants'
import { useCmsImage } from '@/hooks/useCmsImages'
import type { MediaAssetKey } from '@/data/mediaAssets'

const KEYS: Record<string, MediaAssetKey> = {
  'beej-sanskar': 'program_beej',
  'womb-care': 'program_womb',
  'super-parenting': 'program_parenting',
}

function ProgramCard({ slug, children }: { slug: string; children: ReactNode }) {
  const cover = useCmsImage(KEYS[slug] ?? 'program_beej')
  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-lift">
      <Media src={cover.src} alt={cover.alt} className="aspect-[16/9] w-full object-cover" />
      {children}
    </article>
  )
}

export function ProgramsPage() {
  const { t } = useTranslation()
  const locale = currentLocale()
  return (
    <>
      <Seo title={t('programs.title')} description={t('programs.intro')} path="/programs" />
      <header className="border-b border-line py-16">
        <Container>
          <Heading as="h1">{t('programs.title')}</Heading>
          <Text muted className="mt-4 max-w-2xl text-lg">
            {t('programs.intro')}
          </Text>
        </Container>
      </header>
      <Container className="grid gap-8 py-12 md:grid-cols-3">
        {PROGRAMS.map((program, index) => (
          <Reveal key={program.id} delay={index * 0.05}>
            <ProgramCard slug={program.slug}>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-teal-dark">
                  {program.level} · {program.durationWeeks} weeks
                </p>
                <h2 className="mt-2 font-serif text-2xl">
                  <Link to={`/programs/${program.slug}`}>{pick(program.name, locale)}</Link>
                </h2>
                <p className="mt-3 text-slate">{pick(program.summary, locale)}</p>
                <p className="mt-4 font-medium">{formatInr(program.pricePaise, locale)}</p>
              </div>
            </ProgramCard>
          </Reveal>
        ))}
      </Container>
    </>
  )
}
