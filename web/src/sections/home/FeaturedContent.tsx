import { BLOG_POSTS } from '@/data/blog'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Typography'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'

export function FeaturedContent() {
  const featured = BLOG_POSTS.filter((post) => post.isFeatured)
  const lead = featured[0]
  const rest = featured.slice(1)

  if (!lead) return null

  return (
    <section className="py-20">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Reading</p>
            <Heading as="h2" className="mt-3">
              Featured from the journal
            </Heading>
          </div>
          <Link to="/blog" className="text-sm font-medium text-navy underline-offset-4 hover:underline">
            All articles
          </Link>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <Link to={`/blog/${lead.slug}`} className="group block">
              <img
                src={lead.featuredImage}
                alt={lead.featuredImageAlt}
                className="aspect-[16/10] w-full rounded-2xl object-cover bg-canvas"
                width={960}
                height={600}
              />
              <Badge className="mt-5">{lead.category}</Badge>
              <h3 className="mt-3 font-serif text-3xl text-ink group-hover:text-teal-dark">{lead.title}</h3>
              <p className="mt-3 max-w-xl text-slate">{lead.excerpt}</p>
              <p className="mt-3 text-xs text-slate-muted">
                {lead.readingTime} min · {lead.authorName} · Review {lead.reviewStatus.replace('_', ' ')}
              </p>
            </Link>
          </article>
          <div className="flex flex-col justify-center gap-8 lg:col-span-5">
            {rest.map((post) => (
              <article key={post.id} className="border-t border-line pt-6">
                <Badge tone="muted">{post.category}</Badge>
                <h3 className="mt-2 font-serif text-2xl">
                  <Link to={`/blog/${post.slug}`} className="hover:text-teal-dark">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-slate">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
