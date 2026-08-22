'use client'

import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { whatsappUrl } from '@/services/whatsapp'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { SectionHeader } from '@/components/editorial/SectionHeader'
import { useCmsImage } from '@/hooks/useCmsImages'

export function StoriesSection() {
  const { t } = useTranslation()
  const art = useCmsImage('community')
  return (
    <section className="bg-canvas py-16 md:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <HoverMedia
          src={art.src}
          alt={art.alt}
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
