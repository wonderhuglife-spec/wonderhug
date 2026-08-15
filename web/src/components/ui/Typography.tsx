import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

export function Heading({
  as: Tag = 'h2',
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' | 'h4' }) {
  const styles = {
    h1: 'font-serif text-display font-medium text-ink',
    h2: 'font-serif text-3xl sm:text-4xl font-medium tracking-tight text-ink',
    h3: 'font-serif text-2xl font-medium text-ink',
    h4: 'font-sans text-lg font-semibold text-ink',
  }
  return <Tag className={cn(styles[Tag], className)} {...props} />
}

export function Text({
  className,
  muted = false,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { muted?: boolean }) {
  return <p className={cn('text-base leading-relaxed', muted ? 'text-slate' : 'text-ink', className)} {...props} />
}

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark', className)}
      {...props}
    />
  )
}
