export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-canvas ${className}`} aria-hidden />
}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-5 py-16" role="status" aria-label="Loading">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="aspect-[16/9] w-full" />
    </div>
  )
}
