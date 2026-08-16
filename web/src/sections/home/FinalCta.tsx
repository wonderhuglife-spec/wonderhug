'use client'

import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { track } from '@/services/analytics'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

export function FinalCta() {
  const { t } = useTranslation()
  return (
    <section className="pb-8">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] px-6 py-16 text-center text-white sm:px-12">
          <Image src="/images/placeholder-ai-hero-home.png" alt="placeholder-ai- Final call-to-action atmosphere." fill className="object-cover" sizes="1200px" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple/85 via-[#5C2F78]/80 to-navy/85" />
          <div className="relative">
            <Image src="/logo.png" alt="" width={96} height={96} className="mx-auto h-20 w-20 rounded-full bg-white object-contain p-1" />
            <Heading as="h2" className="mt-6 text-white">
              {t('home.beginTitle')}
            </Heading>
            <Text className="mx-auto mt-4 max-w-xl text-lg text-white/80">{t('home.beginBody')}</Text>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/start" size="lg" className="bg-white text-purple hover:bg-teal-soft" onClick={() => track('hero_cta_click', { placement: 'final' })}>
                {t('cta.start')}
              </ButtonLink>
              <ButtonLink to="/blog" variant="secondary" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                {t('home.readJournal')}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
