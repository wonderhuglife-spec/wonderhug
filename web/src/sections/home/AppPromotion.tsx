'use client'

import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { track } from '@/services/analytics'
import { HoverMedia } from '@/components/editorial/HoverMedia'

export function AppPromotion() {
  return (
    <section className="py-20">
      <Container className="grid overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-2">
        <HoverMedia src="/images/placeholder-ai-program-parenting.png" alt="placeholder-ai- Daily companion atmosphere." className="min-h-[18rem] w-full lg:min-h-full" width={900} height={700} />
        <div className="px-8 py-14 sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Take WonderHug with you</p>
          <Heading as="h2" className="mt-4 max-w-xl">
            The same companion in your pocket — not a website squeezed into a WebView.
          </Heading>
          <Text muted className="mt-4 max-w-xl text-lg">
            Home, Journey, Learn, Community and Profile — native screens with offline trackers. App Store and Play listing URLs wait on WonderHug store assets; until then, run the Flutter app from `mobile/`.
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
