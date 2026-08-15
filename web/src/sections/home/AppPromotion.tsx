import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { track } from '@/services/analytics'

export function AppPromotion() {
  return (
    <section className="py-20">
      <Container className="overflow-hidden rounded-[2rem] bg-teal-soft px-8 py-14 sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">The daily companion</p>
        <Heading as="h2" className="mt-4 max-w-xl">
          WonderHug on your phone is for today — not a website squeezed into a WebView.
        </Heading>
        <Text muted className="mt-4 max-w-xl text-lg">
          Home, Journey, Learn, Community and Profile. Greeting, today’s guidance, saved tools. Store links are
          CONFIG_REQUIRED until WonderHug publishes them.
        </Text>
        <div className="mt-8">
          <ButtonLink to="/download" variant="teal" onClick={() => track('app_download_clicked', { placement: 'home' })}>
            Download App
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
