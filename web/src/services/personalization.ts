import { BLOG_POSTS } from '@/data/blog'
import { COMMUNITY_GROUPS } from '@/data/community'
import { PRACTICES } from '@/data/practices'
import { PRODUCTS } from '@/data/products'
import { PROGRAMS } from '@/data/programs'
import { TOOLS } from '@/data/tools'
import { pick } from '@/lib/locale'
import type { Goal, JourneyStage, Locale, PersonalizationProfile, RecommendedItem } from '@/types/domain'

export const defaultProfile = (stage: JourneyStage = 'planning'): PersonalizationProfile => ({
  journeyStage: stage,
  pregnancyWeek: null,
  babyAgeMonths: null,
  language: 'en',
  interests: [],
  goals: [],
  savedContentIds: [],
  completedActivityIds: [],
})

export const STAGE_NARRATIVE: Record<JourneyStage, { title: string; body: string; titleTe: string; bodyTe: string }> = {
  planning: {
    title: 'You are preparing, not rushing.',
    body: 'Planning nutrition, couple practices and Beej Sanskar sit first.',
    titleTe: 'మీరు సిద్ధమవుతున్నారు, తొందరపడడం లేదు.',
    bodyTe: 'పోషకాహారం, జంట సాధన, బీజ సంస్కారం ముందు.',
  },
  ttc: {
    title: 'Trying is a season, not a test.',
    body: 'Yoga, kitchen education, counsellor access and a calm WhatsApp room.',
    titleTe: 'ప్రయత్నం ఒక కాలం, పరీక్ష కాదు.',
    bodyTe: 'యోగా, వంటిల్లు, కౌన్సెలర్, నిశ్శబ్ద WhatsApp గది.',
  },
  pregnant: {
    title: 'This week can feel full. We keep it simple.',
    body: 'Your week note, a Garbh Sanskar practice, and tools that respect your clinician.',
    titleTe: 'ఈ వారం నిండుగా ఉండవచ్చు. మేము సరళంగా ఉంచుతాం.',
    bodyTe: 'వారపు గమనిక, గర్భ సంస్కార సాధన, వైద్యునికి గౌరవం.',
  },
  birth_prep: {
    title: 'Birth preparation, without scare stories.',
    body: 'Preferences worksheet, contraction timer as a notebook, Womb Care modules.',
    titleTe: 'భయం లేని ప్రసవ సిద్ధత.',
    bodyTe: 'ప్రాధాన్యతలు, టైమర్ నోటుబుక్, వూంబ్ కేర్.',
  },
  new_parent: {
    title: 'The fourth trimester is still a journey.',
    body: 'Rhythm guide, Super Parenting, and the breastfeeding room.',
    titleTe: 'నాలుగవ త్రైమాసికం ఇంకా ప్రయాణం.',
    bodyTe: 'లయ గైడ్, సూపర్ పేరెంటింగ్, పాల గది.',
  },
  parenting: {
    title: 'Raising with attention, not perfection.',
    body: 'Development ranges and joint-family parenting notes.',
    titleTe: 'శ్రద్ధతో పెంపకం, పరిపూర్ణత కాదు.',
    bodyTe: 'అభివృద్ధి పరిధులు, ఉమ్మడి కుటుంబ గమనికలు.',
  },
}

function weekOk(item: RecommendedItem, week: number | null) {
  if (week == null) return true
  if (item.weekMin != null && week < item.weekMin) return false
  if (item.weekMax != null && week > item.weekMax) return false
  return true
}

function score(item: RecommendedItem, profile: PersonalizationProfile) {
  let n = 0
  if (item.stageFit.includes(profile.journeyStage)) n += 5
  const goals = item.goals ?? []
  for (const g of profile.goals) {
    if (goals.includes(g)) n += 3
  }
  if (weekOk(item, profile.pregnancyWeek)) n += 1
  else n -= 4
  return n
}

export function recommend(profile: PersonalizationProfile, locale: Locale = 'en'): RecommendedItem[] {
  const stage = profile.journeyStage
  const catalog: RecommendedItem[] = [
    ...PRODUCTS.filter((p) => p.journeyStages.includes(stage)).map((p) => ({
      id: p.id,
      kind: 'product' as const,
      title: pick(p.name, locale),
      description: pick(p.description, locale),
      href: `/shop/${p.slug}`,
      stageFit: p.journeyStages,
      goals: p.goals,
    })),
    ...PROGRAMS.filter((p) => p.journeyStages.includes(stage)).map((p) => ({
      id: p.id,
      kind: 'program' as const,
      title: pick(p.name, locale),
      description: pick(p.summary, locale),
      href: `/programs/${p.slug}`,
      stageFit: p.journeyStages,
      goals: p.goals,
    })),
    ...BLOG_POSTS.filter((p) => p.isPublished).map((p) => ({
      id: p.id,
      kind: 'article' as const,
      title: pick(p.title, locale),
      description: pick(p.excerpt, locale),
      href: `/blog/${p.slug}`,
      stageFit: articleStages(p.category),
      goals: articleGoals(p.tags),
    })),
    ...TOOLS.filter((t) => t.stageFit.includes(stage)).map((t) => ({
      id: t.id,
      kind: 'tool' as const,
      title: pick(t.name, locale),
      description: pick(t.description, locale),
      href: t.href,
      stageFit: t.stageFit,
    })),
    ...PRACTICES.map((p) => ({
      id: p.id,
      kind: 'practice' as const,
      title: pick(p.title, locale),
      description: pick(p.description, locale),
      href: `/practices/${p.slug}`,
      stageFit: ['pregnant', 'birth_prep', 'planning'] as JourneyStage[],
      goals: ['garbh_sanskar' as Goal],
      weekMin: p.trimester === '2' ? 13 : p.trimester === '3' ? 27 : undefined,
      weekMax: p.trimester === '1' ? 12 : undefined,
    })),
    ...COMMUNITY_GROUPS.filter((g) => g.journeyStages.includes(stage)).map((g) => ({
      id: g.id,
      kind: 'group' as const,
      title: pick(g.name, locale),
      description: pick(g.description, locale),
      href: `/community/${g.slug}`,
      stageFit: g.journeyStages,
    })),
  ]

  return catalog
    .map((item) => ({ item, n: score(item, profile) }))
    .filter((row) => row.n > 0)
    .sort((a, b) => b.n - a.n)
    .map((row) => row.item)
    .filter((item, index, arr) => arr.findIndex((x) => x.id === item.id) === index)
}

function articleStages(category: string): JourneyStage[] {
  if (['Fertility'].includes(category)) return ['planning', 'ttc']
  if (['Pregnancy', 'Garbh Sanskar', 'Birth Preparation', 'Indian Traditions'].includes(category)) {
    return ['pregnant', 'birth_prep', 'planning']
  }
  if (['Postpartum'].includes(category)) return ['new_parent']
  return ['parenting', 'new_parent']
}

function articleGoals(tags: string[]): Goal[] {
  const goals: Goal[] = []
  if (tags.includes('garbh-sanskar')) goals.push('garbh_sanskar')
  if (tags.includes('couple')) goals.push('couple')
  if (tags.includes('postpartum')) goals.push('postpartum_recovery')
  if (tags.includes('planning')) goals.push('couple')
  return goals
}

export function narrativeFor(stage: JourneyStage, locale: Locale) {
  const n = STAGE_NARRATIVE[stage]
  return locale === 'te' ? { title: n.titleTe, body: n.bodyTe } : { title: n.title, body: n.body }
}

export const personalizationService = { recommend, narrativeFor, defaultProfile }
