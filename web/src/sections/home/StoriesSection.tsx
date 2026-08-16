'use client'

import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { whatsappUrl } from '@/services/whatsapp'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { SectionHeader } from '@/components/editorial/SectionHeader'

export function StoriesSection() {
  const { t } = useTranslation()
  return (
    <section className="bg-canvas py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <HoverMedia
          src="/images/placeholder-ai-community.png"
          alt="placeholder-ai- Community atmosphere for consented stories."
          className="aspect-[4/5] w-full rounded-3xl lg:col-span-5"
          width={720}
          height={900}
        />
        <div className="lg:col-span-7">
          <SectionHeader kicker="Lived stories" title={t('community.whatsappTitle')} lede={`${t('community.whatsappBody')} Named testimonials wait for families who consent in writing. We will not invent quotes.`} />
          <ButtonLink to={whatsappUrl()} variant="teal" className="mt-8" size="lg">
            {t('cta.whatsapp')}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
