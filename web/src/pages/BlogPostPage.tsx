import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { contentService } from '@/services/content'
import { useAsyncResource } from '@/hooks/useAsyncResource'
import { JsonLd, Seo, breadcrumbJsonLd } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Loading } from '@/components/ui/Loading'
import { Heading } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { isArticleSaved, toggleSavedArticle } from '@/services/saved'
import { track } from '@/services/analytics'
import { BLOG_POSTS } from '@/data/blog'
import { EXPERTS } from '@/data/experts'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'

export function BlogPostPage() {
  const { slug = '' } = useParams()
  const locale = currentLocale()
  const { status, data, error, retry } = useAsyncResource(() => contentService.getPostBySlug(slug), slug)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (data) {
      track('article_opened', { slug: data.slug })
      setSaved(isArticleSaved(data.id))
    }
  }, [data])

  if (status === 'loading') {
    return (
      <Container className="py-20">
        <Loading label="Loading article" />
      </Container>
    )
  }
  if (status === 'error') {
    return (
      <Container className="py-20">
        <ErrorState message={error ?? 'Could not load article'} onRetry={retry} />
      </Container>
    )
  }
  if (status === 'empty' || !data) {
    return (
      <Container className="py-20">
        <EmptyState title="Article not found" description="" />
      </Container>
    )
  }

  const related = BLOG_POSTS.filter((post) => data.relatedSlugs.includes(post.slug))
  const expert = EXPERTS.find((item) => item.slug === data.relatedExpertSlug)
  const site = import.meta.env.VITE_SITE_URL || 'https://wonderhug.life'

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
          publisher: { '@type': 'Organization', name: 'WonderHug.Life', url: site },
        }}
      />
      <article>
        <header className="border-b border-line py-16">
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
              onClick={() => setSaved(toggleSavedArticle(data.id).includes(data.id))}
            >
              {saved ? 'Saved' : 'Save article'}
            </Button>
          </Container>
        </header>
        <Container narrow className="py-12">
          {pick(data.content, locale)
            .split('\n\n')
            .map((para) => (
              <p key={para.slice(0, 32)} className="mb-5 text-lg leading-relaxed">
                {para}
              </p>
            ))}
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
              {related.map((post) => (
                <li key={post.id}>
                  <Link to={`/blog/${post.slug}`}>{pick(post.title, locale)}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </article>
    </>
  )
}
