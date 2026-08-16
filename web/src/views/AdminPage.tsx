'use client'

import { useState } from 'react'
import { Link } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Input, Label, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { PRODUCTS } from '@/data/products'
import { PROGRAMS } from '@/data/programs'
import { BLOG_POSTS } from '@/data/blog'
import { EXPERTS } from '@/data/experts'
import { supabase } from '@/lib/supabase'

export function AdminPage() {
  const { t } = useTranslation()
  const { user, role } = useAuth()
  const [heroEn, setHeroEn] = useState('')
  const [heroTe, setHeroTe] = useState('')
  const [postSlug, setPostSlug] = useState('new-article')
  const [postTitleEn, setPostTitleEn] = useState('')
  const [postTitleTe, setPostTitleTe] = useState('')
  const [postBodyEn, setPostBodyEn] = useState('')
  const [productSlug, setProductSlug] = useState(PRODUCTS[0]?.slug ?? '')
  const [productName, setProductName] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const canEdit = role === 'admin' || role === 'moderator'

  async function saveBlock(blockKey: string, locale: 'en' | 'te', payload: Record<string, unknown>) {
    if (!supabase) {
      setMessage('Connect Supabase (NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY) to persist CMS writes. Catalogue below is live from the bilingual seed.')
      return
    }
    if (!canEdit) {
      setMessage('Staff role required. Set profiles.role to admin in Studio.')
      return
    }
    const { error } = await supabase.from('cms_blocks').upsert({ block_key: blockKey, locale, payload })
    setMessage(error?.message ?? `Saved ${blockKey} (${locale})`)
  }

  return (
    <>
      <Seo title={t('admin.title')} description={t('admin.help')} path="/admin" />
      <Container className="py-16">
        <Heading as="h1">{t('admin.title')}</Heading>
        <Text muted className="mt-4 max-w-2xl">
          {t('admin.help')} Live catalogue: {PRODUCTS.length} products, {PROGRAMS.length} programmes, {BLOG_POSTS.length}{' '}
          articles, {EXPERTS.length} faculty seats.
        </Text>
        {!user ? (
          <p className="mt-6">
            <Link to="/signin" className="underline">
              Sign in
            </Link>{' '}
            with a staff profile to write to Supabase. The forms below still render without auth.
          </p>
        ) : null}
        {user && !canEdit ? (
          <p className="mt-6">Signed in, but this profile is not staff. Set profiles.role to admin in Studio.</p>
        ) : null}

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Homepage hero</h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div>
              <Label htmlFor="hero-en">English body</Label>
              <Textarea id="hero-en" value={heroEn} onChange={(e) => setHeroEn(e.target.value)} />
              <Button className="mt-3" onClick={() => void saveBlock('homepage_hero', 'en', { body: heroEn })}>
                Save English
              </Button>
            </div>
            <div>
              <Label htmlFor="hero-te">Telugu body</Label>
              <Textarea id="hero-te" value={heroTe} onChange={(e) => setHeroTe(e.target.value)} />
              <Button className="mt-3" onClick={() => void saveBlock('homepage_hero', 'te', { body: heroTe })}>
                Save Telugu
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Journal draft</h2>
          <div className="mt-4 grid gap-4">
            <div>
              <Label htmlFor="post-slug">Slug</Label>
              <Input id="post-slug" value={postSlug} onChange={(e) => setPostSlug(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="post-title-en">Title (English)</Label>
              <Input id="post-title-en" value={postTitleEn} onChange={(e) => setPostTitleEn(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="post-title-te">Title (Telugu)</Label>
              <Input id="post-title-te" value={postTitleTe} onChange={(e) => setPostTitleTe(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="post-body-en">Body (English)</Label>
              <Textarea id="post-body-en" value={postBodyEn} onChange={(e) => setPostBodyEn(e.target.value)} />
            </div>
          </div>
          <Button
            className="mt-3"
            onClick={() =>
              void saveBlock(`blog_draft_${postSlug}`, 'en', {
                slug: postSlug,
                title: { en: postTitleEn, te: postTitleTe },
                body: postBodyEn,
              })
            }
          >
            Save journal draft
          </Button>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Product copy</h2>
          <div className="mt-4 grid gap-4">
            <div>
              <Label htmlFor="product-slug">Existing slug</Label>
              <Input id="product-slug" value={productSlug} onChange={(e) => setProductSlug(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="product-name">Replacement English name</Label>
              <Input id="product-name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
          </div>
          <Button
            className="mt-3"
            onClick={() => void saveBlock(`product_${productSlug}`, 'en', { slug: productSlug, name: productName })}
          >
            Save product override
          </Button>
          <ul className="mt-6 list-disc pl-5 text-sm text-slate">
            {PRODUCTS.map((product) => (
              <li key={product.id}>
                {product.slug} — {product.name.en}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Published tables (Studio)</h2>
          <ul className="mt-4 list-disc pl-5 text-sm text-slate">
            <li>blog_posts, products, programs, experts, community_groups, garbh_practices, site_pages, cms_blocks</li>
            <li>RLS: public read for published content; is_staff() write</li>
          </ul>
        </section>
        {message ? <p className="mt-8 text-sm text-navy">{message}</p> : null}
      </Container>
    </>
  )
}
