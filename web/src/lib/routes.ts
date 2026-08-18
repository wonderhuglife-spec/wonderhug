import { BLOG_POSTS } from '@/data/blog'
import { COMMUNITY_GROUPS } from '@/data/community'
import { EXPERTS } from '@/data/experts'
import { HUB_PAGES } from '@/data/hubs'
import { PRACTICES } from '@/data/practices'
import { PRODUCTS } from '@/data/products'
import { PROGRAMS } from '@/data/programs'
import { WEEK_GUIDES } from '@/data/weeks'

export type RouteEntry = { path: string; description: string }

const STATIC_ROUTES: RouteEntry[] = [
  { path: '/', description: 'Homepage: hero, journey selector, programmes, shop, WhatsApp, journal' },
  { path: '/programs', description: 'Wellness programme catalogue with INR pricing' },
  { path: '/shop', description: 'Product listing with add-to-cart' },
  { path: '/cart', description: 'Cart contents and checkout CTA' },
  { path: '/checkout', description: 'Razorpay or demo checkout form' },
  { path: '/experts', description: 'Faculty directory with speciality filters' },
  { path: '/community', description: 'Moderated rooms plus WhatsApp / AiSensy join' },
  { path: '/tools', description: 'Index of due date, kicks, contractions, weight' },
  { path: '/tools/due-date', description: 'Due-date calculator (Naegele’s rule)' },
  { path: '/tools/kicks', description: 'Kick / movement counter' },
  { path: '/tools/contractions', description: 'Contraction timer notebook' },
  { path: '/tools/weight', description: 'Weight log (not a medical chart)' },
  { path: '/blog', description: 'Journal index with category and search' },
  { path: '/practices', description: 'Garbh Sanskar practice library' },
  { path: '/about', description: 'About WonderHug and team seats' },
  { path: '/start', description: 'Start-your-journey onboarding' },
  { path: '/download', description: 'Native app download / TestFlight notes' },
  { path: '/signin', description: 'Phone OTP and email magic-link sign-in' },
  { path: '/account', description: 'Profile, timeline, orders, saved articles' },
  { path: '/admin', description: 'Staff CMS for homepage, journal, products, experts, media assets' },
  { path: '/privacy', description: 'Operational privacy notice (counsel copy pending)' },
  { path: '/terms', description: 'Operational terms (counsel copy pending)' },
  { path: '/medical-disclaimer', description: 'Education-not-diagnosis disclaimer' },
  { path: '/pregnancy/week-by-week', description: 'Index of forty educational week notes' },
  { path: '/learn/beej-sanskar', description: 'Beej Sanskar lesson player (enrolment-gated)' },
  { path: '/learn/womb-care', description: 'Womb Care lesson player (enrolment-gated)' },
  { path: '/learn/super-parenting', description: 'Super Parenting lesson player (enrolment-gated)' },
  { path: '/learn/beej-sanskar/week-1-shared-rhythm', description: 'Beej Sanskar first lesson player' },
]

export function allAppRoutes(): RouteEntry[] {
  const hubs = HUB_PAGES.map((hub) => ({
    path: hub.path,
    description: `Topic hub: ${hub.title.en}`,
  }))
  const weeks = WEEK_GUIDES.map((week) => ({
    path: `/pregnancy/week/${week.week}`,
    description: `Week ${week.week} educational note`,
  }))
  const posts = BLOG_POSTS.filter((post) => post.isPublished).map((post) => ({
    path: `/blog/${post.slug}`,
    description: `Journal: ${post.title.en}`,
  }))
  const experts = EXPERTS.filter((expert) => expert.isListed).map((expert) => ({
    path: `/experts/${expert.slug}`,
    description: `Faculty profile: ${expert.name}`,
  }))
  const products = PRODUCTS.filter((product) => product.isPublished).map((product) => ({
    path: `/shop/${product.slug}`,
    description: `Product: ${product.name.en}`,
  }))
  const programs = PROGRAMS.map((program) => ({
    path: `/programs/${program.slug}`,
    description: `Programme: ${program.name.en}`,
  }))
  const practices = PRACTICES.map((practice) => ({
    path: `/practices/${practice.slug}`,
    description: `Practice: ${practice.title.en}`,
  }))
  const rooms = COMMUNITY_GROUPS.map((group) => ({
    path: `/community/${group.slug}`,
    description: `Community room: ${group.name.en}`,
  }))
  const confirmation = [{ path: '/order/demo-preview', description: 'Order confirmation (unknown id still renders a real page)' }]

  const merged = [...STATIC_ROUTES, ...hubs, ...weeks, ...posts, ...experts, ...products, ...programs, ...practices, ...rooms, ...confirmation]
  const seen = new Set<string>()
  return merged.filter((entry) => {
    if (seen.has(entry.path)) return false
    seen.add(entry.path)
    return true
  })
}
