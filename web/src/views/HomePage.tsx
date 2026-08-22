'use client'

import { HeroSection } from '@/sections/home/HeroSection'
import { TrustSignals } from '@/components/editorial/TrustSignals'
import { trustSignals } from '@/data/trustSignals'
import { StoryChapters } from '@/sections/home/StoryChapters'
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

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSignals variant="section" signals={trustSignals} />
      <StoryChapters />
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
