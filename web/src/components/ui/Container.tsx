import { cn } from '@/lib/cn'
import type { ElementType, ReactNode } from 'react'

export function Container({
  children,
  className,
  as: Tag = 'div',
  narrow = false,
}: {
  children: ReactNode
  className?: string
  as?: ElementType
  narrow?: boolean
}) {
  return <Tag className={cn('mx-auto w-full px-5 sm:px-8', narrow ? 'max-w-editorial' : 'max-w-page', className)}>{children}</Tag>
}
