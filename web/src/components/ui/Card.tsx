import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

export function Card({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li'
}) {
  return <Tag className={cn('rounded-2xl border border-line bg-white p-6', className)}>{children}</Tag>
}
