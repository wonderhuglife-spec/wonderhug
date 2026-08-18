'use client'

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { useCatalog } from '@/hooks/useCatalog'
import type { Program } from '@/types/domain'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Typography'
import { Button, ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Media } from '@/components/media/Media'
import { Reveal } from '@/components/motion/Reveal'
import { useCart } from '@/hooks/useCart'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr, MEDICAL_DISCLAIMER } from '@/lib/constants'
import { useToast } from '@/components/ui/Toast'
import { isEnrolled } from '@/services/lms'
import { useCmsImage } from '@/hooks/useCmsImages'
import type { MediaAssetKey } from '@/data/mediaAssets'

const COVER_KEY: Record<string, MediaAssetKey> = {
  'beej-sanskar': 'program_beej',
  'womb-care': 'program_womb',
  'super-parenting': 'program_parenting',
}

export function ProgramDetailPage({ slug: slugProp, program: programProp }: { slug?: string; program?: Program }) {
  const params = useParams()
  const { programs, experts } = useCatalog()
  const slug = slugProp ?? String(params.slug ?? '')
  const program = programProp ?? programs.find((item) => item.slug === slug && item.isPublished)
  const locale = currentLocale()
  const { add } = useCart()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toast = useToast()
  const coverKey = COVER_KEY[slug] ?? 'program_beej'
  const cmsCover = useCmsImage(coverKey)
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    if (program) setEnrolled(isEnrolled(program.slug))
  }, [program])

  if (!program) {
    return (
      <Container className="py-20">
        <EmptyState title="Programme not found" description="" />
      </Container>
    )
  }

  const name = pick(program.name, locale)
  const expert = experts.find((item) => item.slug === program.instructorSlug)
  const coverSrc = cmsCover.src || program.coverImage
  const coverAlt = cmsCover.alt || program.coverImageAlt

  return (
    <>
      <Seo title={name} description={pick(program.summary, locale)} path={`/programs/${program.slug}`} />
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
              {program.level} · {program.durationWeeks} weeks
            </p>
            <Heading as="h1" className="mt-3">
              {name}
            </Heading>
            <p className="mt-4 max-w-2xl text-lg text-slate">{pick(program.description, locale)}</p>
            <p className="mt-6 font-medium">{formatInr(program.pricePaise, locale)}</p>
          </div>
          <div className="lg:col-span-5">
            <Media src={coverSrc} alt={coverAlt} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
          </div>
        </div>

        {expert ? (
          <Reveal className="mt-12 rounded-3xl border border-line bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-purple">Faculty seat</p>
            <p className="mt-2 font-serif text-2xl">{expert.name}</p>
            <p className="mt-2 max-w-2xl text-slate">{pick(expert.bio, locale)}</p>
            <p className="mt-3 text-sm text-slate">{expert.qualification}</p>
            <Link to={`/experts/${expert.slug}`} className="mt-4 inline-block underline">
              Faculty profile
            </Link>
          </Reveal>
        ) : null}

        <h2 className="mt-14 font-serif text-3xl">Curriculum</h2>
        <ol className="mt-6 space-y-4">
          {program.modules.map((mod) => (
            <li key={mod.id} className="rounded-2xl border border-line bg-white p-5 transition hover:shadow-lift">
              <p className="font-medium">{pick(mod.title, locale)}</p>
              <p className="text-slate">{pick(mod.body, locale)}</p>
              <ul className="mt-3 text-sm text-slate">
                {program.lessons
                  .filter((lesson) => lesson.moduleId === mod.id)
                  .map((lesson) => (
                    <li key={lesson.id}>
                      {pick(lesson.title, locale)} · {lesson.kind}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          {enrolled ? (
            <ButtonLink to={`/learn/${program.slug}/${program.lessons[0]?.slug ?? ''}`} size="lg">
              Continue learning
            </ButtonLink>
          ) : (
            <Button
              size="lg"
              onClick={() => {
                add({ kind: 'program', id: program.id, slug: program.slug, title: name, unitPaise: program.pricePaise })
                toast('Added to cart')
                navigate('/checkout')
              }}
            >
              {t('cta.enroll')}
            </Button>
          )}
        </div>
        <aside className="mt-10 rounded-2xl bg-canvas p-6 text-sm text-slate">{MEDICAL_DISCLAIMER}</aside>
      </Container>
    </>
  )
}
