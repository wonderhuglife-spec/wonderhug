import { COMMUNITY_GROUPS, COMMUNITY_POSTS } from '@/data/community'
import type { AsyncState, CommunityGroup, CommunityPost } from '@/types/domain'
import { track } from '@/services/analytics'
import { supabase } from '@/lib/supabase'

const LOCAL_KEY = 'wonderhug.communityPosts'

export async function listGroups(): Promise<AsyncState<CommunityGroup[]>> {
  return { status: 'success', data: COMMUNITY_GROUPS, error: null }
}

export async function getGroup(slug: string): Promise<AsyncState<CommunityGroup>> {
  const group = COMMUNITY_GROUPS.find((item) => item.slug === slug)
  if (!group) return { status: 'empty', data: null, error: null }
  return { status: 'success', data: group, error: null }
}

function localPosts(): CommunityPost[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]') as CommunityPost[]
  } catch {
    return []
  }
}

export async function listPosts(groupSlug: string): Promise<AsyncState<CommunityPost[]>> {
  const posts = [...COMMUNITY_POSTS, ...localPosts()].filter((post) => post.groupSlug === groupSlug)
  if (posts.length === 0) return { status: 'empty', data: [], error: null }
  return { status: 'success', data: posts, error: null }
}

export async function createPost(groupSlug: string, title: string, body: string, authorLabel: string) {
  const post: CommunityPost = {
    id: `local_${crypto.randomUUID()}`,
    groupSlug,
    title: { en: title, te: title },
    body: { en: body, te: body },
    authorLabel,
    isExpertAnswer: false,
    createdAt: new Date().toISOString(),
  }
  const next = [post, ...localPosts()]
  localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
  if (supabase) {
    const group = COMMUNITY_GROUPS.find((item) => item.slug === groupSlug)
    await supabase.from('community_posts').insert({
      group_id: group?.id,
      title: title,
      body: body,
      is_published: false,
    })
  }
  track('community_opened', { group: groupSlug, action: 'compose' })
  return post
}

export function openCommunity(groupSlug?: string) {
  track('community_opened', { group: groupSlug ?? 'index' })
}

export const communityService = { listGroups, getGroup, listPosts, createPost, openCommunity }
