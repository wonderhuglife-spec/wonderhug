'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
import { cn } from '@/lib/cn'
import { JOURNAL_PAGE_SIZE, paginatePosts, parsePageParam } from '@/lib/blogPagination'

type Filter = BlogCategory | 'all'

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const locale = currentLocale()
  return (
    <article className="h-full">
      <Link to={`/blog/${post.slug}`} className="group block">
        <HoverMedia
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          className={cn('w-full rounded-2xl bg-canvas', featured ? 'aspect-[16/8]' : 'aspect-[16/10]')}
        />
        <Badge className="mt-5">{post.category}</Badge>
        <h2 className={cn('mt-3 font-serif group-hover:text-teal-dark', featured ? 'text-4xl' : 'text-2xl')}>
          {pick(post.title, locale)}
        </h2>
        <p className={cn('mt-3 text-slate', featured ? 'text-lg' : 'text-base')}>{pick(post.excerpt, locale)}</p>
      </Link>
    </article>
  )
}

export function BlogIndexPage({ posts: postsProp }: { posts?: BlogPost[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [q, setQ] = useState('')
  const locale = currentLocale()
  const { posts: catalogPosts } = useCatalog()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const source = postsProp ?? catalogPosts.filter((post) => post.isPublished)
  const posts = useMemo(() => {
    const byCat = filter === 'all' ? source : source.filter((post) => post.category === filter)
    if (!q) return byCat
    return byCat.filter((p) => `${p.title.en} ${p.title.te} ${p.tags.join(' ')} ${p.content.en}`.toLowerCase().includes(q.toLowerCase()))
  }, [filter, q, source])
  const page = parsePageParam(searchParams.get('page'))
  const pagination = paginatePosts(posts, page, JOURNAL_PAGE_SIZE)

  function goToPage(next: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (next <= 1) params.delete('page')
    else params.set('page', String(next))
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  function onFilter(next: Filter) {
    setFilter(next)
    goToPage(1)
  }

  return (
    <>
      <Seo title="Journal" description="Editorial writing on pregnancy, Garbh Sanskar and parenting." path="/blog" />
      <PageHero
        kicker="Editorial"
        title="Journal"
        lede="Search and categories. Every article names an author and review status."
        src="/images/photo-garbh-rest.png"
        alt="Journal atmosphere"
      >
        <Input
          className="max-w-md bg-white/95"
          placeholder="Search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            if (page !== 1) goToPage(1)
          }}
        />
      </PageHero>
      <Container className="py-12">
        <Tabs
          label="Article categories"
          value={filter}
          onChange={onFilter}
          tabs={[{ id: 'all' as Filter, label: 'All' }, ...BLOG_CATEGORIES.map((id) => ({ id: id as Filter, label: id }))]}
        />
        {posts.length === 0 ? (
          <div className="mt-10">
            <EmptyState title="No articles in this filter" description="Try another category." />
          </div>
        ) : null}
        {pagination.featured ? (
          <div className="mt-12 grid grid-cols-12 gap-10">
            <div className="col-span-12">
              <PostCard post={pagination.featured} featured />
            </div>
            {pagination.rest.map((post) => (
              <div key={post.id} className="col-span-12 md:col-span-6">
                <Reveal>
                  <PostCard post={post} />
                </Reveal>
              </div>
            ))}
          </div>
        ) : null}
        {pagination.pageCount > 1 ? (
          <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Journal pages">
            <button
              type="button"
              className="min-h-11 rounded-full border border-line px-4 text-sm disabled:opacity-40"
              disabled={pagination.page <= 1}
              onClick={() => goToPage(pagination.page - 1)}
            >
              Previous
            </button>
            {Array.from({ length: pagination.pageCount }, (_, index) => index + 1).map((item) => (
              <button
                key={item}
                type="button"
                aria-current={item === pagination.page ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-sm',
                  item === pagination.page ? 'bg-navy text-white' : 'border border-line text-ink hover:bg-canvas',
                )}
                onClick={() => goToPage(item)}
              >
                {item}
              </button>
            ))}
            <button
              type="button"
              className="min-h-11 rounded-full border border-line px-4 text-sm disabled:opacity-40"
              disabled={pagination.page >= pagination.pageCount}
              onClick={() => goToPage(pagination.page + 1)}
            >
              Next
            </button>
          </nav>
        ) : null}
        <p className="sr-only">
          Showing page {pagination.page} of {pagination.pageCount} for {pagination.total} articles in {locale}
        </p>
      </Container>
    </>
  )
}
