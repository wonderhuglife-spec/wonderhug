'use client'

import { Media } from '@/components/media/Media'
import { cn } from '@/lib/cn'

export function Avatar({
  src,
  alt,
  size = 'md',
  selected = false,
}: {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  selected?: boolean
}) {
  const px = { sm: 44, md: 64, lg: 96 }[size]
  return (
    <Media
      src={src}
      alt={alt}
      width={px}
      height={px}
      className={cn(
        'rounded-full bg-canvas object-cover',
        size === 'sm' && 'h-11 w-11',
        size === 'md' && 'h-16 w-16',
        size === 'lg' && 'h-24 w-24',
        selected ? 'ring-2 ring-teal ring-offset-2' : 'ring-1 ring-line',
      )}
    />
  )
}
