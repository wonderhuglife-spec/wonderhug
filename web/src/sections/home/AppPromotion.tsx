'use client'

import { ButtonLink } from '@/components/ui/Button'
import { Heading, Text } from '@/components/ui/Typography'
import { track } from '@/services/analytics'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { useCmsImage } from '@/hooks/useCmsImages'
import { Container } from '@/components/ui/Container'

export function AppPromotion() {
  const art = useCmsImage('program_parenting')
  return (
    <section className="relative min-h-[min(70vh,36rem)] overflow-hidden">
      <HoverMedia src={art.src} alt={art.alt} fill className="absolute inset-0" sizes="100vw" zoomOnHover={false} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1220]/80 via-[#1A1220]/45 to-transparent" />
      <Container className="relative flex min-h-[min(70vh,36rem)] items-center py-20">
        <div className="max-w-xl text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Take WonderHug with you</p>
          <Heading as="h2" className="mt-4 text-white">
            The same companion in your pocket — not a website squeezed into a WebView.
          </Heading>
          <Text className="mt-4 text-lg text-white/80">
            Home, Journey, Learn, Community and Profile — native screens with offline trackers. App Store and Play listing URLs wait on WonderHug store assets; until then, run the Flutter app from the mobile folder.
          </Text>
          <div className="mt-8">
            <ButtonLink to="/download" variant="teal" onClick={() => track('app_download_clicked', { placement: 'home' })}>
              Download App
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
