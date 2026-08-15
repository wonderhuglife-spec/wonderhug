import { useParams } from 'react-router-dom'
import { communityService } from '@/services/community'
import { useAsyncResource } from '@/hooks/useAsyncResource'
import { Seo } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Heading, Text } from '@/components/ui/Typography'
import { Loading } from '@/components/ui/Loading'
import { Button } from '@/components/ui/Button'

export function CommunityGroupPage() {
  const { slug = '' } = useParams()
  const groupState = useAsyncResource(() => communityService.getGroup(slug), `group:${slug}`)
  const postsState = useAsyncResource(() => communityService.listPosts(slug), `posts:${slug}`)

  if (groupState.status === 'loading') {
    return (
      <Container className="py-20">
        <Loading label="Loading group" />
      </Container>
    )
  }
  if (groupState.status === 'error') {
    return (
      <Container className="py-20">
        <ErrorState message={groupState.error ?? 'Could not load group'} onRetry={groupState.retry} />
      </Container>
    )
  }
  if (groupState.status === 'empty' || !groupState.data) {
    return (
      <Container className="py-20">
        <EmptyState title="Group not found" description="This community room is not published." />
      </Container>
    )
  }

  const group = groupState.data

  return (
    <>
      <Seo title={group.name} description={group.description} path={`/community/${group.slug}`} />
      <header className="border-b border-line py-16">
        <Container>
          <Heading as="h1">{group.name}</Heading>
          <Text muted className="mt-4 max-w-2xl text-lg">
            {group.description}
          </Text>
          <p className="mt-6 text-sm text-slate">
            Reporting and moderation are designed in. Posting requires an account when Supabase Auth is configured
            (CONFIG_REQUIRED).
          </p>
        </Container>
      </header>
      <Container className="py-12">
        {postsState.status === 'loading' ? <Loading label="Loading posts" /> : null}
        {postsState.status === 'error' ? (
          <ErrorState message={postsState.error ?? 'Could not load posts'} onRetry={postsState.retry} />
        ) : null}
        {postsState.status === 'empty' ? (
          <EmptyState
            title="No threads yet"
            description="A calm empty room is better than fake conversation."
            action={
              <Button variant="secondary" disabled>
                Start a thread (account required)
              </Button>
            }
          />
        ) : null}
        {postsState.status === 'success' && postsState.data ? (
          <ul className="space-y-6">
            {postsState.data.map((post) => (
              <li key={post.id} className="rounded-2xl border border-line p-6">
                <div className="flex flex-wrap items-center gap-2">
                  {post.isExpertAnswer ? <Badge>Expert answer pattern</Badge> : <Badge tone="muted">Member</Badge>}
                  <span className="text-xs text-slate-muted">{post.dataStatus}</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl">{post.title}</h2>
                <p className="mt-3 text-slate">{post.body}</p>
                <p className="mt-4 text-xs text-slate-muted">{post.authorLabel}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </>
  )
}
