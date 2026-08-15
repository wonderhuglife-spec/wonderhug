import { EXPERTS } from '@/data/experts'
import type { AsyncState, Expert, ExpertSpeciality } from '@/types/domain'

export async function listExperts(speciality?: ExpertSpeciality | 'all'): Promise<AsyncState<Expert[]>> {
  const list =
    !speciality || speciality === 'all' ? EXPERTS.filter((e) => e.isListed) : EXPERTS.filter((e) => e.speciality === speciality && e.isListed)
  if (list.length === 0) return { status: 'empty', data: [], error: null }
  return { status: 'success', data: list, error: null }
}

export async function getExpertBySlug(slug: string): Promise<AsyncState<Expert>> {
  const expert = EXPERTS.find((item) => item.slug === slug)
  if (!expert) return { status: 'empty', data: null, error: null }
  return { status: 'success', data: expert, error: null }
}

export const expertsService = { listExperts, getExpertBySlug }
