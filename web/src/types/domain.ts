export type Locale = 'en' | 'te'
export type Goal =
  | 'reduce_anxiety'
  | 'prepare_birth'
  | 'postpartum_recovery'
  | 'garbh_sanskar'
  | 'nutrition'
  | 'couple'

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
  | 'Garbh Sanskar'

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
  | 'Garbh Sanskar Guides'

export type ContentKind = 'article' | 'tool' | 'group' | 'activity' | 'expert' | 'product' | 'program' | 'practice'

export interface PersonalizationProfile {
  journeyStage: JourneyStage
  pregnancyWeek: number | null
  babyAgeMonths: number | null
  language: Locale
  interests: string[]
  goals: Goal[]
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
  goals?: Goal[]
  weekMin?: number
  weekMax?: number
}

export interface LocalizedText {
  en: string
  te: string
}

export interface BlogPost {
  id: string
  slug: string
  title: LocalizedText
  excerpt: LocalizedText
  content: LocalizedText
  featuredImage: string
  featuredImageAlt: string
  videoUrl: string | null
  category: BlogCategory
  tags: string[]
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
  seoTitle: LocalizedText
  seoDescription: LocalizedText
  canonicalUrl: string | null
  relatedSlugs: string[]
  relatedExpertSlug: string | null
  relatedToolSlugs: string[]
  references: { label: string; href?: string }[]
}

export interface Expert {
  id: string
  slug: string
  name: string
  photo: string
  speciality: ExpertSpeciality
  qualification: string
  bio: LocalizedText
  languages: string[]
  reviewStatus: ReviewStatus
  availability: string
  bookingUrl: string
  isFacultySeat: boolean
  specialties: string[]
  isListed: boolean
}

export interface CommunityGroup {
  id: string
  slug: string
  name: LocalizedText
  description: LocalizedText
  journeyStages: JourneyStage[]
}

export interface CommunityPost {
  id: string
  groupSlug: string
  title: LocalizedText
  body: LocalizedText
  authorLabel: string
  isExpertAnswer: boolean
  createdAt: string
}

export interface Product {
  id: string
  slug: string
  name: LocalizedText
  description: LocalizedText
  pricePaise: number
  currency: 'INR'
  image: string
  category: string
  journeyStages: JourneyStage[]
  goals: Goal[]
  isDigital: boolean
  isPublished: boolean
}

export interface ProgramQuiz {
  question: LocalizedText
  options: LocalizedText[]
  answerIndex: number
  explanation: LocalizedText
}

export interface ProgramModule {
  id: string
  title: LocalizedText
  body: LocalizedText
  displayOrder: number
  quiz?: ProgramQuiz
}

export interface ProgramLesson {
  id: string
  slug: string
  moduleId: string
  title: LocalizedText
  kind: 'video' | 'audio' | 'text'
  body: LocalizedText
  mediaUrl: string | null
  resourceUrl: string | null
  durationSeconds: number
  displayOrder: number
}

export interface Program {
  id: string
  slug: string
  name: LocalizedText
  summary: LocalizedText
  description: LocalizedText
  pricePaise: number
  durationWeeks: number
  level: 'all' | 'beginner' | 'intermediate'
  coverImage: string
  coverImageAlt: string
  instructorSlug: string | null
  instructorName: string
  journeyStages: JourneyStage[]
  goals: Goal[]
  modules: ProgramModule[]
  lessons: ProgramLesson[]
  isPublished: boolean
}

export interface Practice {
  id: string
  slug: string
  title: LocalizedText
  description: LocalizedText
  durationMinutes: number
  mediaType: 'audio' | 'video' | 'guide'
  trimester: '1' | '2' | '3' | 'any'
}

export interface HubPageContent {
  path: string
  title: LocalizedText
  seoTitle: LocalizedText
  seoDescription: LocalizedText
  kicker: LocalizedText
  intro: LocalizedText
  sections: { heading: LocalizedText; body: LocalizedText }[]
  related: { label: LocalizedText; href: string }[]
}

export interface CartItem {
  kind: 'product' | 'program'
  id: string
  slug: string
  title: string
  unitPaise: number
  quantity: number
}

export interface Order {
  id: string
  status: string
  amountPaise: number
  items: CartItem[]
  createdAt: string
  checkoutMode: 'razorpay' | 'demo'
}

export interface AsyncState<T> {
  status: 'loading' | 'success' | 'empty' | 'error'
  data: T | null
  error: string | null
}

export interface WeekGuide {
  week: number
  title: LocalizedText
  body: LocalizedText
  garbhFocus: LocalizedText
}

export interface ToolDef {
  id: string
  slug: string
  name: LocalizedText
  description: LocalizedText
  href: string
  stageFit: JourneyStage[]
  image: string
  imageAlt: string
}
