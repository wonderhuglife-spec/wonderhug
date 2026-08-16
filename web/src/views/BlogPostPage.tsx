'use client'

import { useEffect, useState } from 'react'
import { Link, useParams } from '@/lib/navigation'
import type { BlogPost } from '@/types/domain'
import { JsonLd, Seo, breadcrumbJsonLd } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Heading } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Media } from '@/components/media/Media'
import { Reveal } from '@/components/motion/Reveal'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { isArticleSaved, toggleSavedArticle } from '@/services/saved'
import { track } from '@/services/analytics'
import { BLOG_POSTS } from '@/data/blog'
import { EXPERTS } from '@/data/experts'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { env } from '@/lib/env'
import { useToast } from '@/components/ui/Toast'

export function BlogPostPage({ slug: slugProp, post }: { slug?: string; post?: BlogPost }) {
  const params = useParams()
  const slug = slugProp ?? String(params.slug ?? '')
  const data = post ?? BLOG_POSTS.find((item) => item.slug === slug && item.isPublished)
  const locale = currentLocale()
  const [saved, setSaved] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (data) {
      track('article_opened', { slug: data.slug })
      setSaved(isArticleSaved(data.id))
    }
  }, [data])

  if (!data) {
    return (
      <Container className="py-20">
        <EmptyState title="Article not found" description="" />
      </Container>
    )
  }

  const related = BLOG_POSTS.filter((item) => data.relatedSlugs.includes(item.slug))
  const expert = EXPERTS.find((item) => item.slug === data.relatedExpertSlug)
  const site = env.siteUrl
  const body = pick(data.content, locale)
  const paragraphs = body.split('\n\n').filter((para) => para.trim().length > 0)

  return (
    <>
      <Seo title={pick(data.seoTitle, locale)} description={pick(data.seoDescription, locale)} path={`/blog/${data.slug}`} type="article" />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: pick(data.title, locale), path: `/blog/${data.slug}` }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: pick(data.title, locale),
          description: pick(data.excerpt, locale),
          datePublished: data.publishedAt,
          inLanguage: locale === 'te' ? 'te-IN' : 'en-IN',
          image: data.featuredImage.startsWith('http') ? data.featuredImage : `${site}${data.featuredImage}`,
          publisher: { '@type': 'Organization', name: 'WonderHug.Life', url: site },
        }}
      />
      <article>
        <header className="border-b border-line py-12">
          <Container narrow>
            <Badge>{data.category}</Badge>
            <Heading as="h1" className="mt-5">
              {pick(data.title, locale)}
            </Heading>
            <p className="mt-5 text-lg text-slate">{pick(data.excerpt, locale)}</p>
            <p className="mt-6 text-sm text-slate">
              {data.authorName} · {data.reviewStatus} · {data.readingTime} min
              {data.expertReviewerName ? ` · Reviewer: ${data.expertReviewerName}` : ''}
            </p>
            <Button
              className="mt-6"
              variant="secondary"
              onClick={() => {
                const next = toggleSavedArticle(data.id)
                setSaved(next.includes(data.id))
                toast(next.includes(data.id) ? 'Article saved' : 'Removed from saved')
              }}
            >
              {saved ? 'Saved' : 'Save article'}
            </Button>
          </Container>
        </header>
        <Container narrow className="py-10">
          {data.featuredImage ? (
            <Media
              src={data.featuredImage}
              alt={data.featuredImageAlt}
              className="mb-10 aspect-[16/9] w-full rounded-3xl object-cover"
              width={1600}
              height={900}
              priority
            />
          ) : null}
          <div data-testid="article-body">
            {paragraphs.map((para) => (
              <Reveal key={para.slice(0, 40)}>
                <p className="mb-5 text-lg leading-relaxed">{para}</p>
              </Reveal>
            ))}
          </div>
          <aside className="mt-12 rounded-2xl bg-canvas p-6 text-sm text-slate">{MEDICAL_DISCLAIMER}</aside>
          {expert ? (
            <p className="mt-8">
              Related faculty:{' '}
              <Link to={`/experts/${expert.slug}`} className="underline">
                {expert.name}
              </Link>
            </p>
          ) : null}
          {related.length > 0 ? (
            <ul className="mt-8">
              {related.map((item) => (
                <li key={item.id}>
                  <Link to={`/blog/${item.slug}`}>{pick(item.title, locale)}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </article>
    </>
  )
}
