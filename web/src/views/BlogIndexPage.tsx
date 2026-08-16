'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/lib/navigation'
import { BLOG_CATEGORIES, BLOG_POSTS } from '@/data/blog'
import { Seo } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Heading, Text } from '@/components/ui/Typography'
import { Tabs } from '@/components/ui/Tabs'
import { Input } from '@/components/ui/Input'
import { Media } from '@/components/media/Media'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import type { BlogCategory } from '@/types/domain'

type Filter = BlogCategory | 'all'

export function BlogIndexPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [q, setQ] = useState('')
  const locale = currentLocale()
  const posts = useMemo(() => {
    const list = BLOG_POSTS.filter((post) => post.isPublished)
    const byCat = filter === 'all' ? list : list.filter((post) => post.category === filter)
    if (!q) return byCat
    return byCat.filter((p) => `${p.title.en} ${p.title.te} ${p.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase()))
  }, [filter, q])
  const lead = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      <Seo title="Journal" description="Editorial writing on pregnancy, Garbh Sanskar and parenting." path="/blog" />
      <header className="border-b border-line py-16">
        <Container>
          <Heading as="h1">Journal</Heading>
          <Text muted className="mt-4 max-w-2xl text-lg">
            Search and categories. Every article names an author and review status.
          </Text>
          <Input className="mt-6 max-w-md" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        </Container>
      </header>
      <Container className="py-12">
        <Tabs
          label="Article categories"
          value={filter}
          onChange={setFilter}
          tabs={[{ id: 'all' as Filter, label: 'All' }, ...BLOG_CATEGORIES.map((id) => ({ id: id as Filter, label: id }))]}
        />
        {posts.length === 0 ? (
          <div className="mt-10">
            <EmptyState title="No articles in this filter" description="Try another category." />
          </div>
        ) : null}
        {lead ? (
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <article className="lg:col-span-7">
              <Link to={`/blog/${lead.slug}`} className="group">
                <Media src={lead.featuredImage} alt={lead.featuredImageAlt} className="aspect-[16/10] w-full rounded-2xl bg-canvas object-cover" />
                <Badge className="mt-5">{lead.category}</Badge>
                <h2 className="mt-3 font-serif text-4xl group-hover:text-teal-dark">{pick(lead.title, locale)}</h2>
                <p className="mt-4 text-lg text-slate">{pick(lead.excerpt, locale)}</p>
              </Link>
            </article>
            <div className="lg:col-span-5">
              {rest.map((post) => (
                <article key={post.id} className="border-t border-line py-6">
                  <h2 className="font-serif text-2xl">
                    <Link to={`/blog/${post.slug}`}>{pick(post.title, locale)}</Link>
                  </h2>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </>
  )
}
