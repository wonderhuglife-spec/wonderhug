'use client'

import Image from 'next/image'

export function Media({
  src,
  alt,
  className,
  width = 960,
  height = 640,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}) {
  const svg = src.endsWith('.svg')
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized={svg}
      priority={priority}
    />
  )
}
