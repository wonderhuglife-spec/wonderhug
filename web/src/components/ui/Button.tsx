'use client'

import { cn } from '@/lib/cn'
import { Link } from '@/lib/navigation'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'teal'
type Size = 'md' | 'lg' | 'sm'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const sizes: Record<Size, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

const variants: Record<Variant, string> = {
  primary: 'bg-purple text-white hover:bg-purple-dark focus-visible:ring-purple',
  secondary: 'bg-white text-navy border border-line hover:border-navy/30 focus-visible:ring-navy',
  ghost: 'bg-transparent text-navy hover:bg-canvas focus-visible:ring-navy',
  teal: 'bg-teal text-white hover:bg-teal-dark focus-visible:ring-teal',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return <button className={cn(base, sizes[size], variants[variant], className)} {...props} />
}

interface ButtonLinkProps {
  to: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  onClick?: () => void
}

export function ButtonLink({ to, variant = 'primary', size = 'md', className, children, onClick }: ButtonLinkProps) {
  const external = to.startsWith('http')
  const classes = cn(base, sizes[size], variants[variant], className)
  if (external) {
    return (
      <a href={to} className={classes} onClick={onClick} rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={classes} onClick={onClick}>
      {children}
    </Link>
  )
}
