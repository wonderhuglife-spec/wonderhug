import { FEATURE_ECOSYSTEM, STAGE_NARRATIVE } from '@/data/features'
import { COMMUNITY_GROUPS } from '@/data/community'
import { BLOG_POSTS } from '@/data/blog'
import { TOOLS } from '@/data/tools'
import type { JourneyStage, PersonalizationProfile, RecommendedItem } from '@/types/domain'

export const defaultProfile = (stage: JourneyStage = 'planning'): PersonalizationProfile => ({
  journeyStage: stage,
  pregnancyWeek: null,
  babyAgeMonths: null,
  language: 'en-IN',
  interests: [],
  savedContentIds: [],
  completedActivityIds: [],
})

export function recommend(profile: PersonalizationProfile): RecommendedItem[] {
  const stage = profile.journeyStage
  const fromFeatures = FEATURE_ECOSYSTEM.filter((item) => item.stageFit.includes(stage))
  const fromTools: RecommendedItem[] = TOOLS.filter((tool) => tool.stageFit.includes(stage)).map((tool) => ({
    id: tool.id,
    kind: 'tool' as const,
    title: tool.name,
    description: tool.description,
    href: tool.href,
    stageFit: tool.stageFit,
  }))
  const fromArticles: RecommendedItem[] = BLOG_POSTS.filter((post) => post.isPublished)
    .filter((post) => articleFitsStage(post.category, stage))
    .map((post) => ({
      id: post.id,
      kind: 'article' as const,
      title: post.title,
      description: post.excerpt,
      href: `/blog/${post.slug}`,
      stageFit: [stage],
    }))
  const fromGroups: RecommendedItem[] = COMMUNITY_GROUPS.filter((group) =>
    group.journeyStages.includes(stage),
  ).map((group) => ({
    id: group.id,
    kind: 'group' as const,
    title: group.name,
    description: group.description,
    href: `/community/${group.slug}`,
    stageFit: group.journeyStages,
  }))

  const merged = [...fromFeatures, ...fromArticles, ...fromTools, ...fromGroups]
  const seen = new Set<string>()
  return merged.filter((item) => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

function articleFitsStage(category: string, stage: JourneyStage): boolean {
  if (stage === 'planning' || stage === 'ttc') {
    return ['Fertility', 'Nutrition', 'Indian Traditions', 'Emotional Wellbeing'].includes(category)
  }
  if (stage === 'pregnant' || stage === 'birth_prep') {
    return ['Pregnancy', 'Birth Preparation', 'Nutrition', 'Indian Traditions', 'Expert Advice'].includes(category)
  }
  if (stage === 'new_parent') {
    return ['Postpartum', 'Baby Development', 'Parenting', 'Emotional Wellbeing'].includes(category)
  }
  return ['Parenting', 'Baby Development', 'Emotional Wellbeing', 'Expert Advice'].includes(category)
}

export function narrativeFor(stage: JourneyStage) {
  return STAGE_NARRATIVE[stage]
}

export const personalizationService = {
  recommend,
  narrativeFor,
  defaultProfile,
}
