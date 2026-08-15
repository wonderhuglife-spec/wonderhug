'use client'

import { Link } from '@/lib/navigation'
import { cn } from '@/lib/cn'

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-md', className)} aria-label="WonderHug.Life home">
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="#F0FDFA" />
        <path
          d="M10 20c0-5 3.2-8 8-8s8 3 8 8"
          fill="none"
          stroke="#79409B"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M12.5 21.5c2.2 3.2 4.4 4.7 5.5 4.7 1.1 0 3.3-1.5 5.5-4.7"
          fill="none"
          stroke="#309292"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      {compact ? null : (
        <span className="leading-tight">
          <span className="block font-serif text-lg font-medium tracking-tight">WonderHug</span>
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate">.Life</span>
        </span>
      )}
    </Link>
  )
}
