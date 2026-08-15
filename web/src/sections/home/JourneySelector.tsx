'use client'

import { JOURNEY_OPTIONS } from '@/data/journeys'
import { useJourney } from '@/hooks/useJourney'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { cn } from '@/lib/cn'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { GOALS } from '@/lib/constants'
import { useTranslation } from 'react-i18next'
import type { Goal, JourneyStage } from '@/types/domain'

export function JourneySelector() {
  const { profile, setJourneyStage, setGoals, setPregnancyWeek, narrative, recommendations } = useJourney()
  const locale = currentLocale()
  const { t } = useTranslation()

  return (
    <section className="py-20" aria-labelledby="journey-heading">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">{t('nav.journey')}</p>
        <Heading as="h2" id="journey-heading" className="mt-3">
          {t('journey.heading')}
        </Heading>
        <Text muted className="mt-4 max-w-2xl text-lg">
          {t('journey.help')}
        </Text>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEY_OPTIONS.map((option) => {
            const selected = profile.journeyStage === option.id
            return (
              <li key={option.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  className={cn(
                    'min-h-[5.5rem] w-full rounded-2xl border px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                    selected ? 'border-teal bg-teal-soft' : 'border-line bg-white hover:border-teal/40',
                  )}
                  onClick={() => setJourneyStage(option.id as JourneyStage)}
                >
                  <span className="block font-semibold text-ink">{pick(option.label, locale)}</span>
                  <span className="mt-1 block text-sm text-slate">{pick(option.prompt, locale)}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <fieldset className="mt-8">
          <legend className="text-sm font-medium text-ink">Goals</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {GOALS.map((goal) => {
              const on = profile.goals.includes(goal.id)
              return (
                <button
                  key={goal.id}
                  type="button"
                  aria-pressed={on}
                  className={cn(
                    'min-h-11 rounded-full px-4 text-sm',
                    on ? 'bg-navy text-white' : 'bg-canvas text-slate',
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
            Week
            <input
              type="number"
              min={1}
              max={42}
              className="mt-2 min-h-12 w-full rounded-xl border border-line px-3"
              value={profile.pregnancyWeek ?? ''}
              onChange={(event) => setPregnancyWeek(event.target.value ? Number(event.target.value) : null)}
            />
          </label>
        ) : null}
        <div className="mt-10 grid gap-8 border-t border-line pt-10 lg:grid-cols-12" data-testid="journey-recommendations">
          <div className="lg:col-span-4">
            <p className="font-serif text-2xl text-ink">{narrative.title}</p>
            <p className="mt-3 text-slate">{narrative.body}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {recommendations.slice(0, 6).map((item) => (
              <li key={item.id} className="border-l-2 border-teal pl-4">
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
