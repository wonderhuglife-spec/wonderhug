'use client'

import NextLink from 'next/link'
import { useParams as useNextParams, usePathname, useRouter } from 'next/navigation'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'

type LinkProps = {
  to?: string
  href?: string
  children?: ReactNode
  className?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  replace?: boolean
  style?: CSSProperties
  'aria-label'?: string
}

export function Link({ to, href, children, className, onClick, replace, ...rest }: LinkProps) {
  const dest = to ?? href ?? '/'
  return (
    <NextLink href={dest} className={className} onClick={onClick} replace={replace} {...rest}>
      {children}
    </NextLink>
  )
}

export function NavLink({
  to,
  className,
  children,
  end,
  onClick,
}: {
  to: string
  className?: string | ((props: { isActive: boolean }) => string)
  children?: ReactNode
  end?: boolean
  onClick?: () => void
}) {
  const pathname = usePathname()
  const active = end ? pathname === to : pathname === to || (to !== '/' && pathname.startsWith(to))
  const cls = typeof className === 'function' ? className({ isActive: active }) : className
  return (
    <NextLink href={to} className={cls} onClick={onClick}>
      {children}
    </NextLink>
  )
}

export function useNavigate() {
  const router = useRouter()
  return (to: string, opts?: { state?: unknown; replace?: boolean }) => {
    if (opts?.state && typeof window !== 'undefined') {
      sessionStorage.setItem('wonderhug.navstate', JSON.stringify(opts.state))
    }
    if (opts?.replace) router.replace(to)
    else router.push(to)
  }
}

export function useParams<T extends Record<string, string | string[] | undefined> = Record<string, string>>() {
  return useNextParams() as T
}

export function useLocation() {
  const pathname = usePathname() ?? '/'
  let state: unknown = null
  if (typeof window !== 'undefined') {
    try {
      state = JSON.parse(sessionStorage.getItem('wonderhug.navstate') || 'null')
    } catch {
      state = null
    }
  }
  return { pathname, state }
}

export function MemoryRouter({ children }: { children?: ReactNode }) {
  return children
}

export function Outlet() {
  return null
}
