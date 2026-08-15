import { HeroSection } from '@/sections/home/HeroSection'
import { JourneySelector } from '@/sections/home/JourneySelector'
import { PersonalizedExperience } from '@/sections/home/PersonalizedExperience'
import { FeatureEcosystem } from '@/sections/home/FeatureEcosystem'
import { ToolsSection } from '@/sections/home/ToolsSection'
import { ExpertsPreview } from '@/sections/home/ExpertsPreview'
import { CommunityPreview } from '@/sections/home/CommunityPreview'
import { EvidenceSection } from '@/sections/home/EvidenceSection'
import { StoriesSection } from '@/sections/home/StoriesSection'
import { FeaturedContent } from '@/sections/home/FeaturedContent'
import { AppPromotion } from '@/sections/home/AppPromotion'
import { FinalCta } from '@/sections/home/FinalCta'
import { MedicalNote } from '@/sections/home/MedicalNote'
import { JsonLd, Seo, organizationJsonLd } from '@/components/seo/Seo'

export function HomePage() {
  return (
    <>
      <Seo
        title="WonderHug.Life — from pregnancy planning to conscious parenting"
        description="A trusted daily companion for the journey from preparing for pregnancy to raising a child. Experts, education, tools and community — evidence-aware and culturally at home in India."
        path="/"
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Is WonderHug a clinic?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. WonderHug.Life is education, Garbh Sanskar practice and community. Speak with a qualified clinician for medical decisions.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is Telugu supported?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. English and Telugu are first-class locales on the website and in the native app.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I join the WhatsApp community?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use the WhatsApp dock or Community pages. Rooms are run with AiSensy for 50,000+ mothers.',
              },
            },
          ],
        }}
      />
      <HeroSection />
      <JourneySelector />
      <PersonalizedExperience />
      <FeatureEcosystem />
      <ToolsSection />
      <ExpertsPreview />
      <CommunityPreview />
      <EvidenceSection />
      <StoriesSection />
      <FeaturedContent />
      <AppPromotion />
      <FinalCta />
      <MedicalNote />
    </>
  )
}
