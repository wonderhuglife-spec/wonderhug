'use client'

import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { EmptyState } from '@/components/ui/EmptyState'

export function DownloadPage() {
  return (
    <>
      <Seo title="Download the app" description="WonderHug native app." path="/download" />
      <Container className="py-16">
        <Heading as="h1">Download App</Heading>
        <Text muted className="mt-4 max-w-xl text-lg">
          The Flutter app is native: Home, Journey, Learn, Community, Profile, shop and trackers. App Store and Play listing assets are waiting on WonderHug. Until those URLs exist, clone the mobile/ folder and run on a device.
        </Text>
        <div className="mt-10">
          <EmptyState
            title="Store badges wait on listing assets"
            description="We will not invent App Store links. Use flutter run in mobile/ for TestFlight/Play internal later."
          />
        </div>
      </Container>
    </>
  )
}
