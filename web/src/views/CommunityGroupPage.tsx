'use client'

import { useState } from 'react'
import { useParams } from '@/lib/navigation'
import { COMMUNITY_GROUPS, COMMUNITY_POSTS } from '@/data/community'
import { communityService } from '@/services/community'
import { Seo } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Heading, Text } from '@/components/ui/Typography'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Input, Label, Textarea } from '@/components/ui/Input'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { whatsappUrl } from '@/services/whatsapp'
import { useAuth } from '@/hooks/useAuth'
import type { CommunityPost } from '@/types/domain'

export function CommunityGroupPage({ slug: slugProp }: { slug?: string }) {
  const params = useParams()
  const slug = slugProp ?? String(params.slug ?? '')
  const locale = currentLocale()
  const { user } = useAuth()
  const group = COMMUNITY_GROUPS.find((item) => item.slug === slug)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [localPosts, setLocalPosts] = useState<CommunityPost[]>([])

  if (!group) {
    return (
      <Container className="py-20">
        <EmptyState title="Group not found" description="" />
      </Container>
    )
  }
  const posts = [...localPosts, ...COMMUNITY_POSTS.filter((post) => post.groupSlug === slug)]
  return (
    <>
      <Seo title={pick(group.name, locale)} description={pick(group.description, locale)} path={`/community/${group.slug}`} />
      <Container className="py-16">
        <Heading as="h1">{pick(group.name, locale)}</Heading>
        <Text muted className="mt-4">
          {pick(group.description, locale)}
        </Text>
        <ButtonLink to={whatsappUrl(`I would like to join the ${group.slug} room.`)} className="mt-6" variant="teal">
          Continue on WhatsApp
        </ButtonLink>
        <form
          className="mt-10 rounded-2xl border border-line p-6"
          onSubmit={async (event) => {
            event.preventDefault()
            if (!title.trim() || !body.trim()) return
            const post = await communityService.createPost(slug, title, body, user?.phone ?? user?.email ?? 'Member')
            setLocalPosts((current) => [post, ...current])
            setTitle('')
            setBody('')
          }}
        >
          <h2 className="font-serif text-xl">Share in this room</h2>
          <p className="mt-2 text-sm text-slate">Posts are moderated. Live conversation stays on WhatsApp.</p>
          <div className="mt-4">
            <Label htmlFor="post-title">Title</Label>
            <Input id="post-title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mt-4">
            <Label htmlFor="post-body">Note</Label>
            <Textarea id="post-body" value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          <Button className="mt-4" type="submit">
            Post
          </Button>
        </form>
        <ul className="mt-10 space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="rounded-2xl border border-line p-6">
              {post.isExpertAnswer ? <Badge>Faculty note</Badge> : <Badge tone="muted">Room</Badge>}
              <h2 className="mt-3 font-serif text-2xl">{pick(post.title, locale)}</h2>
              <p className="mt-3 text-slate">{pick(post.body, locale)}</p>
              <p className="mt-4 text-xs text-slate-muted">{post.authorLabel}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
