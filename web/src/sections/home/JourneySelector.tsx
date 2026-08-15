import { JOURNEY_OPTIONS } from '@/data/journeys'
import { useJourney } from '@/hooks/useJourney'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { cn } from '@/lib/cn'
import type { JourneyStage } from '@/types/domain'

export function JourneySelector() {
  const { profile, setJourneyStage, narrative, recommendations } = useJourney()

  return (
    <section className="py-20" aria-labelledby="journey-heading">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Your journey</p>
        <Heading as="h2" id="journey-heading" className="mt-3">
          Where are you right now?
        </Heading>
        <Text muted className="mt-4 max-w-2xl text-lg">
          Choose a stage. Recommendations below change with you — and can later follow a WonderHug account.
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
                <span className="block font-semibold text-ink">{option.label}</span>
                <span className="mt-1 block text-sm text-slate">{option.prompt}</span>
              </button>
              </li>
            )
          })}
        </ul>
        <div className="mt-10 grid gap-8 border-t border-line pt-10 lg:grid-cols-12" data-testid="journey-recommendations">
          <div className="lg:col-span-4">
            <p className="font-serif text-2xl text-ink">{narrative.title}</p>
            <p className="mt-3 text-slate">{narrative.body}</p>
          </div>
          <ul className="grid gap-4 lg:col-span-8 sm:grid-cols-2">
            {recommendations.slice(0, 4).map((item) => (
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
