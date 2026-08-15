import { COMMUNITY_GROUPS } from '@/data/community'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Link } from 'react-router-dom'
import { communityService } from '@/services/community'

export function CommunityPreview() {
  return (
    <section className="border-y border-line py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Community</p>
          <Heading as="h2" className="mt-3">
            Rooms, not a noisy feed.
          </Heading>
          <Text muted className="mt-4 text-lg">
            Groups follow the journey. Reporting, moderation and expert answers are part of the architecture. The tone
            should stay safe, calm and useful.
          </Text>
        </div>
        <ul className="mt-10 flex flex-wrap gap-3">
          {COMMUNITY_GROUPS.map((group) => (
            <li key={group.id}>
              <Link
                to={`/community/${group.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-ink hover:border-teal hover:bg-teal-soft"
                onClick={() => communityService.openCommunity(group.slug)}
              >
                {group.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
