'use client'

import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { MEDICAL_DISCLAIMER, MEDICAL_DISCLAIMER_TE } from '@/lib/constants'
import { currentLocale } from '@/i18n'

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' | 'disclaimer' }) {
  const te = currentLocale() === 'te'
  if (kind === 'disclaimer') {
    return (
      <>
        <Seo title="Medical disclaimer" description={MEDICAL_DISCLAIMER} path="/medical-disclaimer" />
        <Container narrow className="py-16">
          <Heading as="h1">Medical disclaimer</Heading>
          <Text className="mt-6 text-lg">{te ? MEDICAL_DISCLAIMER_TE : MEDICAL_DISCLAIMER}</Text>
        </Container>
      </>
    )
  }
  if (kind === 'privacy') {
    return (
      <>
        <Seo title="Privacy" description="How WonderHug handles data today." path="/privacy" />
        <Container narrow className="py-16">
          <Heading as="h1">Privacy — operational notice</Heading>
          <p className="mt-4 text-sm text-slate">Counsel-reviewed policy will replace this page when supplied. This is how the product behaves now.</p>
          <Text className="mt-6">
            We may store phone number and email if you sign in (Supabase Auth). Journey stage, goals, cart and demo orders can live in this browser. WhatsApp opt-in sends your number to the care desk (AiSensy) when you tap Join. Payments go through Razorpay when keys are present. We do not sell lists. Staff roles can read published CMS tables. Private trackers are row-level locked to your user id.
          </Text>
        </Container>
      </>
    )
  }
  return (
    <>
      <Seo title="Terms" description="Operational terms" path="/terms" />
      <Container narrow className="py-16">
        <Heading as="h1">Terms — operational notice</Heading>
        <p className="mt-4 text-sm text-slate">Counsel-reviewed terms will replace this page when supplied.</p>
        <Text className="mt-6">
          WonderHug.Life sells educational programmes and digital wellness products. They are not medicines and not a hospital. You remain responsible for clinical care. Demo checkout records a local order when Razorpay keys are absent. Indian law and INR pricing apply.
        </Text>
      </Container>
    </>
  )
}
