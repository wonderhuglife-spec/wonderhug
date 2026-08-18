'use client'

import Image from 'next/image'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/cn'

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      to="/"
      className={cn(
        'inline-flex items-center gap-2.5 rounded-md text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
        className,
      )}
      aria-label="WonderHug.Life home"
    >
      <Image
        src="/logo.png"
        alt=""
        width={compact ? 40 : 48}
        height={compact ? 40 : 48}
        className={cn('object-contain', compact ? 'h-10 w-10' : 'h-12 w-12')}
        priority
      />
      {compact ? null : (
        <span className="flex items-center font-sans text-[1.05rem] font-bold leading-none tracking-tight">
          <span className="text-purple">WonderHug</span>
          <span className="text-teal">.Life</span>
        </span>
      )}
    </Link>
  )
}
