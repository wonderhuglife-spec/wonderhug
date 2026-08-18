'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/lib/navigation'
import { BLOG_CATEGORIES } from '@/data/blog'
import { useCatalog } from '@/hooks/useCatalog'
import type { BlogPost } from '@/types/domain'
import { Seo } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Tabs } from '@/components/ui/Tabs'
import { Input } from '@/components/ui/Input'
import { Reveal } from '@/components/motion/Reveal'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import type { BlogCategory } from '@/types/domain'
import { PageHero } from '@/components/editorial/PageHero'
import { HoverMedia } from '@/components/editorial/HoverMedia'

type Filter = BlogCategory | 'all'

export function BlogIndexPage({ posts: postsProp }: { posts?: BlogPost[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [q, setQ] = useState('')
  const locale = currentLocale()
  const { posts: catalogPosts } = useCatalog()
  const source = postsProp ?? catalogPosts.filter((post) => post.isPublished)
  const posts = useMemo(() => {
    const byCat = filter === 'all' ? source : source.filter((post) => post.category === filter)
    if (!q) return byCat
    return byCat.filter((p) => `${p.title.en} ${p.title.te} ${p.tags.join(' ')} ${p.content.en}`.toLowerCase().includes(q.toLowerCase()))
  }, [filter, q, source])
  const lead = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      <Seo title="Journal" description="Editorial writing on pregnancy, Garbh Sanskar and parenting." path="/blog" />
      <PageHero
        kicker="Editorial"
        title="Journal"
        lede="Search and categories. Every article names an author and review status."
        src="/images/placeholder-ai-journal-garbh.png"
        alt="placeholder-ai- Journal atmosphere"
      >
        <Input className="max-w-md bg-white/95" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
      </PageHero>
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
                <HoverMedia src={lead.featuredImage} alt={lead.featuredImageAlt} className="aspect-[16/10] w-full rounded-2xl bg-canvas" />
                <Badge className="mt-5">{lead.category}</Badge>
                <h2 className="mt-3 font-serif text-4xl group-hover:text-teal-dark">{pick(lead.title, locale)}</h2>
                <p className="mt-4 text-lg text-slate">{pick(lead.excerpt, locale)}</p>
              </Link>
            </article>
            <div className="lg:col-span-5">
              {rest.map((post) => (
                <Reveal key={post.id}>
                  <article className="border-t border-line py-6">
                    <HoverMedia src={post.featuredImage} alt={post.featuredImageAlt} className="mb-4 aspect-[16/9] w-full rounded-xl" width={640} height={360} />
                    <h2 className="font-serif text-2xl">
                      <Link to={`/blog/${post.slug}`}>{pick(post.title, locale)}</Link>
                    </h2>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </>
  )
}
