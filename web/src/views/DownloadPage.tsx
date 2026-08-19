'use client'

import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHero } from '@/components/editorial/PageHero'

export function DownloadPage() {
  return (
    <>
      <Seo title="Download the app" description="WonderHug native app." path="/download" />
      <PageHero
        kicker="Native app"
        title="Take WonderHug.Life with you"
        lede="The Flutter app is native: Home, Journey, Learn, Community, Profile, shop and trackers. App Store and Play listing assets are waiting on WonderHug. Until those URLs exist, clone the mobile/ folder and run on a device."
        src="/images/photo-chapter-parenting.png"
        alt="App companion atmosphere."
      />
      <Container className="py-16">
        <EmptyState
          title="Store badges wait on listing assets"
          description="We will not invent App Store links. Use flutter run in mobile/ for TestFlight/Play internal later."
        />
      </Container>
    </>
  )
}
