'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { track } from '@/services/analytics'
import { whatsappUrl } from '@/services/whatsapp'
import { currentLocale } from '@/i18n'

export function HeroSection() {
  const reduce = useReducedMotion()
  const { t } = useTranslation()
  const locale = currentLocale()

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_0%_0%,rgba(48,146,146,0.16),transparent_55%),radial-gradient(60%_70%_at_100%_10%,rgba(121,64,155,0.16),transparent_50%),linear-gradient(180deg,#F7FBFA_0%,#FFFFFF_70%)]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-purple/10 blur-3xl" />
      <Container className="relative grid items-center gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <motion.div
          className="lg:col-span-7"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.55 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-purple/15 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-purple shadow-sm">
            {t('hero.kicker')}
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink">
            {t('hero.title')}
          </h1>
          {locale === 'en' ? (
            <p className="mt-3 font-serif text-xl text-teal-dark sm:text-2xl">గర్భానికి సిద్ధమవ్వండి. ప్రతి దశను పోషించండి.</p>
          ) : (
            <p className="mt-3 font-serif text-xl text-purple sm:text-2xl">Prepare for pregnancy. Nurture every stage.</p>
          )}
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
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-line/80 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-muted">{t('hero.statMothersLabel')}</dt>
              <dd className="mt-1 font-serif text-2xl text-purple">50,000+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-muted">{t('hero.statLangLabel')}</dt>
              <dd className="mt-1 font-serif text-2xl text-teal-dark">EN · TE</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-muted">{t('hero.statCareLabel')}</dt>
              <dd className="mt-1 font-serif text-2xl text-navy">{t('hero.statCareValue')}</dd>
            </div>
          </dl>
        </motion.div>
        <motion.div
          className="lg:col-span-5"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.08 }}
        >
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-purple/20 via-white to-teal/25 blur-2xl" />
            <figure className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-lift">
              <Image
                src="/logo.png"
                alt="WonderHug.Life — two arms forming a hug and a heart"
                width={720}
                height={720}
                className="mx-auto h-auto w-full max-w-sm object-contain"
                priority
              />
              <figcaption className="mt-4 text-center text-sm text-slate">{t('hero.logoCaption')}</figcaption>
              <ButtonLink to="/start" className="mt-6 w-full" variant="teal">
                {t('hero.getStarted')}
              </ButtonLink>
            </figure>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
