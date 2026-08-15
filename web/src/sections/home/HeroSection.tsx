import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Typography'
import { track } from '@/services/analytics'
import { whatsappUrl } from '@/services/whatsapp'

export function HeroSection() {
  const reduce = useReducedMotion()
  const { t } = useTranslation()
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
          <Eyebrow>{t('hero.kicker')}</Eyebrow>
          <h1 className="mt-5 font-serif text-display font-medium text-ink">{t('hero.title')}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">{t('hero.body')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/start" size="lg" onClick={() => track('hero_cta_click', { placement: 'hero_primary' })}>
              {t('cta.start')}
            </ButtonLink>
            <ButtonLink to={whatsappUrl()} variant="teal" size="lg">
              {t('cta.whatsapp')}
            </ButtonLink>
            <ButtonLink to="/about" variant="secondary" size="lg">
              {t('nav.about')}
            </ButtonLink>
          </div>
        </motion.div>
        <div className="lg:col-span-5">
          <figure>
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-teal-soft">
              <img
                src="/images/hero-family.svg"
                alt={t('common.pendingPhoto')}
                className="h-full w-full object-cover"
                width={720}
                height={900}
                loading="eager"
              />
            </div>
            <figcaption className="mt-3 text-xs text-slate-muted">{t('common.pendingPhoto')}</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}
