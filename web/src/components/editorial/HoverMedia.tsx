'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

export function HoverMedia({
  src,
  alt,
  className,
  imgClassName,
  width = 960,
  height = 640,
  fill = false,
  sizes,
  priority = false,
  zoomOnHover = false,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  zoomOnHover?: boolean
}) {
  const reduce = useReducedMotion()
  const svg = src.endsWith('.svg')
  return (
    <div className={cn('overflow-hidden', fill && 'relative', className)}>
      <motion.div
        className={cn('h-full w-full', fill && 'absolute inset-0')}
        whileHover={reduce || !zoomOnHover ? undefined : { scale: 1.05 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          sizes={sizes}
          priority={priority}
          unoptimized={svg}
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      </motion.div>
    </div>
  )
}
