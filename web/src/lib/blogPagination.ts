export const JOURNAL_PAGE_SIZE = 5

export function paginatePosts<T>(items: T[], page: number, pageSize = JOURNAL_PAGE_SIZE) {
  const total = items.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize) || 1)
  const current = Math.min(Math.max(1, Number.isFinite(page) ? page : 1), pageCount)
  const start = (current - 1) * pageSize
  const slice = items.slice(start, start + pageSize)
  return {
    items: slice,
    page: current,
    pageCount,
    total,
    featured: slice[0] ?? null,
    rest: slice.slice(1),
  }
}

export function parsePageParam(value: string | null | undefined) {
  const parsed = Number.parseInt(value ?? '1', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}
