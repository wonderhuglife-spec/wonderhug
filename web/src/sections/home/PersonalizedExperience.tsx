'use client'

import { useJourney } from '@/hooks/useJourney'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { useTranslation } from 'react-i18next'

export function PersonalizedExperience() {
  const { profile, recommendations } = useJourney()
  const primary = recommendations[0]
  const { t } = useTranslation()

  return (
    <section className="py-8">
      <Container>
        <div className="grid overflow-hidden rounded-[2rem] bg-navy text-white lg:grid-cols-12">
          <div className="px-6 py-14 sm:px-12 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{t('home.companionKicker')}</p>
            <Heading as="h2" className="mt-4 text-white">
              {t('home.companionTitle')}
            </Heading>
            <Text className="mt-5 max-w-xl text-white/80">{t('home.companionBody')}</Text>
          </div>
          <div className="m-6 rounded-3xl bg-white/10 p-6 backdrop-blur lg:col-span-5 lg:m-10">
            <p className="text-sm text-white/70">{t('home.showingFor')}</p>
            <p className="mt-1 font-serif text-3xl capitalize">{profile.journeyStage.replace(/_/g, ' ')}</p>
            {primary ? (
              <p className="mt-4 text-sm text-white/80">
                {t('home.nextStep')} <span className="text-white">{primary.title}</span>
              </p>
            ) : null}
            <ButtonLink to="/start" variant="secondary" className="mt-6">
              {t('cta.start')}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
