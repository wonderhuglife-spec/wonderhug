'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Link } from '@/lib/navigation'
import {
  FileText,
  Files,
  GraduationCap,
  ImageIcon,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Users,
  Flower2,
  MessagesSquare,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/cn'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/pages', label: 'Pages', icon: Files },
  { href: '/admin/products', label: 'Products', icon: ShoppingBag },
  { href: '/admin/programs', label: 'Programmes', icon: GraduationCap },
  { href: '/admin/experts', label: 'Faculty', icon: Users },
  { href: '/admin/practices', label: 'Practices', icon: Flower2 },
  { href: '/admin/groups', label: 'Community', icon: MessagesSquare },
  { href: '/admin/media', label: 'Media', icon: ImageIcon },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { user, role } = useAuth()
  const staff = role === 'admin' || role === 'moderator' || role === 'expert'
  const backend = Boolean(supabase)

  return (
    <div className="flex min-h-svh bg-[#f0f0f1] text-ink">
      <aside className="hidden w-60 shrink-0 flex-col bg-[#1d2327] text-white md:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">WonderHug</p>
          <p className="mt-1 font-serif text-xl">CMS</p>
        </div>
        <nav className="flex-1 space-y-0.5 p-3" aria-label="CMS">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm text-white/75 hover:bg-white/10 hover:text-white',
                  active && 'bg-[#2271b1] text-white',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-white/10 p-4 text-xs text-white/50">
          {backend ? (staff ? `Staff · ${role}` : user ? 'Signed in · not staff' : 'Sign in for Supabase writes') : 'Local CMS · this browser'}
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-[#c3c4c7] bg-white px-4 md:px-6">
          <nav className="flex gap-2 overflow-x-auto md:hidden" aria-label="CMS mobile">
            {NAV.slice(0, 6).map((item) => (
              <Link key={item.href} to={item.href} className="whitespace-nowrap rounded-full border border-line px-3 py-1 text-xs">
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="hidden text-sm text-slate md:block">Manage pages, posts, shop, programmes, and media. Published content appears on the website.</p>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#2271b1] hover:underline">
            View site <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </header>
        <div className="flex-1 p-4 md:p-8" id="main">{children}</div>
      </div>
    </div>
  )
}
