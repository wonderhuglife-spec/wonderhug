'use client'

import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/ui/EmptyState'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { ButtonLink } from '@/components/ui/Button'
import { whatsappUrl } from '@/services/whatsapp'

export function StoriesSection() {
  const { t } = useTranslation()
  return (
    <section className="bg-canvas py-20">
      <Container>
        <Heading as="h2">{t('community.whatsappTitle')}</Heading>
        <Text muted className="mt-4 max-w-2xl text-lg">
          {t('community.whatsappBody')} Named testimonials wait for families who consent in writing. We will not invent quotes.
        </Text>
        <div className="mt-10">
          <EmptyState
            title="Stories publish with consent"
            description="Join the living WhatsApp rooms meanwhile — 50,000+ mothers already there via AiSensy."
            action={
              <ButtonLink to={whatsappUrl()} variant="teal">
                {t('cta.whatsapp')}
              </ButtonLink>
            }
          />
        </div>
      </Container>
    </section>
  )
}
