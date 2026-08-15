export type JourneyStage =
  | 'planning'
  | 'ttc'
  | 'pregnant'
  | 'birth_prep'
  | 'new_parent'
  | 'parenting'

export type ReviewStatus = 'draft' | 'in_review' | 'reviewed' | 'needs_update'

export type UserRole = 'user' | 'moderator' | 'expert' | 'admin'

export type BlogCategory =
  | 'Pregnancy'
  | 'Fertility'
  | 'Parenting'
  | 'Baby Development'
  | 'Nutrition'
  | 'Birth Preparation'
  | 'Postpartum'
  | 'Expert Advice'
  | 'Emotional Wellbeing'
  | 'Indian Traditions'

export type ExpertSpeciality =
  | 'Gynecologists'
  | 'Obstetricians'
  | 'Fertility Specialists'
  | 'Pediatricians'
  | 'Nutrition Experts'
  | 'Yoga Experts'
  | 'Lactation Experts'
  | 'Parenting Specialists'
  | 'Counsellors'

export type ContentKind = 'article' | 'tool' | 'group' | 'activity' | 'expert'

export interface PersonalizationProfile {
  journeyStage: JourneyStage
  pregnancyWeek: number | null
  babyAgeMonths: number | null
  language: string
  interests: string[]
  savedContentIds: string[]
  completedActivityIds: string[]
}

export interface RecommendedItem {
  id: string
  kind: ContentKind
  title: string
  description: string
  href: string
  stageFit: JourneyStage[]
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  featuredImageAlt: string
  videoUrl: string | null
  category: BlogCategory
  authorId: string
  authorName: string
  expertReviewerId: string | null
  expertReviewerName: string | null
  expertReviewerQualification: string | null
  reviewStatus: ReviewStatus
  publishedAt: string
  updatedAt: string
  lastReviewedAt: string | null
  displayOrder: number
  readingTime: number
  isFeatured: boolean
  isPublished: boolean
  seoTitle: string
  seoDescription: string
  canonicalUrl: string | null
  relatedSlugs: string[]
  relatedExpertSlug: string | null
  relatedToolSlugs: string[]
  references: { label: string; href?: string }[]
  dataStatus: 'verified' | 'CONTENT_PLACEHOLDER'
}

export interface Expert {
  id: string
  slug: string
  name: string
  photo: string
  speciality: ExpertSpeciality
  qualification: string
  bio: string
  languages: string[]
  reviewStatus: ReviewStatus
  availability: string
  dataStatus: 'REQUIRES_VERIFIED_DATA'
}

export interface CommunityGroup {
  id: string
  slug: string
  name: string
  description: string
  journeyStages: JourneyStage[]
}

export interface CommunityPost {
  id: string
  groupSlug: string
  title: string
  body: string
  authorLabel: string
  isExpertAnswer: boolean
  createdAt: string
  dataStatus: 'CONTENT_PLACEHOLDER'
}

export interface Tool {
  id: string
  slug: string
  name: string
  description: string
  href: string
  stageFit: JourneyStage[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  description: string
  portrait: string
  dataStatus: 'REQUIRES_VERIFIED_DATA'
}

export interface HubPageContent {
  path: string
  title: string
  seoTitle: string
  seoDescription: string
  kicker: string
  intro: string
  sections: { heading: string; body: string }[]
  related: { label: string; href: string }[]
}

export interface AsyncState<T> {
  status: 'loading' | 'success' | 'empty' | 'error'
  data: T | null
  error: string | null
}
