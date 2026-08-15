import { EXPERTS } from '@/data/experts'
import { supabase, supabaseConfigStatus } from '@/lib/supabase'
import type { AsyncState, Expert, ExpertSpeciality } from '@/types/domain'

export async function listExperts(speciality?: ExpertSpeciality | 'all'): Promise<AsyncState<Expert[]>> {
  try {
    if (supabase && supabaseConfigStatus === 'ready') {
      const { data, error } = await supabase.from('experts').select('*').eq('is_listed', true)
      if (error) return { status: 'error', data: null, error: error.message }
      const mapped = (data ?? []).map(mapExpert)
      const filtered =
        !speciality || speciality === 'all' ? mapped : mapped.filter((item) => item.speciality === speciality)
      if (filtered.length === 0) return { status: 'empty', data: [], error: null }
      return { status: 'success', data: filtered, error: null }
    }
    const list =
      !speciality || speciality === 'all' ? EXPERTS : EXPERTS.filter((item) => item.speciality === speciality)
    if (list.length === 0) return { status: 'empty', data: [], error: null }
    return { status: 'success', data: list, error: null }
  } catch (error) {
    return { status: 'error', data: null, error: error instanceof Error ? error.message : 'Unable to load experts' }
  }
}

export async function getExpertBySlug(slug: string): Promise<AsyncState<Expert>> {
  try {
    if (supabase && supabaseConfigStatus === 'ready') {
      const { data, error } = await supabase.from('experts').select('*').eq('slug', slug).maybeSingle()
      if (error) return { status: 'error', data: null, error: error.message }
      if (!data) return { status: 'empty', data: null, error: null }
      return { status: 'success', data: mapExpert(data), error: null }
    }
    const expert = EXPERTS.find((item) => item.slug === slug)
    if (!expert) return { status: 'empty', data: null, error: null }
    return { status: 'success', data: expert, error: null }
  } catch (error) {
    return { status: 'error', data: null, error: error instanceof Error ? error.message : 'Unable to load expert' }
  }
}

function mapExpert(row: Record<string, unknown>): Expert {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    photo: String(row.photo ?? '/images/portrait-placeholder.svg'),
    speciality: row.speciality as Expert['speciality'],
    qualification: String(row.qualification ?? ''),
    bio: String(row.bio ?? ''),
    languages: Array.isArray(row.languages) ? row.languages.map(String) : [],
    reviewStatus: (row.review_status as Expert['reviewStatus']) ?? 'draft',
    availability: String(row.availability ?? ''),
    dataStatus: 'REQUIRES_VERIFIED_DATA',
  }
}

export const expertsService = { listExperts, getExpertBySlug }
