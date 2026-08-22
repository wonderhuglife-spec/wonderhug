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
    <section className="py-16 md:py-24">
      <Container narrow>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">{t('home.companionKicker')}</p>
        <Heading as="h2" className="mt-4">
          {t('home.companionTitle')}
        </Heading>
        <Text muted className="mt-5 text-lg">
          {t('home.companionBody')}
        </Text>
        <p className="mt-8 text-sm text-slate">{t('home.showingFor')}</p>
        <p className="mt-1 font-serif text-3xl capitalize text-ink">{profile.journeyStage.replace(/_/g, ' ')}</p>
        {primary ? (
          <p className="mt-4 text-slate">
            {t('home.nextStep')} <span className="text-ink">{primary.title}</span>
          </p>
        ) : null}
        <ButtonLink to="/start" variant="secondary" className="mt-8">
          {t('cta.start')}
        </ButtonLink>
      </Container>
    </section>
  )
}
