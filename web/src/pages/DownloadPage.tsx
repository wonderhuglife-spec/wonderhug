import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { EmptyState } from '@/components/ui/EmptyState'
import { track } from '@/services/analytics'
import { useEffect } from 'react'

export function DownloadPage() {
  useEffect(() => {
    track('app_download_clicked', { placement: 'download_page' })
  }, [])

  return (
    <>
      <Seo
        title="Download the app"
        description="WonderHug native app for daily guidance. Store links pending (CONFIG_REQUIRED)."
        path="/download"
      />
      <Container className="py-16">
        <Heading as="h1">Download App</Heading>
        <Text muted className="mt-4 max-w-xl text-lg">
          The Flutter app is a native companion (Home, Journey, Learn, Community, Profile). Public store URLs have not
          been provided.
        </Text>
        <div className="mt-10">
          <EmptyState
            title="Store links are CONFIG_REQUIRED"
            description="When WonderHug publishes App Store and Play URLs, they will appear as primary buttons here. We will not invent download badges."
          />
        </div>
      </Container>
    </>
  )
}
