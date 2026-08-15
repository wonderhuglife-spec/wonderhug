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
