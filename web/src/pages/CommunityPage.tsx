import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { communityService } from '@/services/community'
import { useAsyncResource } from '@/hooks/useAsyncResource'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Heading, Text } from '@/components/ui/Typography'
import { Loading } from '@/components/ui/Loading'

export function CommunityPage() {
  const { status, data, error, retry } = useAsyncResource(() => communityService.listGroups(), 'groups')

  useEffect(() => {
    communityService.openCommunity()
  }, [])

  return (
    <>
      <Seo
        title="Community"
        description="Calm WonderHug community rooms for planning, pregnancy, feeding and parenting."
        path="/community"
      />
      <header className="border-b border-line py-16">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Community</p>
          <Heading as="h1" className="mt-3">
            A safer room for the same chapter.
          </Heading>
          <Text muted className="mt-4 max-w-2xl text-lg">
            Groups, posts, comments, reporting, moderation and expert answers are in the data model. The interface stays
            quiet on purpose.
          </Text>
        </Container>
      </header>
      <Container className="py-12">
        {status === 'loading' ? <Loading label="Loading groups" /> : null}
        {status === 'error' ? <ErrorState message={error ?? 'Could not load groups'} onRetry={retry} /> : null}
        {status === 'empty' ? (
          <EmptyState title="No groups yet" description="Community rooms will open after moderation is staffed." />
        ) : null}
        {status === 'success' && data ? (
          <ul className="grid gap-6 md:grid-cols-2">
            {data.map((group) => (
              <li key={group.id}>
                <Link to={`/community/${group.slug}`} className="block rounded-2xl border border-line p-6 hover:border-teal">
                  <h2 className="font-serif text-2xl">{group.name}</h2>
                  <p className="mt-3 text-slate">{group.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </>
  )
}
