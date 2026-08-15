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
  const sizes = { sm: 'h-11 w-11', md: 'h-16 w-16', lg: 'h-24 w-24' }
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'rounded-full object-cover bg-canvas',
        sizes[size],
        selected ? 'ring-2 ring-teal ring-offset-2' : 'ring-1 ring-line',
      )}
    />
  )
}
