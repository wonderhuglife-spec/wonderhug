'use client'

/** Route-level metadata lives in generateMetadata. This is a no-op for App Router pages. */
export function Seo(_props: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  image?: string
  canonical?: string | null
}) {
  return null
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export { organizationJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
