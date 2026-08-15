import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="This WonderHug path does not exist." path="/404" />
      <Container className="py-24 text-center">
        <Heading as="h1">This page is not on the journey.</Heading>
        <Text muted className="mx-auto mt-4 max-w-md">
          The URL may be mistyped, or the cluster page has not been published yet.
        </Text>
        <ButtonLink to="/" className="mt-8">
          Back home
        </ButtonLink>
      </Container>
    </>
  )
}
