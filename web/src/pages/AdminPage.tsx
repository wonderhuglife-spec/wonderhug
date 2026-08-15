import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Label, Textarea } from '@/components/ui/Input'
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
  const [postJson, setPostJson] = useState(
    JSON.stringify(
      {
        slug: 'new-article',
        title: { en: '', te: '' },
        excerpt: { en: '', te: '' },
        category: 'Pregnancy',
      },
      null,
      2,
    ),
  )
  const [message, setMessage] = useState<string | null>(null)
  const canEdit = role === 'admin' || role === 'moderator'

  async function saveBlock(blockKey: string, locale: 'en' | 'te', payload: Record<string, unknown>) {
    if (!supabase) {
      setMessage('Connect Supabase to persist CMS blocks. Until then, edit web/src/data or seed SQL.')
      return
    }
    if (!canEdit) {
      setMessage('Staff role required. Set profiles.role to admin.')
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
          {t('admin.help')} Catalogue: {PRODUCTS.length} products, {PROGRAMS.length} programmes, {BLOG_POSTS.length}{' '}
          articles, {EXPERTS.length} faculty seats.
        </Text>
        {!user ? (
          <p className="mt-6">
            <Link to="/signin" className="underline">
              Sign in
            </Link>{' '}
            with a staff profile to write to Supabase.
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
          <h2 className="font-serif text-2xl">New journal draft (JSON)</h2>
          <div className="mt-4">
            <Label htmlFor="post-json">Payload</Label>
            <Textarea id="post-json" className="mt-2 font-mono text-sm" value={postJson} onChange={(e) => setPostJson(e.target.value)} />
          </div>
          <Button
            className="mt-3"
            onClick={() => {
              try {
                const payload = JSON.parse(postJson) as Record<string, unknown>
                void saveBlock(`blog_draft_${String(payload.slug ?? Date.now())}`, 'en', payload)
              } catch {
                setMessage('JSON is not valid.')
              }
            }}
          >
            Save draft block
          </Button>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Published rows (Studio)</h2>
          <ul className="mt-4 list-disc pl-5 text-sm text-slate">
            <li>blog_posts, products, programs, experts, community_groups, garbh_practices, site_pages</li>
            <li>RLS: public read for published content; is_staff() write</li>
          </ul>
        </section>
        {message ? <p className="mt-8 text-sm text-navy">{message}</p> : null}
        <p className="mt-8 text-sm text-slate">
          Need a product title tweak without JSON? Open Supabase Studio — this dashboard is the lightweight path for
          homepage and drafts.
        </p>
      </Container>
    </>
  )
}
