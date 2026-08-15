export function Loading({ label = 'Loading' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center gap-3 py-10 text-slate">
      <span className="h-5 w-5 animate-pulse rounded-full bg-teal/40" aria-hidden />
      <span>{label}…</span>
    </div>
  )
}
