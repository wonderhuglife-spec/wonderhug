import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { contentService } from '@/services/content'
import { useAsyncResource } from '@/hooks/useAsyncResource'
import { JsonLd, Seo, breadcrumbJsonLd } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Loading } from '@/components/ui/Loading'
import { Heading } from '@/components/ui/Typography'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { track } from '@/services/analytics'
import { BLOG_POSTS } from '@/data/blog'
import { EXPERTS } from '@/data/experts'
import { TOOLS } from '@/data/tools'

export function BlogPostPage() {
  const { slug = '' } = useParams()
  const { status, data, error, retry } = useAsyncResource(() => contentService.getPostBySlug(slug), slug)

  useEffect(() => {
    if (data) track('article_opened', { slug: data.slug })
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
        <EmptyState title="Article not found" description="This slug is not a published piece." />
      </Container>
    )
  }

  const related = BLOG_POSTS.filter((post) => data.relatedSlugs.includes(post.slug))
  const expert = EXPERTS.find((item) => item.slug === data.relatedExpertSlug)
  const tools = TOOLS.filter((tool) => data.relatedToolSlugs.includes(tool.slug))
  const site = import.meta.env.VITE_SITE_URL || 'https://wonderhug.life'

  return (
    <>
      <Seo
        title={data.seoTitle}
        description={data.seoDescription}
        path={`/blog/${data.slug}`}
        type="article"
        canonical={data.canonicalUrl}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: data.title, path: `/blog/${data.slug}` }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.excerpt,
          datePublished: data.publishedAt,
          dateModified: data.updatedAt,
          author: { '@type': 'Organization', name: data.authorName },
          publisher: { '@type': 'Organization', name: 'WonderHug.Life', url: site },
        }}
      />
      <article>
        <header className="border-b border-line py-16">
          <Container narrow>
            <Badge>{data.category}</Badge>
            <Heading as="h1" className="mt-5">
              {data.title}
            </Heading>
            <p className="mt-5 text-lg text-slate">{data.excerpt}</p>
            <dl className="mt-8 grid gap-3 text-sm text-slate sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-muted">Author</dt>
                <dd>{data.authorName}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-muted">Expert reviewer</dt>
                <dd>{data.expertReviewerName ?? 'Not yet assigned'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-muted">Review status</dt>
                <dd>{data.reviewStatus.replace('_', ' ')}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-muted">Last reviewed</dt>
                <dd>{data.lastReviewedAt ? new Date(data.lastReviewedAt).toLocaleDateString('en-IN') : 'Pending'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-muted">Published</dt>
                <dd>{new Date(data.publishedAt).toLocaleDateString('en-IN')}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-muted">Reading time</dt>
                <dd>{data.readingTime} min</dd>
              </div>
            </dl>
          </Container>
        </header>
        <Container narrow className="py-12">
          <img src={data.featuredImage} alt={data.featuredImageAlt} className="mb-10 w-full rounded-2xl bg-canvas" />
          {data.content.split('\n\n').map((para) => (
            <p key={para.slice(0, 24)} className="mb-5 text-lg leading-relaxed text-ink">
              {para}
            </p>
          ))}
          <aside className="mt-12 rounded-2xl bg-canvas p-6 text-sm text-slate">
            <p className="font-medium text-ink">Education, not diagnosis</p>
            <p className="mt-2">{MEDICAL_DISCLAIMER}</p>
          </aside>
          {data.references.length > 0 ? (
            <section className="mt-10">
              <h2 className="font-serif text-2xl">References</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-slate">
                {data.references.map((ref) => (
                  <li key={ref.label}>{ref.href ? <Link to={ref.href}>{ref.label}</Link> : ref.label}</li>
                ))}
              </ul>
            </section>
          ) : null}
          <section className="mt-12 grid gap-8 border-t border-line pt-10">
            {expert ? (
              <p>
                Related expert:{' '}
                <Link to={`/experts/${expert.slug}`} className="text-navy underline-offset-4 hover:underline">
                  {expert.speciality}
                </Link>
              </p>
            ) : null}
            {tools.length > 0 ? (
              <p>
                Related tools:{' '}
                {tools.map((tool) => (
                  <Link key={tool.id} to={tool.href} className="mr-3 text-navy underline-offset-4 hover:underline">
                    {tool.name}
                  </Link>
                ))}
              </p>
            ) : null}
            {related.length > 0 ? (
              <div>
                <h2 className="font-serif text-2xl">Related reading</h2>
                <ul className="mt-4 space-y-2">
                  {related.map((post) => (
                    <li key={post.id}>
                      <Link to={`/blog/${post.slug}`} className="hover:text-teal-dark">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        </Container>
      </article>
    </>
  )
}
