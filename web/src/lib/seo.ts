import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'
import { env } from '@/lib/env'

export function pageMetadata(opts: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  image?: string
}): Metadata {
  const site = env.siteUrl.replace(/\/$/, '')
  const url = `${site}${opts.path}`
  const fullTitle = opts.title.includes(SITE_NAME) ? opts.title : `${opts.title} | ${SITE_NAME}`
  const image = opts.image?.startsWith('http') ? opts.image : `${site}${opts.image ?? '/og-image.svg'}`
  return {
    title: fullTitle,
    description: opts.description,
    alternates: { canonical: url, languages: { 'en-IN': url, 'te-IN': url } },
    openGraph: {
      siteName: SITE_NAME,
      title: fullTitle,
      description: opts.description,
      url,
      type: opts.type === 'article' ? 'article' : 'website',
      images: [{ url: image }],
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: opts.description,
      images: [image],
    },
  }
}
