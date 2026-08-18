'use client'

import { JOURNEY_OPTIONS } from '@/data/journeys'
import { JOURNEY_ART } from '@/data/journeyArt'
import { useJourney } from '@/hooks/useJourney'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { GOALS } from '@/lib/constants'
import { useTranslation } from 'react-i18next'
import type { Goal, JourneyStage } from '@/types/domain'
import { Baby, Flower2, Heart, Home, Sparkles, Users } from 'lucide-react'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { SectionHeader } from '@/components/editorial/SectionHeader'

const ICONS = {
  planning: Sparkles,
  ttc: Heart,
  pregnant: Flower2,
  birth_prep: Users,
  new_parent: Baby,
  parenting: Home,
} as const

export function JourneySelector() {
  const { profile, setJourneyStage, setGoals, setPregnancyWeek, narrative, recommendations } = useJourney()
  const locale = currentLocale()
  const { t } = useTranslation()

  return (
    <section className="relative py-20" aria-labelledby="journey-heading">
      <Container className="relative">
        <SectionHeader kicker={t('nav.journey')} title={t('journey.heading')} lede={t('journey.help')} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEY_OPTIONS.map((option) => {
            const selected = profile.journeyStage === option.id
            const Icon = ICONS[option.id]
            const art = JOURNEY_ART[option.id]
            return (
              <li key={option.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  className={cn(
                    'group w-full overflow-hidden rounded-3xl border text-left shadow-sm transition duration-300 ease-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                    selected
                      ? 'border-transparent bg-white shadow-lift ring-2 ring-teal'
                      : 'border-line/80 bg-white/80 hover:-translate-y-0.5 hover:border-purple/30 hover:shadow-lift',
                  )}
                  onClick={() => setJourneyStage(option.id as JourneyStage)}
                >
                  <HoverMedia src={art.src} alt={art.alt} className="aspect-[16/9] w-full" height={360} width={640} />
                  <span className="block px-5 py-5">
                    <span className={cn('inline-flex h-9 w-9 items-center justify-center rounded-full', selected ? 'bg-teal text-white' : 'bg-teal-soft text-teal-dark')}>
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="mt-3 block font-semibold text-ink">{pick(option.label, locale)}</span>
                    <span className="mt-1 block text-sm leading-snug text-slate">{pick(option.prompt, locale)}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        <fieldset className="mt-8">
          <legend className="text-sm font-medium text-ink">{t('journey.goals')}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {GOALS.map((goal) => {
              const on = profile.goals.includes(goal.id)
              return (
                <button
                  key={goal.id}
                  type="button"
                  aria-pressed={on}
                  className={cn(
                    'min-h-11 rounded-full px-4 text-sm transition',
                    on ? 'bg-purple text-white shadow-sm' : 'bg-white text-slate ring-1 ring-line hover:ring-purple/30',
                  )}
                  onClick={() => {
                    const next = on ? profile.goals.filter((g) => g !== goal.id) : [...profile.goals, goal.id as Goal]
                    setGoals(next)
                  }}
                >
                  {t(goal.key)}
                </button>
              )
            })}
          </div>
        </fieldset>
        {profile.journeyStage === 'pregnant' || profile.journeyStage === 'birth_prep' ? (
          <label className="mt-6 block max-w-xs text-sm">
            {t('journey.week')}
            <input
              type="number"
              min={1}
              max={42}
              className="mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-3"
              value={profile.pregnancyWeek ?? ''}
              onChange={(event) => setPregnancyWeek(event.target.value ? Number(event.target.value) : null)}
            />
          </label>
        ) : null}
        <div className="mt-12 grid gap-8 rounded-[2rem] border border-line bg-white p-6 shadow-sm lg:grid-cols-12 lg:p-10" data-testid="journey-recommendations">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">{t('journey.forYou')}</p>
            <p className="mt-2 font-serif text-3xl text-ink">{narrative.title}</p>
            <p className="mt-3 text-slate">{narrative.body}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {recommendations.slice(0, 6).map((item) => (
              <li key={item.id} className="rounded-2xl bg-canvas p-4">
                <p className="text-xs uppercase tracking-wider text-slate-muted">{item.kind}</p>
                <a href={item.href} className="mt-1 block font-medium text-ink hover:text-teal-dark">
                  {item.title}
                </a>
                <p className="mt-1 text-sm text-slate">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
