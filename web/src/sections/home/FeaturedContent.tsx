'use client'

import { BLOG_POSTS } from '@/data/blog'
import { Container } from '@/components/ui/Container'
import { Link } from '@/lib/navigation'
import { Badge } from '@/components/ui/Badge'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { SectionHeader } from '@/components/editorial/SectionHeader'

export function FeaturedContent() {
  const locale = currentLocale()
  const featured = BLOG_POSTS.filter((post) => post.isFeatured)
  const lead = featured[0]
  const rest = featured.slice(1)
  if (!lead) return null

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          kicker="Journal"
          title="Writing that names its limits."
          action={
            <Link to="/blog" className="text-sm font-medium text-navy underline-offset-4 hover:underline">
              All articles
            </Link>
          }
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <Link to={`/blog/${lead.slug}`} className="group block">
              <HoverMedia src={lead.featuredImage} alt={lead.featuredImageAlt} className="aspect-[16/10] w-full rounded-2xl bg-canvas" />
              <Badge className="mt-5">{lead.category}</Badge>
              <h3 className="mt-3 font-serif text-3xl text-ink group-hover:text-teal-dark">{pick(lead.title, locale)}</h3>
              <p className="mt-3 max-w-xl text-slate">{pick(lead.excerpt, locale)}</p>
            </Link>
          </article>
          <div className="flex flex-col justify-center gap-8 lg:col-span-5">
            {rest.map((post) => (
              <article key={post.id} className="border-t border-line pt-6">
                <Link to={`/blog/${post.slug}`} className="group grid gap-4 sm:grid-cols-5">
                  <HoverMedia src={post.featuredImage} alt={post.featuredImageAlt} className="aspect-[16/10] w-full rounded-xl sm:col-span-2" width={400} height={250} />
                  <span className="sm:col-span-3">
                    <h3 className="font-serif text-2xl group-hover:text-teal-dark">{pick(post.title, locale)}</h3>
                    <p className="mt-2 text-sm text-slate">{pick(post.excerpt, locale)}</p>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
