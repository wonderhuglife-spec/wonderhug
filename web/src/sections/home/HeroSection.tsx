import { motion, useReducedMotion } from 'framer-motion'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Typography'
import { track } from '@/services/analytics'

export function HeroSection() {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_10%,#F0FDFA,transparent_50%),radial-gradient(700px_circle_at_90%_0%,rgba(121,64,155,0.07),transparent_45%)]" />
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <motion.div
          className="lg:col-span-7"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        >
          <Eyebrow>Pregnancy · Parenting · India</Eyebrow>
          <h1 className="mt-5 font-serif text-display font-medium text-ink">
            Prepare for pregnancy. Nurture every stage. Raise with confidence.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
            WonderHug.Life brings trusted experts, practical guidance, meaningful traditions and everyday
            support together for the journey from pregnancy planning to conscious parenting.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/start" size="lg" onClick={() => track('hero_cta_click', { placement: 'hero_primary' })}>
              Start Your Journey
            </ButtonLink>
            <ButtonLink to="/about" variant="secondary" size="lg">
              Explore WonderHug
            </ButtonLink>
          </div>
        </motion.div>
        <div className="lg:col-span-5">
          <figure className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-teal-soft">
              <img
                src="/images/hero-family.svg"
                alt="Editorial illustration of a parent holding a child in warm light. Replace with licensed WonderHug photography."
                className="h-full w-full object-cover"
                width={720}
                height={900}
              />
            </div>
            <figcaption className="mt-3 text-xs text-slate-muted">
              Photography slot — official WonderHug imagery pending. Not a stock family portrait presented as a customer.
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}
