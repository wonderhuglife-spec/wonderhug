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
        <span className="leading-none">
          <span className="block font-sans text-[1.05rem] font-bold tracking-tight text-purple">
            WonderHug
            <span className="ml-0.5 inline-block h-1.5 w-1.5 translate-y-[-0.55rem] rounded-full bg-teal" aria-hidden />
          </span>
          <span className="block font-sans text-[0.95rem] font-bold tracking-tight text-teal">.Life</span>
        </span>
      )}
    </Link>
  )
}
