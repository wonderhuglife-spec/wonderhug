'use client'

import { ButtonLink } from '@/components/ui/Button'
import { Heading, Text } from '@/components/ui/Typography'
import { track } from '@/services/analytics'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useCmsImage } from '@/hooks/useCmsImages'
import { Container } from '@/components/ui/Container'

export function FinalCta() {
  const { t } = useTranslation()
  const art = useCmsImage('hero_home')
  return (
    <section className="relative overflow-hidden px-5 py-24 text-center text-white sm:px-8">
      <Image src={art.src} alt={art.alt} fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple/85 via-purple-dark/80 to-navy/85" />
      <Container className="relative">
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
      </Container>
    </section>
  )
}
