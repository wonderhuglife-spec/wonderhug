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
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { SectionHeader } from '@/components/editorial/SectionHeader'

export function JourneySelector() {
  const { profile, setJourneyStage, setGoals, setPregnancyWeek, narrative, recommendations } = useJourney()
  const locale = currentLocale()
  const { t } = useTranslation()
  const selected = JOURNEY_OPTIONS.find((option) => option.id === profile.journeyStage) ?? JOURNEY_OPTIONS[0]
  const selectedArt = JOURNEY_ART[selected.id]

  return (
    <section className="relative bg-canvas py-16 md:py-24" aria-labelledby="journey-heading">
      <Container className="relative">
        <SectionHeader kicker={t('nav.journey')} title={t('journey.heading')} lede={t('journey.help')} />
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="overflow-hidden rounded-3xl border border-line bg-white lg:col-span-7">
            <HoverMedia src={selectedArt.src} alt={selectedArt.alt} className="aspect-[16/10] w-full" height={640} width={1024} />
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">This stage</p>
              <h3 className="mt-2 font-serif text-3xl text-ink">{pick(selected.label, locale)}</h3>
              <p className="mt-3 text-slate">{pick(selected.prompt, locale)}</p>
            </div>
          </div>
          <ul className="flex flex-col gap-3 lg:col-span-5">
            {JOURNEY_OPTIONS.map((option) => {
              const on = profile.journeyStage === option.id
              const art = JOURNEY_ART[option.id]
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    className={cn(
                      'group flex w-full items-center gap-3 overflow-hidden rounded-2xl border text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                      on ? 'border-teal bg-white ring-1 ring-teal' : 'border-line bg-white/80 hover:border-purple/30',
                    )}
                    onClick={() => setJourneyStage(option.id as JourneyStage)}
                  >
                    <HoverMedia src={art.src} alt="" className="h-20 w-24 shrink-0" height={160} width={192} zoomOnHover={false} />
                    <span className="pr-4">
                      <span className="block font-serif text-lg text-ink">{pick(option.label, locale)}</span>
                      <span className="mt-0.5 block text-sm text-slate">{pick(option.prompt, locale)}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
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
                    on ? 'bg-purple text-white' : 'bg-white text-slate ring-1 ring-line hover:ring-purple/30',
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
        <div className="mt-12 grid gap-8 border-t border-line pt-10 lg:grid-cols-12" data-testid="journey-recommendations">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">{t('journey.forYou')}</p>
            <p className="mt-2 font-serif text-3xl text-ink">{narrative.title}</p>
            <p className="mt-3 text-slate">{narrative.body}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {recommendations.slice(0, 6).map((item) => (
              <li key={item.id} className="rounded-2xl bg-white p-4">
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
