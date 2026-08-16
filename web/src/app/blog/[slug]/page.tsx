import { notFound } from 'next/navigation'
import { BLOG_POSTS } from '@/data/blog'
import { pageMetadata } from '@/lib/seo'
import { BlogPostPage } from '@/views/BlogPostPage'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbJsonLd, organizationJsonLd } from '@/lib/jsonld'
import { env } from '@/lib/env'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return BLOG_POSTS.filter((post) => post.isPublished).map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((item) => item.slug === slug && item.isPublished)
  if (!post) return pageMetadata({ title: 'Article', description: '', path: `/blog/${slug}` })
  return pageMetadata({
    title: post.seoTitle.en,
    description: post.seoDescription.en,
    path: `/blog/${post.slug}`,
    type: 'article',
    image: post.featuredImage,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((item) => item.slug === slug && item.isPublished)
  if (!post) notFound()
  const site = env.siteUrl
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Journal', path: '/blog' },
          { name: post.title.en, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title.en,
          description: post.excerpt.en,
          datePublished: post.publishedAt,
          inLanguage: 'en-IN',
          image: `${site}${post.featuredImage}`,
          publisher: { '@type': 'Organization', name: 'WonderHug.Life', url: site },
        }}
      />
      <BlogPostPage slug={slug} post={post} />
    </>
  )
}
