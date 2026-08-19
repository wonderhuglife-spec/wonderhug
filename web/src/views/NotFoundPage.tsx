'use client'

import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/editorial/PageHero'

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="This WonderHug path does not exist." path="/404" />
      <PageHero
        kicker="404"
        title="This page is not on the journey."
        lede="The URL may be mistyped, or the cluster page has not been published yet."
        src="/images/placeholder-ai-hero-home.png"
        alt="An expecting couple sitting together in a sunlit family living room."
      >
        <ButtonLink to="/">Back home</ButtonLink>
      </PageHero>
    </>
  )
}
