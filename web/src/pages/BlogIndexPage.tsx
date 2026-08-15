import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BLOG_CATEGORIES } from '@/data/blog'
import { contentService } from '@/services/content'
import { useAsyncResource } from '@/hooks/useAsyncResource'
import { Seo } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Heading, Text } from '@/components/ui/Typography'
import { Loading } from '@/components/ui/Loading'
import { Tabs } from '@/components/ui/Tabs'
import type { BlogCategory } from '@/types/domain'

type Filter = BlogCategory | 'all'

export function BlogIndexPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const { status, data, error, retry } = useAsyncResource(() => contentService.listPublishedPosts(), 'blog-index')
  const posts = useMemo(() => {
    const list = data ?? []
    return filter === 'all' ? list : list.filter((post) => post.category === filter)
  }, [data, filter])
  const lead = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      <Seo
        title="Journal"
        description="Editorial writing on pregnancy, fertility, parenting and Indian traditions — education, not diagnosis."
        path="/blog"
      />
      <header className="border-b border-line py-16">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Journal</p>
          <Heading as="h1" className="mt-3">
            Slow reading for a long journey.
          </Heading>
          <Text muted className="mt-4 max-w-2xl text-lg">
            Featured pieces lead. Categories help you browse. Every article should show its author, review status and
            reading time.
          </Text>
        </Container>
      </header>
      <Container className="py-12">
        <Tabs
          label="Article categories"
          value={filter}
          onChange={setFilter}
          tabs={[{ id: 'all' as Filter, label: 'All' }, ...BLOG_CATEGORIES.map((id) => ({ id: id as Filter, label: id }))]}
        />
        {status === 'loading' ? <Loading label="Loading articles" /> : null}
        {status === 'error' ? <ErrorState message={error ?? 'Could not load articles'} onRetry={retry} /> : null}
        {status === 'empty' || (status === 'success' && posts.length === 0) ? (
          <div className="mt-10">
            <EmptyState title="No articles in this category yet" description="Editorial pieces will appear as they are reviewed." />
          </div>
        ) : null}
        {status === 'success' && lead ? (
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <article className="lg:col-span-7">
              <Link to={`/blog/${lead.slug}`} className="group">
                <img src={lead.featuredImage} alt={lead.featuredImageAlt} className="aspect-[16/10] w-full rounded-2xl bg-canvas object-cover" />
                <Badge className="mt-5">{lead.category}</Badge>
                <h2 className="mt-3 font-serif text-4xl group-hover:text-teal-dark">{lead.title}</h2>
                <p className="mt-4 text-lg text-slate">{lead.excerpt}</p>
              </Link>
            </article>
            <div className="lg:col-span-5">
              {rest.map((post) => (
                <article key={post.id} className="border-t border-line py-6">
                  <p className="text-xs text-slate-muted">
                    {post.category} · {post.readingTime} min
                  </p>
                  <h2 className="mt-2 font-serif text-2xl">
                    <Link to={`/blog/${post.slug}`} className="hover:text-teal-dark">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-slate">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </>
  )
}
