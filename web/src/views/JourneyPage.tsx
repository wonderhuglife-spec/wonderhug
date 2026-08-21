'use client'

import { Link } from '@/lib/navigation'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { Reveal } from '@/components/motion/Reveal'
import { JOURNEY_ART } from '@/data/journeyArt'
import { PROGRAMS } from '@/data/programs'
import { PRACTICES } from '@/data/practices'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr } from '@/lib/constants'
import { useCatalog } from '@/hooks/useCatalog'

const STAGES = [
  {
    id: 'planning' as const,
    href: '/pregnancy-planning',
    title: 'Planning',
    body: 'Shared rhythm, kitchen conversations and couple readiness before you try. No fertility scores.',
  },
  {
    id: 'pregnant' as const,
    href: '/garbh-sanskar',
    title: 'Garbh Sanskar',
    body: 'Daily practice through pregnancy: music, rest and stories — never a promise about the child.',
  },
  {
    id: 'parenting' as const,
    href: '/parenting',
    title: 'Parenting',
    body: 'Fourth trimester and early years in joint families: rest, feeding questions, language for limits.',
  },
]

export function JourneyPage() {
  const locale = currentLocale()
  const { programs, practices } = useCatalog()
  const publishedPrograms = (programs.length ? programs : PROGRAMS).filter((item) => item.isPublished)
  const practiceList = practices.length ? practices : PRACTICES

  return (
    <>
      <Seo
        title="Journey"
        description="Choose your stage — planning, Garbh Sanskar in pregnancy, or parenting — then pick a programme when you want company."
        path="/journey"
      />

      <section className="relative min-h-[min(88vh,46rem)] overflow-hidden">
        <HoverMedia src="/images/photo-garbh-rest.png" alt="Quiet Garbh Sanskar rest at home" fill className="absolute inset-0" sizes="100vw" zoomOnHover={false} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1220]/80 via-[#1A1220]/45 to-transparent" />
        <Container className="relative flex min-h-[min(88vh,46rem)] items-end pb-16 pt-28 lg:items-center">
          <div className="max-w-2xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">WonderHug Journey</p>
            <h1 className="mt-4 font-serif text-display font-medium text-white">A daily companion from planning to parenting</h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Garbh Sanskar as practice, modern wellness education, and a WhatsApp community for Telugu-speaking homes in Telangana and Andhra Pradesh. Education — not a clinic.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/start" size="lg">
                Start your journey
              </ButtonLink>
              <ButtonLink to="/journey/planner?type=planner" variant="teal" size="lg">
                Choose a planner
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">Choose your stage</p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Where are you right now?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STAGES.map((stage, index) => (
            <Reveal key={stage.id} delay={index * 0.05}>
              <Link to={stage.href} className="group block overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-lift">
                <HoverMedia src={JOURNEY_ART[stage.id].src} alt={JOURNEY_ART[stage.id].alt} className="aspect-[16/10] w-full" />
                <div className="p-6">
                  <h3 className="font-serif text-2xl group-hover:text-teal-dark">{stage.title}</h3>
                  <p className="mt-3 text-slate">{stage.body}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="bg-navy text-white">
        <Container className="grid gap-8 py-12 sm:grid-cols-3">
          {[
            { value: '3', label: 'Wellness programmes' },
            { value: String(practiceList.length), label: 'Daily practices' },
            { value: '50,000+', label: 'Mothers on WhatsApp' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white/70">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <Container className="py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple">Daily practice</p>
        <h2 className="mt-2 font-serif text-3xl">Ten unhurried minutes is a complete session</h2>
        <p className="mt-4 max-w-2xl text-slate">
          Sit, breathe, play one piece of music you already love, or tell a story you already know. If your household does not use mantra, silence is not a failure of Garbh Sanskar.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {practiceList.slice(0, 4).map((practice) => (
            <Link key={practice.id} to={`/practices/${practice.slug}`} className="rounded-2xl border border-line bg-canvas p-5 hover:border-teal">
              <p className="text-xs uppercase tracking-[0.14em] text-teal-dark">{practice.durationMinutes} minutes</p>
              <h3 className="mt-2 font-serif text-xl">{pick(practice.title, locale)}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate">{pick(practice.description, locale)}</p>
            </Link>
          ))}
        </div>
        <ButtonLink to="/practices" variant="secondary" className="mt-8">
          Open the practice library
        </ButtonLink>
      </Container>

      <section className="bg-gradient-to-br from-[#F7E9F2] to-[#E7F6F4]">
        <Container className="py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple">Membership</p>
          <h2 className="mt-2 font-serif text-3xl">Programmes when you want company</h2>
          <p className="mt-4 max-w-2xl text-slate">
            Beej Sanskar, Womb Care and Super Parenting are wellness education. They do not treat infertility, replace antenatal visits, or quote success rates.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {publishedPrograms.map((program) => (
              <article key={program.id} className="overflow-hidden rounded-3xl border border-line bg-white">
                <HoverMedia src={program.coverImage} alt={pick(program.name, locale)} className="aspect-[16/9] w-full" />
                <div className="p-6">
                  <h3 className="font-serif text-2xl">
                    <Link to={`/programs/${program.slug}`}>{pick(program.name, locale)}</Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate">{pick(program.summary, locale)}</p>
                  <p className="mt-4 font-medium text-purple">{formatInr(program.pricePaise, locale)}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">Next step</p>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Ready to pick a plan?</h2>
        <p className="mx-auto mt-4 max-w-xl text-slate">
          Tell us whether you are planning, pregnant or parenting. We will show the matching programme, what is included, and the full price or three EMI amounts — then take you to checkout.
        </p>
        <ButtonLink to="/journey/planner?type=planner" size="lg" className="mt-8">
          Continue to planning & payment
        </ButtonLink>
      </Container>
    </>
  )
}
