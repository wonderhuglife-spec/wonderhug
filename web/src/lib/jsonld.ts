import { SITE_NAME } from '@/lib/constants'
import { env } from '@/lib/env'

const SITE = env.siteUrl

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE,
    description: 'Pregnancy and parenting companion from planning through conscious parenting.',
    areaServed: ['IN', 'Telangana', 'Andhra Pradesh'],
    availableLanguage: ['en-IN', 'te-IN'],
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  }
}
