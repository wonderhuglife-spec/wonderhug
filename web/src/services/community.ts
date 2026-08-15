import { COMMUNITY_GROUPS, COMMUNITY_POSTS } from '@/data/community'
import type { AsyncState, CommunityGroup, CommunityPost } from '@/types/domain'
import { track } from '@/services/analytics'

export async function listGroups(): Promise<AsyncState<CommunityGroup[]>> {
  if (COMMUNITY_GROUPS.length === 0) return { status: 'empty', data: [], error: null }
  return { status: 'success', data: COMMUNITY_GROUPS, error: null }
}

export async function getGroup(slug: string): Promise<AsyncState<CommunityGroup>> {
  const group = COMMUNITY_GROUPS.find((item) => item.slug === slug)
  if (!group) return { status: 'empty', data: null, error: null }
  return { status: 'success', data: group, error: null }
}

export async function listPosts(groupSlug: string): Promise<AsyncState<CommunityPost[]>> {
  const posts = COMMUNITY_POSTS.filter((post) => post.groupSlug === groupSlug)
  if (posts.length === 0) return { status: 'empty', data: [], error: null }
  return { status: 'success', data: posts, error: null }
}

export function openCommunity(groupSlug?: string) {
  track('community_opened', { group: groupSlug ?? 'index' })
}

export const communityService = { listGroups, getGroup, listPosts, openCommunity }
