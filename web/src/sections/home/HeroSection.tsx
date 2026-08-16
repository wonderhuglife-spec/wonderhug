'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useCmsImage } from '@/hooks/useCmsImages'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { track } from '@/services/analytics'
import { whatsappUrl } from '@/services/whatsapp'

export function HeroSection() {
  const reduce = useReducedMotion()
  const { t } = useTranslation()
  const heroArt = useCmsImage('hero_home')
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 80])

  return (
    <section className="relative min-h-[min(92vh,52rem)] overflow-hidden">
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: reduce ? 0 : y }}>
        <Image src={heroArt.src} alt={heroArt.alt} fill priority className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#FBF7F2]/95 via-[#FBF7F2]/78 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FBF7F2] via-transparent to-black/10" />
      <Container className="relative grid min-h-[min(92vh,52rem)] items-end pb-16 pt-24 lg:items-center lg:py-24">
        <motion.div
          className="max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.55 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-purple shadow-sm backdrop-blur">
            {t('hero.kicker')}
          </p>
          <h1 className="mt-6 font-serif text-[clamp(2.5rem,6vw,4.6rem)] font-medium leading-[1.06] tracking-[-0.03em] text-ink">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">{t('hero.body')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/start" size="lg" onClick={() => track('hero_cta_click', { placement: 'hero_primary' })}>
              {t('cta.start')}
            </ButtonLink>
            <ButtonLink to={whatsappUrl()} variant="teal" size="lg">
              {t('cta.whatsapp')}
            </ButtonLink>
            <ButtonLink to="/shop" variant="secondary" size="lg">
              {t('cta.shop')}
            </ButtonLink>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-ink/10 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-muted">{t('hero.statMothersLabel')}</dt>
              <dd className="mt-1 font-serif text-2xl text-purple">50,000+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-muted">{t('hero.statLangLabel')}</dt>
              <dd className="mt-1 font-serif text-2xl text-teal-dark">TG · AP</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-muted">{t('hero.statCareLabel')}</dt>
              <dd className="mt-1 font-serif text-2xl text-navy">{t('hero.statCareValue')}</dd>
            </div>
          </dl>
        </motion.div>
      </Container>
    </section>
  )
}
