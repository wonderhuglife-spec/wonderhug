import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'

const pages = {
  privacy: {
    title: 'Privacy',
    path: '/privacy',
    body: 'TODO: counsel-reviewed privacy policy. Until then, treat this page as a shell. The website stores journey stage in localStorage on this device. Supabase Auth and profiles are used only when environment keys are configured.',
  },
  terms: {
    title: 'Terms',
    path: '/terms',
    body: 'TODO: counsel-reviewed terms of use. WonderHug.Life educational materials are not medical care.',
  },
  disclaimer: {
    title: 'Medical disclaimer',
    path: '/medical-disclaimer',
    body: MEDICAL_DISCLAIMER,
  },
} as const

export function LegalPage({ kind }: { kind: keyof typeof pages }) {
  const page = pages[kind]
  return (
    <>
      <Seo title={page.title} description={page.body.slice(0, 150)} path={page.path} />
      <Container narrow className="py-16">
        <Heading as="h1">{page.title}</Heading>
        <Text className="mt-6 text-lg leading-relaxed">{page.body}</Text>
      </Container>
    </>
  )
}
