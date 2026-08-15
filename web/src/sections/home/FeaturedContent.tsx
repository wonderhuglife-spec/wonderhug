import { BLOG_POSTS } from '@/data/blog'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Typography'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'

export function FeaturedContent() {
  const locale = currentLocale()
  const featured = BLOG_POSTS.filter((post) => post.isFeatured)
  const lead = featured[0]
  const rest = featured.slice(1)
  if (!lead) return null

  return (
    <section className="py-20">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <Heading as="h2">Journal</Heading>
          <Link to="/blog" className="text-sm font-medium text-navy underline-offset-4 hover:underline">
            All articles
          </Link>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <Link to={`/blog/${lead.slug}`} className="group block">
              <img src={lead.featuredImage} alt={lead.featuredImageAlt} className="aspect-[16/10] w-full rounded-2xl bg-canvas object-cover" loading="lazy" />
              <Badge className="mt-5">{lead.category}</Badge>
              <h3 className="mt-3 font-serif text-3xl text-ink group-hover:text-teal-dark">{pick(lead.title, locale)}</h3>
              <p className="mt-3 max-w-xl text-slate">{pick(lead.excerpt, locale)}</p>
            </Link>
          </article>
          <div className="flex flex-col justify-center gap-8 lg:col-span-5">
            {rest.map((post) => (
              <article key={post.id} className="border-t border-line pt-6">
                <h3 className="font-serif text-2xl">
                  <Link to={`/blog/${post.slug}`} className="hover:text-teal-dark">
                    {pick(post.title, locale)}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-slate">{pick(post.excerpt, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
