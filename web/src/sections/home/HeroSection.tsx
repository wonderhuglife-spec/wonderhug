'use client'

import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useCmsImage } from '@/hooks/useCmsImages'
import { useCatalog } from '@/hooks/useCatalog'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { track } from '@/services/analytics'
import { whatsappUrl } from '@/services/whatsapp'

export function HeroSection() {
  const { t } = useTranslation()
  const heroArt = useCmsImage('hero_home')
  const { settings } = useCatalog()
  const kicker = settings.heroKicker.trim() || t('hero.kicker')
  const title = settings.heroTitle.trim() || t('hero.title')
  const body = settings.heroBody.trim() || t('hero.body')
  const heroSrc = settings.heroImageUrl.trim() || heroArt.src
  const heroAlt = settings.heroImageAlt.trim() || heroArt.alt

  return (
    <section className="relative min-h-[min(92vh,54rem)] overflow-hidden">
      <Image src={heroSrc} alt={heroAlt} fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1220]/55 via-[#FBF7F2]/72 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-black/10" />
      <Container className="relative grid min-h-[min(92vh,54rem)] items-end pb-20 pt-28 lg:items-center lg:py-28">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-purple shadow-sm backdrop-blur">
            {kicker}
          </p>
          <h1 className="mt-6 font-serif text-display font-medium text-ink">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">{body}</p>
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
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-ink/10 pt-6">
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
        </div>
      </Container>
    </section>
  )
}
